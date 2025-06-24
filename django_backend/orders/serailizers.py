from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import Orders, Cart
from products.models import Products
from users.models import User
from products.serializers import ProductsSerializers


class OrdersSerailizer(ModelSerializer):
    class Meta():
        model = Orders
        fields = "__all__"
        

class CartSerializer(ModelSerializer):
    name = SerializerMethodField()
    image_url = SerializerMethodField()
    
    class Meta():
        model = Cart
        fields = ['product_id','name', 'image_url', 'user_id', 'price', 'quantity', ]
        
    def get_name(self, obj):
        # Access the product name from the nested product object
        return obj.product_id.name
    
    def get_image_url(self, obj):
        # Access the product image URL from the nested product object
        return obj.product_id.get_image_url()