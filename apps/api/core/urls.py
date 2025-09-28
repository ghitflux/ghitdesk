from __future__ import annotations

from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

from .auth import LoginView


def healthcheck_view(request):
    tenant = getattr(request, "tenant", None)
    tenant_slug = getattr(tenant, "schema_name", "public") if tenant else "unknown"
    return JsonResponse({"status": "ok", "tenant": tenant_slug})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="docs",
    ),
    path("api/v1/auth/login/", LoginView.as_view(), name="auth-login"),
    path("api/v1/", include("conversations.urls")),
    path("api/v1/", include("tickets.urls")),
    path("health", healthcheck_view, name="health"),
]
