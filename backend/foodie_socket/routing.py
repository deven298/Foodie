import os
from channels.routing import ProtocolTypeRouter, URLRouter
from .urls import urlpatterns as websocket_urlpatterns
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from .asgi import application as foodie_asgi_app

application = ProtocolTypeRouter(
    {
        # Django's ASGI application to handle traditional HTTP requests
        "http": foodie_asgi_app,
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
        ),
    }
)
