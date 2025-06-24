from django.urls import path
from .views import UsersRegister, UsersLogin, UsersLogout, UserDetails

urlpatterns = [
    path('register/<str:role>', UsersRegister.as_view(), name='users_register'),
    path('login', UsersLogin.as_view(), name='users_login'),
    path('logout', UsersLogout.as_view(), name='users_logout'),
    path('<int:pk>/', UserDetails.as_view(), name='user_details') 
]