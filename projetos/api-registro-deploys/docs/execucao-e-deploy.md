# Execucao e deploy

## Pre-requisitos

| Ferramenta | Versao | Obrigatoria |
|---|---|---|
| Node.js | 22 ou superior | Sim |
| k6 | Qualquer recente | Apenas para teste de carga |
| Docker | Qualquer recente | Apenas para rodar em container |

## Variaveis de ambiente

| Variavel | Padrao | Descricao |
|---|---|---|
| `PORT` | `3000` | Porta HTTP da API |

## Rodando localmente

```bash
npm start
curl http://localhost:3000/health
curl -X POST http://localhost:3000/deploys \
  -H "Content-Type: application/json" \
  -d '{"servico":"checkout","versao":"1.0.0","ambiente":"dev"}'
```

## Rodando em container

```bash
docker build -t api-registro-deploys:1.0.0 .
docker run -d -p 3000:3000 api-registro-deploys:1.0.0
```

## Pipeline

Definida em [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). Roda em push e pull request para `main` e pode ser disparada manualmente.
