from __future__ import annotations

from rest_framework import serializers

from .models import Ticket


class TicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticket
        fields = [
            "id",
            "reference",
            "subject",
            "status",
            "priority",
            "assignee",
            "conversation_ref",
            "sla_due_at",
            "created_at",
            "updated_at",
            "tags",
        ]
        read_only_fields = ("id", "created_at", "updated_at")
