# Aula 05 - Pipeline de Integracao Continua

Coloque nesta pasta o material oficial da aula (slides em PDF).

## Resumo tecnico

Pipeline e a sequencia automatizada de etapas que leva o codigo do commit ate o ambiente publicado. Se uma etapa falha, as seguintes nao rodam.

## Anatomia de um workflow do GitHub Actions

```yaml
name: Nome do workflow          # aparece na aba Actions
on:                             # gatilhos
  push:
    branches: [main]
jobs:
  testes:                       # id do job
    runs-on: ubuntu-latest      # sistema do runner
    steps:
      - uses: actions/checkout@v7   # action pronta
      - run: npm test               # comando de shell
  deploy:
    needs: testes               # so roda se "testes" passar
    runs-on: ubuntu-latest
    steps:
      - run: echo "publicando"
```

| Chave | Funcao |
|---|---|
| `on` | Quais eventos disparam a pipeline |
| `jobs` | Blocos de trabalho; rodam em paralelo por padrao |
| `needs` | Cria dependencia entre jobs (ordem) |
| `runs-on` | Imagem da maquina virtual |
| `steps` | Passos dentro de um job, sempre em sequencia |
| `uses` | Executa uma action pronta |
| `run` | Executa um comando |
| `if` | Condicao para rodar o job ou o passo |
| `permissions` | Permissoes do token automatico do workflow |

## Etapas tipicas

| Etapa | Pergunta que responde |
|---|---|
| Build | O codigo compila / empacota? |
| Teste | O comportamento esta correto? |
| Qualidade | O codigo segue o padrao do time? |
| Seguranca | Ha dependencia vulneravel ou segredo exposto? |
| Deploy | A nova versao foi publicada? |
| Verificacao | O ambiente publicado esta respondendo? |
