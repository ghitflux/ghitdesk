from __future__ import annotations

from typing import Any

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import get_channel_layer


class InboxConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self) -> None:  # noqa: D401
        tenant = self.scope.get("tenant")
        tenant_name = getattr(tenant, "schema_name", "public")
        self.room_group_name = f"inbox_{tenant_name}"
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send_json({"type": "welcome", "tenant": tenant_name})

    async def disconnect(self, code: int) -> None:  # noqa: D401
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive_json(self, content: dict[str, Any], **kwargs: Any) -> None:
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "inbox.event", "payload": content}
        )

    async def inbox_event(self, event: dict[str, Any]) -> None:
        await self.send_json(event["payload"])

    @staticmethod
    def notify_ticket_update(ticket_reference: str, status: str) -> None:
        channel_layer = get_channel_layer()
        if not channel_layer:
            return
        async_to_sync(channel_layer.group_send)(
            "inbox_public",
            {
                "type": "inbox.event",
                "payload": {"ticket": ticket_reference, "status": status},
            },
        )
