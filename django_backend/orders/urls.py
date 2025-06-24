from django.urls import path
from .views import MakeGetOrders, OrderDetails, OrdersByUser, CartItems


urlpatterns = [
    path('', MakeGetOrders.as_view(), name="make_get_orders"),
    path('<int:pk>', OrderDetails.as_view(), name="order_details"),
    path('user/<int:user>', OrdersByUser.as_view(), name="orders_by_user"),
    path('cart/<int:user>', CartItems.as_view(), name="cart_items"),
]