# Docker Compose (dev)

Use `docker compose -f platform/docker/compose.dev.yml up -d` para iniciar os serviços locais (Postgres, Redis, RabbitMQ, OpenSearch, ClickHouse, MinIO e OTel Collector).

Para encerrar e remover volumes voláteis execute `docker compose -f platform/docker/compose.dev.yml down -v`.
