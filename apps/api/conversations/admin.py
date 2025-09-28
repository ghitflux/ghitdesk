from django.contrib import admin

from .models import Contact, Conversation, Message


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "external_id", "channel")
    search_fields = ("name", "external_id")


@admin.register(Conversation)
class ConversationAdmin(admin.ModelAdmin):
    list_display = ("reference", "contact", "channel", "status", "opened_at")
    search_fields = ("reference", "contact__name")
    list_filter = ("channel", "status")


@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ("conversation", "role", "sender", "sent_at")
    search_fields = ("content", "sender")
    list_filter = ("role",)
