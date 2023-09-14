from django.shortcuts import render

# Create your views here.
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login
from .serializers import UserSerializer
from .models import MenuItem, TodaySpecial
from .serializers import MenuItemSerializer, TodaySpecialSerializer
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from django.contrib.auth.models import User
import json
from django.views.decorators.csrf import csrf_exempt

# from rest_framework.authtoken.models import Token


@permission_classes([AllowAny])
class UserMenuView(APIView):
    def get(self, request):
        if request.user.is_authenticated == False or request.user.is_active == False:
            return Response("Invalid Credentials", status=status.HTTP_403_FORBIDDEN)

        menu_items = MenuItem.objects.all()
        menu_serializer = MenuItemSerializer(data=menu_items)

        special_itsm = TodaySpecial.objects.all()
        special_serializer = TodaySpecialSerializer(data=special_itsm)

        respose_data = {
            "specials": special_serializer.data,
            "menu": menu_serializer.data,
        }
        return Response(respose_data, status=status.HTTP_200_OK)


@permission_classes([IsAuthenticated])
class MenuItemList(generics.ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer


@permission_classes([IsAuthenticated])
class TodaySpecialList(generics.ListCreateAPIView):
    queryset = TodaySpecial.objects.all()
    serializer_class = TodaySpecialSerializer


@permission_classes([AllowAny])
class UserRegistrationView(APIView):
    def post(self, request):
        user_data = request.data
        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            serializer_data = serializer.data
            print(
                f"[INFO]: user registered successfully. Sending token {serializer_data}"
            )
            return Response(
                {
                    "user": serializer_data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
class UserLoginView(APIView):
    # convert user token into user data
    def get(self, request, format=None):
        if request.user.is_authenticated == False or request.user.is_active == False:
            return Response("Invalid Credentials", status=status.HTTP_403_FORBIDDEN)

        user = UserSerializer(request.user)

        return Response(user.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        user = User.objects.filter(username=request.data["username"])
        credentials = {
            "username": request.data["username"],
            "password": request.data["password"],
        }
        user = authenticate(**credentials)
        if user is not None and user.is_active:
            user_serializer = UserSerializer(user)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def todays_special(request):
    return Response(TodaySpecialList.serializer_class.data, status=status.HTTP_200_OK)
    # username = request.data.get("username")
    # password = request.data.get("password")

    # user = authenticate(request, username=username, password=password)
    # if user is not None:
    #     return Response(TodaySpecialList.as_view(), status=status.HTTP_200_OK)

    # return Response(
    #     {"message": f"[WARN] backend failed to fetch todays special for {username}"},
    #     status=status.HTTP_400_BAD_REQUEST,
    # )
