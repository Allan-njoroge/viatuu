from django.db import models

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to="products/", null=True, blank=True, )
    quantity = models.IntegerField()
    price = models.IntegerField()
    sale_price = models.IntegerField(null=True, blank=True)
    
    REQUIRED_FILEDS = ['name', 'description', 'image', 'quantity', 'price']
    
    def __str__(self):
        return self.name