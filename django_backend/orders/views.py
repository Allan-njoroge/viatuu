from .models import Orders, Cart
from users.models import User
from products.models import Products
from .serailizers import OrdersSerailizer, CartSerializer
from products.serializers import ProductsSerializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView


"""
===== Make Orders and Get All Orders
"""
class MakeGetOrders(APIView):
    # ===== Make an Order
    def post(self, request):
        data = request.data
        
        serializer = OrdersSerailizer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({ "Message": "Order made successfully" }, status.HTTP_200_OK)
        
        return Response({ "message": "Failed to make order" }, status=status.HTTP_400_BAD_REQUEST)
    
    # ===== Get All Orders
    def get(self, request):
        orders = Orders.objects.all()
        
        if not orders.exists():
            return Response({ "message": "No orders found" }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = OrdersSerailizer(orders, many=True)
        return Response({ "orders": serializer.data })


"""
==== Order Details Using the order id
"""
class OrderDetails(APIView):
    # ===== Get Order By Id
    def get(self, request, pk):
        try:
            order = Orders.objects.get(pk=pk)
        except Orders.DoesNotExist:
            return Response({ "message": "Order not available" }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = OrdersSerailizer(order)
        return Response({ "order": serializer.data }, status=status.HTTP_200_OK)
    
    # Update Order By Id
    def put(self, request, pk):
        try:
            order = Orders.objects.get(pk=pk)
        except Orders.DoesNotExist:
            return Response({ "message": "Order not available" }, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data
        serailizer = OrdersSerailizer(order, data=data, partial=True)
        
        if serailizer.is_valid():
            serailizer.save()
            return Response({ "message": "Order updated successfully" }, status=status.HTTP_200_OK)
        
        return Response({ "message": "Order update failed" }, status=status.HTTP_400_BAD_REQUEST)
  

    
"""
===== Get Orders By users
"""
class OrdersByUser(APIView):
    def get(self, request, user):
        # See if the user exists 
        try:
            user = User.objects.get(pk=user)
        except User.DoesNotExist:
            return Response({ "message": "User not found" }, status=status.HTTP_404_NOT_FOUND)
        
        orders = Orders.objects.filter(user=user)
        if not orders.exists():
            return Response({ "message": "User has no orders" }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = OrdersSerailizer(orders, many=True)
        return Response({ "orders": serializer.data }, status.HTTP_400_BAD_REQUEST)
    

"""
==== Get Cart Items
"""
class CartItems(APIView):
    # Get the items of a users cart
    def get(self, request, user):
        try:
            user = User.objects.get(pk=user)
        except User.DoesNotExist:
            return Response({ "message": "User not found" }, status=status.HTTP_404_NOT_FOUND)
        
        try:
            cart_items = Cart.objects.filter(user_id=user)
        except Cart.DoesNotExist:
            return Response({ "message": "Cart is Empty" }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = CartSerializer(cart_items, many=True)
        
        # Create a dictionary to map product IDs to their details    
        return Response({ "cart_items": serializer.data }, status=status.HTTP_200_OK)
    
    # POST method to add items to the cart
    def post(self, request, user):
        # The user information is requested from the cookies sent from the browser
        # Get the product information from the frontend to add it in the cart
        data = request.data
        print(user)
        quantity = int(data['quantity']) # validate the number to make sure it is an INT
        
        # check if user exists
        if not User.objects.filter(id=user).exists():
            return Response({ "message": "User does not exist" }, status=status.HTTP_404_NOT_FOUND)
        
        # Validate and make sure all fields are not empty
        if not data['product_id'] or not quantity or quantity < 1:
            return Response({ "message": "Missing or Invalid data" }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if a similar produc exists in the cart
        cart = Cart.objects.filter(product_id=data['product_id'])
        if cart.exists():
            return Response({ "message": "Item already in cart" }, status=status.HTTP_409_CONFLICT)
        
        # Find the product by the product id fron the product table
        try:
            product = Products.objects.get(id=data['product_id'])
        except Products.DoesNotExist:
            return Response({ "message": "This product does not exist" }, status=status.HTTP_404_NOT_FOUND)
        
        # Serialize the product data obtained from the table
        product_data = ProductsSerializers(product).data
        price = product_data['price'] # original price
        sale_price = product_data.get('sale_price') or 0 # sale price: if null make it 0
        
        """
        initialize the price of the product selected and multiply it by the quantity
        - Multiply by sale if there is sale price
        - If no sale price multiply by price
        """
        # Calculate the price based on sale or original price
        cart_price = quantity * (sale_price if sale_price > 0 else price)
        
        # Create the Cart Items object and serialize the data
        cart_items = {
            "product_id": data['product_id'], 
            "user_id": user,
            "quantity": quantity,
            "price":cart_price
        }
        
        serializer = CartSerializer(data=cart_items)
        
        if serializer.is_valid():
            serializer.save()
            return Response({ "message": "Added to Cart" }, status=status.HTTP_200_OK)
        
        return Response({ "message": "Failed to add to cart", "cart_items": cart_items }, status=status.HTTP_400_BAD_REQUEST)  
    
    # POST method to add items to the cart
    def delete(self, request, user):
        data = request.data
        
        if not User.objects.filter(id=user).exists():
            return Response({ "message": "User does not exist" }, status=status.HTTP_404_NOT_FOUND)
        
        if not request.data['product_id']:
            return Response({ "message": "Missing product ID" }, status=status.HTTP_400_BAD_REQUEST)
        
        if not Cart.objects.filter(product_id=data['product_id']).exists():
            return Response({ "message": "Item not in cart" }, status=status.HTTP_404_NOT_FOUND)
        
        product_cart_delete = Cart.objects.filter(product_id=data['product_id']).delete()
        
        return Response({ "message": "Item removed from cart" }, status=status.HTTP_200_OK)