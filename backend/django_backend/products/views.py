from .models import Products
from .serializers import ProductsSerializers
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response


"""
===== Create Products
"""
class CreateProduct(APIView):
    def post(self, request):
        data = request.data
        serializer = ProductsSerializers(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({ "message": "Product created successfully" }, status=status.HTTP_201_CREATED)
        
        return Response({ "message": "Failed to create product. Please try again" }, status=status.HTTP_400_BAD_REQUEST)



"""
===== Multiple product details
GET
"""
class MultipleProductDetails(APIView):
    # ===== Get All Products
    def get(self, request):
        products = Products.objects.all()
        
        if not products.exists():
            return Response({ "message": "No products available" }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductsSerializers(products, many=True)
        return Response({ "products": serializer.data })



"""
===== Single Product Details
GET, UPDATE and DELETE
"""   
class SingleProductDetails(APIView):
    
    # ===== get product by id
    def get(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response({ "message": "Product not available" }, status=status.HTTP_404_NOT_FOUND)
        
        if not product:
            return Response({ "message": "This product is not available" }, status=status.HTTP_404_NOT_FOUND)
        
        serailizer = ProductsSerializers(product)
        return Response({ "product": serailizer.data }, status=status.HTTP_200_OK)
    
    # ===== update product by id
    def put(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response({ "message": "Product not available" }, status=status.HTTP_404_NOT_FOUND)
        
        data = request.data
        serializer = ProductsSerializers(product, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({ 
                "message": "Product updated Successfully",
                "product": serializer.data
            }, status=status.HTTP_200_OK)
            
        return Response({ "message": "Update failed. Please try again" }, status=status.HTTP_400_BAD_REQUEST)
        
    # ===== delete product by id
    def delete(self, request, pk):
        try:
            product = Products.objects.get(pk=pk)
        except Products.DoesNotExist:
            return Response({ "message": "Product not available" }, status=status.HTTP_404_NOT_FOUND)
        
        if product.delete():
            return Response({ "message": "Product deleted successfully" }, status=status.HTTP_204_NO_CONTENT)
        
        return Response({ "message": "Failed to delete. Try Again" }, status=status.HTTP_400_BAD_REQUEST)