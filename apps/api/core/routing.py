from __future__ import annotations

from django.urls import path

from conversations import consumers as conversation_consumers

websocket_urlpatterns = [
    path("ws/inbox/", conversation_consumers.InboxConsumer.as_asgi()),
]
