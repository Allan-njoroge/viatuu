from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User
from . import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate



"""
===== Register Users =====
"""
class UsersRegister(APIView):
    # register User
    def post(self, request, role):
        valid_roles = [choice[0] for choice in User.ROLES]
        
        if role not in valid_roles:
            return Response({ "message": f"{role} is not a valid role" }, status=status.HTTP_404_NOT_FOUND)
            
        # include role in the request
        data = request.data
        data['role'] = role
        
        
        email = data.get('email')
        # if user exists
        if User.objects.filter(email=email).exists():
            return Response({ "message": "User already exists" }, status=status.HTTP_409_CONFLICT)
        
        # if user does not exist, proceed to add to the database
        serializer = serializers.UserSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({ "message": "User created successfully" }, status=status.HTTP_201_CREATED)
        
        return Response({ "message": "Registration failed. Please try again" }, status=status.HTTP_400_BAD_REQUEST)



"""
===== Login Users =====
"""
class UsersLogin(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        
        if not email or not password:
            return Response({ "message": "All fields are required" }, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(email=email)
        if user is None:
            return Response({ "message": "User does not exist" }, status=status.HTTP_404_NOT_FOUND)
        
        # Check password
        if not user.check_password(password):
            return Response({ "message": "Invalid email or password" }, status=status.HTTP_400_BAD_REQUEST)
        
        response = Response({ 
            "message": "Login Successful", 
            "user": {
                "id": user.id,
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
                "role": user.role
            }
        }, status=status.HTTP_200_OK)
        
        # Generate tokens for the authenticated user
        tokens = RefreshToken.for_user(user)
        
        # Set the access token in a cookie
        response.set_cookie('access-token', tokens.access_token)
        return response
        
 
            
"""
===== Get User Details =====
GET, UPDATE and DELETE 
"""
class UserDetails(APIView): 
    # ===== Get user information
    def get(self, request, pk):
        user = User.objects.get(pk=pk)
        
        if user is None:
            return Response({ "message": "User not found" }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.UserSerializer(user)
        return Response({ "user": serializer.data }, status=status.HTTP_200_OK)

    # ===== Update user information
    def put(self, request, pk):
        user = User.objects.get(pk=pk)
        
        if user is None:
            return Response({ "message": "User not found" }, status=status.HTTP_404_NOT_FOUND)
        
        if pk!=user.id:
            return Response({ "message": "You can only update your account" }, status=status.HTTP_401_UNAUTHORIZED)
        
        data = request.data
        print(data)
        serializer = serializers.UserSerializer(user, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response({ "message": "Updated successfully" }, status=status.HTTP_200_OK)
        
        return Response({ "message": "Update failed", "error": serializer.errors }, status=status.HTTP_400_BAD_REQUEST)

    # Delete user
    def delete(self, request, pk):
        user = User.objects.get(pk=pk)
        
        if user is None:
            return Response({ "message": "User not found" }, status=status.HTTP_404_NOT_FOUND)
        
        serializer = serializers.UserSerializer(user)
        
        if serializer.is_valid():
            serializer.delete()
            return Response({ "message": "Successfully deleted" }, status=status.HTTP_204_NO_CONTENT)