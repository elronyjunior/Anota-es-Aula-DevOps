# Atividade 05 - Pipeline com GitHub Actions

## Objetivo

Montar uma pipeline de CI/CD real usando actions do Marketplace, com testes, build, deploy e verificacao apos o deploy.

## Projeto

| Item | Valor |
|---|---|
| Nome | Pipeline Site Estatico |
| Codigo | [projetos/pipeline-site-estatico](../../projetos/pipeline-site-estatico) |
| Workflow | [pipeline.yml](../../projetos/pipeline-site-estatico/.github/workflows/pipeline.yml) |
| Hospedagem | GitHub Pages (pipeline) e Vercel |
| Site publicado | [pipeline-site-estatico.vercel.app](https://pipeline-site-estatico.vercel.app) |

## Actions escolhidas

| Action | Etapa | Por que foi escolhida |
|---|---|---|
| `actions/checkout@v7` | Todas | Sem ela o runner nao tem o codigo |
| `actions/setup-node@v7` | Testes e build | Garante a mesma versao do Node (22) em todo run |
| `actions/upload-pages-artifact@v5` | Build | Empacota `dist/` no formato que o Pages espera |
| `actions/deploy-pages@v5` | Deploy | Publica e devolve a URL final, usada na verificacao |

## Fluxo

```
testes --> build --> deploy --> verificacao
```

| Job | Execucao | Condicao |
|---|---|---|
| testes | `npm test` | Sempre |
| build | `npm run build` e `npm run check:size` | Se testes passar |
| deploy | Publicacao no GitHub Pages | Apenas em push ou execucao manual, nunca em pull request |
| verificacao | `curl` na URL publicada, ate 5 tentativas | Se deploy passar |

## Decisoes tecnicas

- **Pull request nao publica.** Em PR a pipeline so valida. Isso evita que codigo nao revisado chegue ao site.
- **Limite de tamanho.** O build falha se `dist/` passar de 500 KB. E uma forma simples de teste de desempenho para site estatico.
- **Permissoes minimas.** O workflow pede apenas `contents: read`, `pages: write` e `id-token: write`.
- **Concorrencia.** `concurrency: pages` cancela um deploy antigo se um novo comecar, evitando publicar fora de ordem.

## Como habilitar

Em **Settings > Pages > Source**, selecionar **GitHub Actions**. Depois disso cada push na `main` publica o site.
