# Segurança e Conformidade

## Baseline
- OWASP ASVS como checklist contínuo em pipelines e pentests periódicos.
- CSP estrita com nonce (`middleware.ts`) reduz superfície de XSS/clickjacking.
- Flags `SECURE_*`, cookies `HttpOnly` + `Secure`, HSTS configurado.
- Webhooks com assinatura HMAC, retries idempotentes e expiração de payload.

## LGPD / Privacidade
- Registro de tratamento por base legal (consentimento, legítimo interesse, contrato).
- Portal do titular (download/retificação/anonimização) planejado no roadmap S9-S12.
- Criptografia: chaves por tenant via KMS, mascaramento PII antes de pipelines IA/observabilidade.

## DevSecOps
- pre-commit com Ruff/Black/ESLint/Prettier.
- Dependabot + varredura SCA (GitHub Advanced Security) recomendada.
- Testes de contrato no BFF e automação de threat-modeling por sprint.
- Logs estruturados e scrub de PII via OTel Collector.
