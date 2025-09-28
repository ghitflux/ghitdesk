from django.contrib import admin

from .models import Ticket


@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ("reference", "subject", "priority", "status", "sla_due_at")
    search_fields = ("reference", "subject")
    list_filter = ("priority", "status")
