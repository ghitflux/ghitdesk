from __future__ import annotations

from rest_framework import serializers

from .models import Contact, Conversation, Message


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ["id", "name", "external_id", "channel", "attributes", "created_at"]
        read_only_fields = ("id", "created_at")


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "role", "sender", "content", "metadata", "sent_at"]
        read_only_fields = ("id", "sent_at")


class ConversationSerializer(serializers.ModelSerializer):
    contact = ContactSerializer()
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = [
            "id",
            "reference",
            "contact",
            "channel",
            "status",
            "ticket_reference",
            "opened_at",
            "closed_at",
            "messages",
        ]
        read_only_fields = ("id", "opened_at", "closed_at", "messages")

    def create(self, validated_data):
        contact_data = validated_data.pop("contact")
        contact, _ = Contact.objects.get_or_create(
            external_id=contact_data["external_id"], defaults=contact_data
        )
        return Conversation.objects.create(contact=contact, **validated_data)
