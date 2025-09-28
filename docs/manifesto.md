# Manifesto Operacional — GhitDesk

- Dados de clientes são sagrados: guardamos o mínimo possível, mapeamos bases legais da LGPD e auditamos cada acesso.
- Multi-tenant é isolamento real: cada organização vive em seu próprio schema PostgreSQL; jobs sempre carregam `tenant_context`.
- Latência dita experiência: SSR no que é crítico, WebSockets na inbox, cache agressivo no BFF.
- Automação transparente: Ghoat sempre referencia a origem RAG e não envia mensagens sem consentimento.
- Observabilidade desde o hello world: traces, métricas e logs conectados via OpenTelemetry.
- Escala saudável: HPA, filas e backpressure em vez de sobrecarregar pods únicos.
- Padrões abertos vencem: Postgres, OpenSearch, ClickHouse, RabbitMQ, Kafka (quando necessário).
- Segurança contínua: OWASP ASVS em cada sprint, CSP rígida no front, hardening de fábrica no Django.
- Integrações oficiais: WhatsApp Cloud API e demais canais com webhooks verificados e retries idempotentes.
- Documente sempre: Dev Portal com exemplos, versionamento e comunicação de breaking changes.
