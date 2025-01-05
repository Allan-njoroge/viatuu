from django.urls import path
from .views import CreateProduct, SingleProductDetails, MultipleProductDetails

urlpatterns = [
    path('', MultipleProductDetails.as_view(), name="multiple_product_details"),
    path('new/', CreateProduct.as_view(), name="create_product"),
    path('<int:pk>', SingleProductDetails.as_view(), name="single_product_details")
]