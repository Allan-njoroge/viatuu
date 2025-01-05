from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    ROLES = [
        ('admin', 'Admin'),
        ('customer', 'Customer')
    ]
    
    role = models.CharField(max_length=10, choices=ROLES, default='customer')
    profile_picture = models.ImageField(upload_to='profile_pictures', null=True, blank=True)
    username = None
    
    # Provide a custom related_name to avoid clashes with the default User model fields
    groups = models.ManyToManyField('auth.Group', related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField('auth.Permission', related_name='custom_user_permissions_set', blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['role']


    def __str__(self):
        return f"{self.first_name} {self.last_name}"
    