# Manifestos Base (Kubernetes)

- `ingress/` ? Ingress NGINX com suporte a WebSocket e TLS.
- `deploy/` ? Deployments por serviço (web, api, workers, collector).
- `hpa/` ? HorizontalPodAutoscaler com métricas customizadas (CPU/latência/fila).
- `secrets/` ? Referências a secrets geridos fora do repositório (Vault/KMS).

> Utilize Helm (`platform/helm`) para renderizar variações por ambiente (dev, staging, prod).
