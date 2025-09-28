from __future__ import annotations

from django.conf import settings
from django.db import models
from django.utils import timezone


class Ticket(models.Model):
    class Priority(models.TextChoices):
        LOW = "low", "Baixa"
        NORMAL = "normal", "Normal"
        HIGH = "high", "Alta"
        URGENT = "urgent", "Urgente"

    class Status(models.TextChoices):
        NEW = "new", "Novo"
        PENDING = "pending", "Pendente"
        IN_PROGRESS = "in_progress", "Em atendimento"
        WAITING = "waiting", "Aguardando cliente"
        RESOLVED = "resolved", "Resolvido"

    reference = models.CharField(max_length=32, unique=True)
    subject = models.CharField(max_length=255)
    status = models.CharField(max_length=32, choices=Status.choices, default=Status.NEW)
    priority = models.CharField(max_length=16, choices=Priority.choices, default=Priority.NORMAL)
    assignee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="tickets",
    )
    conversation_ref = models.CharField(max_length=40, help_text="Identificador externo da conversa.")
    sla_due_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    tags = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return self.reference

    def mark_breached(self) -> None:
        self.status = self.Status.IN_PROGRESS
        self.save(update_fields=["status", "updated_at"])
