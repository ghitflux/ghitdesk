from __future__ import annotations

from django.contrib.auth import login
from django.utils.translation import gettext_lazy as _
from django_tenants.utils import tenant_context
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from tenants.models import Client, Domain


class LoginView(APIView):
    permission_classes = [AllowAny]

    @staticmethod
    def _resolve_tenant(tenant_identifier: str | None) -> Client | None:
        if not tenant_identifier:
            return None
        tenant_identifier = tenant_identifier.lower()
        client = Client.objects.filter(schema_name=tenant_identifier).first()
        if client:
            return client
        domain = (
            Domain.objects.select_related("tenant")
            .filter(domain__iexact=tenant_identifier)
            .first()
        )
        return domain.tenant if domain else None

    def post(self, request, *args, **kwargs):
        tenant_header = request.headers.get("X-Tenant") or request.data.get("tenant")
        tenant = self._resolve_tenant(tenant_header)
        if tenant is None:
            return Response(
                {"detail": _("Tenant invalido ou ausente.")},
                status=status.HTTP_400_BAD_REQUEST,
            )

        with tenant_context(tenant):
            serializer = AuthTokenSerializer(data=request.data, context={"request": request})
            serializer.is_valid(raise_exception=True)
            user = serializer.validated_data["user"]
            token, _ = Token.objects.get_or_create(user=user)
            login(request, user)

        return Response(
            {
                "token": token.key,
                "user": {
                    "id": user.pk,
                    "username": user.get_username(),
                    "email": getattr(user, "email", ""),
                    "full_name": user.get_full_name(),
                },
                "tenant": tenant.schema_name,
            }
        )
