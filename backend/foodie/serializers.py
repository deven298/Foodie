from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import MenuItem, Order, Review


class UserSerializer(serializers.ModelSerializer):
    # token = serializers.SerializerMethodField()

    username = serializers.CharField(
        required=True,
        max_length=50,
        validators=[UniqueValidator(queryset=User.objects.all())],
    )

    email = serializers.EmailField(
        required=True, validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(required=True, max_length=50, write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = "__all__"


class ReviewOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        # fields = "__all__"
        fields = ("id", "user", "rating", "text", "created_at")


class OrderSerializer(serializers.ModelSerializer):
    items = MenuItemSerializer(many=True, read_only=True)
    reviews = ReviewOrderSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "total_price",
            "order_date",
            "status",
            "user",
            "items",
            "reviews",
        )


class PlaceOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
