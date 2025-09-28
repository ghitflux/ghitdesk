# GhitDesk API

Backend multi-tenant construído em Django 5 com DRF, Channels e Celery. Principais responsabilidades:

- **Isolamento por schema** (`django-tenants`) com modelos `Client` e `Domain`.
- **API REST** para conversas, mensagens e tickets com versionamento (`/api/v1`).
- **Realtime** via WebSocket (`ws/inbox/`) usando Channels.
- **Tarefas assíncronas** (Celery + RabbitMQ) para SLA, webhooks e rotinas de ingestão.
- **Observabilidade** habilitada por OTel, logs estruturados e healthcheck (`/health`).

Para executar localmente:

```bash
uv sync
uv run python manage.py migrate_schemas --shared
uv run python manage.py create_tenant --schema=tenant1 --domain=tenant1.localhost --name="Tenant 1"
uv run python manage.py runserver 0.0.0.0:8000
```

Workers Celery:

```bash
uv run celery -A core.celery worker -l INFO
uv run celery -A core.celery beat -l INFO
```

## Autenticação

- Endpoint POST /api/v1/auth/login/ aceita username, password e cabeçalho X-Tenant para emitir Token DRF.
- Tokens são gerados por tenant (est_framework.authtoken) e retornados ao BFF para autenticação via NextAuth.

