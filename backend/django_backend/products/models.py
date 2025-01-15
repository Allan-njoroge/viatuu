from django.db import models


# Products Model
class Products(models.Model):
    SHOE_CATEGORIES = [
        ('Men', 'Men'),
        ('Women', 'Women'),
        ('Kids', 'Kids'),
        ('Unisex', 'Unisex')
    ]
    
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    category = models.CharField(choices=SHOE_CATEGORIES, max_length=10)
    image_url = models.ImageField(upload_to="products/", null=True, blank=True, )
    price = models.IntegerField()
    sale_price = models.IntegerField(null=True, blank=True)
    stock_quantity = models.IntegerField()
    
    REQUIRED_FILEDS = ['name', 'description', 'image', 'quantity', 'price']
    
    def __str__(self):
        return self.name