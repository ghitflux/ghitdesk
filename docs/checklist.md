# Checklists

## Definition of Ready (DoR)
- [ ] `docker compose -f platform/docker/compose.dev.yml up` sobe PostgreSQL + pgvector, Redis, RabbitMQ, OpenSearch, ClickHouse, MinIO e OTel Collector.
- [ ] Frontend `pnpm dev` roda com CSP ativa, dark-mode first e componentes base.
- [ ] Backend Django cria schema público e pelo menos um tenant de teste.
- [ ] Celery worker processa `tickets.tasks.recalculate_sla` em fila dedicada.
- [ ] Traço OpenTelemetry atravessa Web ? BFF ? API ? Celery.

## Definition of Done (MVP)
- Segurança: OWASP ASVS L1, CSP ativa, cookies seguros, webhooks verificados.
- Multi-tenant: criação/isolamento/migração por schema, quotas por plano.
- Omnichannel v0: WhatsApp operando bidirecionalmente com templates.
- Inbox/Ticket/SLA: tempo real estável, métricas TMA/TME/SLA persistidas.
- Observabilidade: tracing E2E, logs e métricas correlacionados.
