# Charts Helm

- `web/` ? Next.js SSR/Edge (versão containerizada com adaptação de CSP via env).
- `api/` ? Django + DRF + Channels com readiness/liveness e sidecar OTel.
- `worker/` ? Celery worker/beat com configuração de filas dedicadas.
- `opentelemetry/` ? Collector com pipelines prontos para ClickHouse/OpenSearch.

Cada chart define:
- `values.yaml` com planos (standard/enterprise) e limites de recursos por tier.
- `hpa.yaml` com métricas horizontais (CPU, latência p95, tamanho da fila RabbitMQ).
- `secrets.yaml` referenciando KMS/Secrets Manager (somente templates, sem valores).
