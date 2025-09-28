from __future__ import annotations

from django.db import models
from django.utils import timezone


class Contact(models.Model):
    name = models.CharField(max_length=255)
    external_id = models.CharField(max_length=128, unique=True)
    channel = models.CharField(max_length=50)
    attributes = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ("name",)

    def __str__(self) -> str:
        return self.name


class Conversation(models.Model):
    class Status(models.TextChoices):
        OPEN = "open", "Aberta"
        PENDING = "pending", "Pendente"
        CLOSED = "closed", "Encerrada"

    reference = models.CharField(max_length=40, unique=True)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, related_name="conversations")
    channel = models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.OPEN)
    ticket_reference = models.CharField(max_length=32, blank=True)
    opened_at = models.DateTimeField(default=timezone.now)
    closed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ("-opened_at",)

    def __str__(self) -> str:
        return self.reference


class Message(models.Model):
    class Role(models.TextChoices):
        AGENT = "agent", "Agente"
        CONTACT = "contact", "Contato"
        SYSTEM = "system", "Sistema"

    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    role = models.CharField(max_length=20, choices=Role.choices)
    sender = models.CharField(max_length=128)
    content = models.TextField()
    metadata = models.JSONField(default=dict, blank=True)
    sent_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ("sent_at",)

    def __str__(self) -> str:
        return f"{self.role}: {self.content[:30]}"
