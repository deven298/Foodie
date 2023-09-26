# Create your views here.
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, logout
from .serializers import UserSerializer
from .models import MenuItem, Order
from .serializers import (
    MenuItemSerializer,
    OrderSerializer,
    PlaceOrderSerializer,
    ReviewOrderSerializer,
)
from rest_framework.views import APIView


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def non_delivered_orders(request):
    uid = request.user.id
    orders = (
        Order.objects.filter(status__in=["Pending", "Processing", "Shipped"])
        .filter(user_id=uid)
        .prefetch_related("items")
    )
    serializer = OrderSerializer(orders, many=True)
    print("[INFO] orders for user", uid)
    return Response(serializer.data, status=200)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def user_orders(request):
    uid = request.user.id
    orders = Order.objects.filter(user_id=uid).prefetch_related("items")
    serializer = OrderSerializer(orders, many=True)
    print("[INFO] orders for user", uid)
    return Response(serializer.data, status=200)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def user_order_review(request):
    uid = request.user.id
    order_id = request.data.pop("order_id")
    request.data["user"] = uid
    print(f"[INFO] user {uid} reviewing order {order_id} with {request.data}")
    serializer = ReviewOrderSerializer(data=request.data)

    try:
        order = Order.objects.get(user_id=uid, id=order_id)
    except Order.DoesNotExist:
        return Response({"error": "Order not found"}, status=status.HTTP_404_NOT_FOUND)

    if serializer.is_valid():
        serializer.save()
        order.reviews.add(serializer.instance)
        # print("[INFO] review order", serializer.data, order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def place_order(request):
    request.data["user"] = request.user.id
    serializer = PlaceOrderSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        print("[INFO] place order", serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def menu_item_list(request):
    menu_items = MenuItem.objects.all()  # .filter(is_special=False)
    serializer = MenuItemSerializer(menu_items, many=True)
    return Response(serializer.data, status=200)


@permission_classes([AllowAny])
class UserRegistrationView(APIView):
    def post(self, request):
        user_data = request.data
        print("[INFO] registering user", request, request.data)
        serializer = UserSerializer(data=user_data)
        if serializer.is_valid():
            serializer.save()
            serializer_data = serializer.data
            print("[INFO] register user", serializer_data)
            return Response(
                {
                    "user": serializer_data,
                },
                status=status.HTTP_201_CREATED,
            )
        print("[ERROR] registration failed", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@permission_classes([AllowAny])
class UserLogoutView(APIView):
    def post(self, request, format=None):
        logout(request=request)
        return Response({"User Logged out successfully!"}, status=200)


@permission_classes([AllowAny])
class UserLoginView(APIView):
    def get(self, request, format=None):
        user = UserSerializer(request.user)

        return Response(user.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        credentials = {
            "username": request.data["username"],
            "password": request.data["password"],
        }
        user = authenticate(**credentials)
        if user is not None and user.is_active:
            user_serializer = UserSerializer(user)
            print("[INFO] user data", user_serializer.data)
            return Response(user_serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
        )
