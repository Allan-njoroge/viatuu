from .models import Orders
from users.models import User
from .serailizers import OrdersSerailizer
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