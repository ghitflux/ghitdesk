from __future__ import annotations

from datetime import datetime, timezone

from celery import shared_task

from .models import Ticket


@shared_task(name="tickets.tasks.recalculate_sla")
def recalculate_sla() -> int:
    updated = 0
    now = datetime.now(timezone.utc)
    for ticket in Ticket.objects.filter(sla_due_at__isnull=False, status__in=[Ticket.Status.NEW, Ticket.Status.IN_PROGRESS]):
        if ticket.sla_due_at < now:
            ticket.mark_breached()
            updated += 1
    return updated
