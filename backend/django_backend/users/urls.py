from django.urls import path
from . import views



urlpatterns = [
    path('register/<str:role>', views.UsersRegister.as_view(), name='users_register'),
    path('login', views.UsersLogin.as_view(), name='users_login'),
    path('<int:pk>/', views.UserDetails.as_view(), name='user_details') 
]