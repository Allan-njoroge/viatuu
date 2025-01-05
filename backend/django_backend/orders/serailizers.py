from rest_framework import serializers
from .models import Orders


class OrdersSerailizer(serializers.ModelSerializer):
    class Meta():
        model = Orders
        fields = "__all__"