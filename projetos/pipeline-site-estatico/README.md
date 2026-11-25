# Pipeline Site Estatico

Site estatico com um guia rapido de CI/CD, publicado no GitHub Pages por uma pipeline do GitHub Actions. Projeto da [Aula 05 - Pipeline de integracao continua](../../Aula05/atividade/Atividade05.md).

O conteudo do site e simples de proposito. O foco esta na pipeline: cada push na `main` testa, gera o build, confere o tamanho, publica e verifica se o site respondeu.

## Fluxo da pipeline

Arquivo: [`.github/workflows/pipeline.yml`](.github/workflows/pipeline.yml)

```
testes --> build --> deploy --> verificacao
```

| Job | O que faz | Falha quando |
|---|---|---|
| `testes` | Roda `npm test` (arquivos obrigatorios, referencias do HTML, ids usados pelo JS) | Algum arquivo ou referencia esta quebrado |
| `build` | Copia `src/` para `dist/`, mede o tamanho e gera o artefato do Pages | `dist/` passa de 500 KB |
| `deploy` | Publica o artefato no GitHub Pages | Pages nao esta habilitado ou falta permissao |
| `verificacao` | Faz ate 5 requisicoes HTTP na URL publicada | O site nao responde 200 |

## Gatilhos

| Evento | Resultado |
|---|---|
| `push` na `main` | Pipeline completa, com deploy |
| `pull_request` para `main` | Apenas testes e build, sem deploy |
| `workflow_dispatch` | Execucao manual pela aba Actions |

## Actions utilizadas

| Action | Funcao |
|---|---|
| `actions/checkout@v7` | Baixa o codigo no runner |
| `actions/setup-node@v7` | Instala o Node.js 22 |
| `actions/upload-pages-artifact@v5` | Empacota `dist/` no formato aceito pelo Pages |
| `actions/deploy-pages@v5` | Publica o artefato e devolve a URL |

## Como rodar localmente

```bash
npm test
npm run build
npm run check:size
```

Para publicar: em **Settings > Pages**, selecione **Source: GitHub Actions**.

## Estrutura

```
pipeline-site-estatico/
|-- .github/workflows/pipeline.yml
|-- scripts/
|   |-- build.js
|   `-- check-size.js
|-- src/
|   |-- index.html
|   |-- script.js
|   `-- style.css
|-- tests/site.test.js
`-- package.json
```
