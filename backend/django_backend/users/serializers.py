from rest_framework import serializers
from .models import User
from orders.models import Cart

class UserSerializer(serializers.ModelSerializer):
    class Meta():
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'role', 'password']
        extra_kwargs = { 'password': { 'write_only': True } }
        
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()   
        return user
    
    def update(self, instance, validated_data):
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)
            
        for attr, value in validated_data.items():
            if attr != 'password':
                setattr(instance, attr, value)
                
            instance.save()
            return instance            