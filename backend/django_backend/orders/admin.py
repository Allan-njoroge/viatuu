from django.contrib import admin
from .models import Cart, Orders

# Register your models here.
admin.site.register(Orders)
admin.site.register(Cart)