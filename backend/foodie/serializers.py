from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.models import User
from .models import MenuItem, TodaySpecial
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

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
        fields = ("token", "username", "email", "password")

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = "__all__"


class TodaySpecialSerializer(serializers.ModelSerializer):
    class Meta:
        model = TodaySpecial
        fields = "__all__"
