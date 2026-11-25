# Atividade 07 - Testes automatizados em pipeline de CI

## Objetivo

Criar um projeto com testes em tres niveis (unitario, integracao e carga) e executar todos automaticamente no GitHub Actions.

## Projeto

| Item | Valor |
|---|---|
| Nome | API Registro de Deploys |
| Codigo | [projetos/api-registro-deploys](../../projetos/api-registro-deploys) |
| Workflow | [ci.yml](../../projetos/api-registro-deploys/.github/workflows/ci.yml) |
| Dominio | Registro de deploys por servico, versao e ambiente |

A API registra cada deploy feito (servico, versao semantica, ambiente e status). O tema foi escolhido por ter regras de validacao claras, o que facilita escrever casos de teste objetivos.

## Ferramentas

| Ferramenta | Uso |
|---|---|
| Node.js 22 | Runtime |
| `node:http` | Servidor HTTP sem framework |
| `node:test` + `node:assert` | Testes unitarios e de integracao, nativos do Node |
| `fetch` | Requisicoes HTTP nos testes de integracao |
| k6 | Teste de carga |
| GitHub Actions | Execucao automatica |

A escolha por ferramentas nativas foi intencional: o projeto nao tem nenhuma dependencia, entao nao existe `npm install` na pipeline nem vulnerabilidade de terceiros para acompanhar.

## Casos de teste

### Unitarios (7)

| Caso | Resultado esperado |
|---|---|
| Deploy valido | Criado com id e status padrao `sucesso` |
| Versao `v1` | Rejeitado, fora do padrao `X.Y.Z` |
| Ambiente `teste` | Rejeitado, fora de `dev`, `homolog`, `prod` |
| Servico vazio | Rejeitado |
| Filtro por ambiente | Retorna apenas os registros do ambiente |
| Busca por id | Retorna o registro ou `null` |
| Remocao | `true` na primeira vez, `false` na segunda |

### Integracao (7)

| Requisicao | Resultado esperado |
|---|---|
| `GET /health` | 200 |
| `POST /deploys` valido | 201 com o registro |
| `POST /deploys` invalido | 400 com 3 erros detalhados |
| `GET /deploys?ambiente=prod` | Apenas registros de producao |
| `GET /deploys/42` inexistente | 404 |
| `DELETE /deploys/:id` | 204 e depois 404 na busca |
| Rota desconhecida | 404 |

O servidor sobe na porta `0` (porta livre escolhida pelo sistema) e o armazenamento e limpo antes de cada caso, entao os testes sao independentes entre si.

### Carga (k6)

| Parametro | Valor |
|---|---|
| Rampa | 0 a 10 usuarios em 5 s, 10 usuarios por 10 s, 10 a 0 em 5 s |
| Cenario | Cada usuario cria um deploy e lista os deploys de `dev` |
| Threshold de latencia | p95 abaixo de 300 ms |
| Threshold de erro | Menos de 1% de falhas |

## Pipeline

```
unitarios --> integracao --> performance
```

Jobs em sequencia: um erro de regra de negocio interrompe a pipeline logo no inicio, sem gastar tempo com os testes mais lentos.

## Resultado local

```
$ npm test
# tests 14
# pass 14
# fail 0
```
