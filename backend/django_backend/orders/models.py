from django.db import models
from users.models import User
from products.models import Products


# Cart Model
class Cart(models.Model):
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='cart')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cart')
    price = models.IntegerField()
    price = models.IntegerField()
    
    def __str__(self):
        return self.id

# Orders Model
class Orders(models.Model):
    order_number = models.CharField(primary_key=True, max_length=10)
    product_id = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='orders')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    cart_id = models.ForeignKey(Cart, on_delete=models.DO_NOTHING, related_name='orders')
    status = models.BooleanField(default=False)
    total_price = models.IntegerField()
    shipping_address = models.CharField(max_length=255)
    order_date = models.DateTimeField(auto_now_add=True)
    delivery_date = models.DateTimeField()
    
    def __str__(self):
        return self.order_number