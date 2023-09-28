from django.urls import path, re_path
from django.core.asgi import get_asgi_application
from .consumers import FoodieConsumers

urlpatterns = [
    path("delivery/", FoodieConsumers, name="delivery"),
    re_path(r"", get_asgi_application()),
]
