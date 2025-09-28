# Roadmap Técnico — 12 Semanas

## S1–S2 — Fundamentos Multi-tenant + Omnichannel v0
- Tenancy por schema (`django-tenants`), RBAC inicial, Auth corporativa (NextAuth + backend Django).
- Conector WhatsApp Cloud API: mensagens bidirecionais, verificação de webhook, templates aprovados.
- Inbox mínima com WebSocket, criação de ticket e rotinas Celery para SLA básico.

## S3–S4 — Observabilidade + Relatórios Operacionais
- Instrumentação OpenTelemetry ponta a ponta.
- Painéis de fila/SLA por tenant em ClickHouse.
- Exportação S3 e busca textual OpenSearch com filtros.

## S5–S6 — IA do Agente (Ghoat) + RAG
- Servidor vLLM com gating por tenant e quotas.
- Pipelines de embeddings (pgvector) e auditoria de prompts/respostas.
- Guardrails de privacidade (mascaramento PII antes de indexação ou treino).

## S7–S8 — Escala e Harden
- HPA por componente com métricas customizadas.
- Rate-limits por tenant, CSP estrita, threat modeling baseado em OWASP ASVS.

## S9–S12 — Expansão de Canais e Automação
- Connectors adicionais (Instagram/Messenger, Email SMTP/IMAP).
- Automação de triagem e classificação assistida pelo Ghoat.
- Portal do titular (LGPD), direito de acesso/retificação, políticas de retenção configuráveis.
