import asyncio
import json
from channels.generic.websocket import AsyncWebsocketConsumer

from foodie.models import Order


class FoodieConsumers(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.close()

    async def disconnect(self, close_code):
        print(f"[Info] disconnected with code: {close_code}")
        await self.close(code=close_code)

    def get_delivery_status(self, uid, order_id):
        try:
            order = Order.objects.get(user_id=uid, id=order_id)
            print(f"[INFO] returning delivery status for {order}")
        except Order.DoesNotExist:
            return None
        return order.status

    async def receive(self, text_data):
        # Handle incoming WebSocket messages here
        print(f"[INFO] received message {text_data}")
        data = json.loads(text_data)

        request_type = data.get("type", None)

        if request_type == "delivery_status_request":
            user_id = data.get("user_id", None)
            order_id = data.get("order_id", None)
            if user_id:
                delivery_status = self.get_delivery_status(user_id, order_id)
                if not delivery_status:
                    await self.send(
                        message_type="delivery_status",
                        message_data={
                            "status": delivery_status,
                        },
                    )
                await self.send(
                    message_type="delivery_status",
                    message_data={
                        "status": delivery_status,
                    },
                )

    async def send(self, message_type, message_data):
        await self.send(
            text_data=json.dumps(
                {
                    "type": message_type,
                    **message_data,
                }
            )
        )
