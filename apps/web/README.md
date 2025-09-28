# GhitDesk Web

Next.js console (App Router) para agentes e administradores com BFF via Route Handlers, CSP com nonce e design system baseado em tokens multi-tenant.

## Recursos Principais

- CSP com nonce por requisicao, reduzindo XSS/clickjacking.
- Tailwind + shadcn/ui adaptados aos tokens em `shared/tokens`.
- Componentes centrais (Button, Badge, Card, Input, Select, Table, Tabs, Tooltip, Toast etc.).
- IA (Ghoat) com area dedicada para sugestoes RAG auditaveis.

## Scripts

```
pnpm install
pnpm dev
```

## Variaveis de Ambiente

1. Copie `cp .env.local.example .env.local`.
2. Preencha no minimo:
   - `NEXTAUTH_SECRET`
   - `API_BASE_URL`
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_WS_URL`

## Autenticacao

- NextAuth (Credentials) chama `POST /api/v1/auth/login/` enviando cabecalho `X-Tenant`.
- Sessao JWT armazena token de backend e tenant para uso nos BFFs.
- As rotas `/api/bff/*` encaminham requisicoes com token e `X-Tenant` automaticamente.

## Checklist inicial

- [ ] Configurar Auth.js/NextAuth com tenants reais e usuarios de teste.
- [ ] Validar as rotas BFF (`/api/bff/conversations`, `/api/bff/tickets`).
- [ ] Expandir catalogo de componentes e paginacao na inbox.
- [ ] Publicar tokens via Style Dictionary (`pnpm run tokens`).
