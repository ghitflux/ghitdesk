# Design Tokens

Origem única para cores, espaçamentos, sombras e raios do design system da GhitDesk. Utilize Style Dictionary:

```bash
pnpm add -D style-dictionary
pnpm style-dictionary build --config shared/tokens/style-dictionary.config.cjs
```

Integração com Figma (Tokens Studio) deve exportar para `ghitdesk.tokens.json` mantendo versionamento via Git.
