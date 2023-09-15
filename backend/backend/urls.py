"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from foodie.views import (
    UserRegistrationView,
    UserLoginView,
    menu_item_list,
    UserLogoutView,
    place_order,
    user_orders,
    non_delivered_orders,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("foodie/register/", UserRegistrationView.as_view(), name="register"),
    path("foodie/login/", UserLoginView.as_view(), name="login"),
    path("foodie/logout/", UserLogoutView.as_view(), name="logout"),
    path("foodie/menu/", menu_item_list, name="menu"),
    path("foodie/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("foodie/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("foodie/token/verify/", TokenVerifyView.as_view(), name="token_verify"),
    path("foodie/order/", place_order, name="order"),
    path("foodie/orders/", user_orders, name="orders"),
    path("foodie/orders/inprogress", non_delivered_orders, name="orders_in_progress"),
]
