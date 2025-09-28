from __future__ import annotations

from django.db import models
from django.utils import timezone
from django_tenants.models import DomainMixin, TenantMixin


class Client(TenantMixin):
    name = models.CharField(max_length=255)
    schema_name = models.CharField(max_length=63, unique=True)
    plan = models.CharField(max_length=50, default="standard")
    is_active = models.BooleanField(default=True)
    onboarded_at = models.DateTimeField(default=timezone.now)
    quota_conversations = models.PositiveIntegerField(default=10000)
    quota_storage_mb = models.PositiveIntegerField(default=2048)
    metadata = models.JSONField(default=dict, blank=True)

    auto_create_schema = True

    def __str__(self) -> str:
        return f"{self.name} ({self.schema_name})"


class Domain(DomainMixin):
    pass
