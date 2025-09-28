from __future__ import annotations

from rest_framework import mixins, viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Conversation
from .serializers import ConversationSerializer


class ConversationViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Conversation.objects.select_related("contact").prefetch_related("messages")
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        channel = self.request.query_params.get("channel")
        status = self.request.query_params.get("status")
        if channel:
            queryset = queryset.filter(channel=channel)
        if status:
            queryset = queryset.filter(status=status)
        return queryset
