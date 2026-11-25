# API Registro de Deploys

API REST simples para registrar cada deploy feito em um servico: qual versao subiu, em qual ambiente e se deu certo. Foi criada para a [Aula 07 - Testes automatizados](../../Aula07/atividade/Atividade07.md) com um objetivo claro: ter um codigo pequeno o bastante para testar em tres niveis (unidade, integracao e carga) dentro de uma pipeline de CI.

## Decisao tecnica

O projeto nao usa dependencias externas. O servidor e feito com o modulo `http` do Node.js e os testes com o test runner nativo (`node:test`). Isso deixa o `npm install` desnecessario e a pipeline mais rapida.

| Item | Escolha | Motivo |
|---|---|---|
| Runtime | Node.js 22 | Ja traz `fetch` e `node:test` embutidos |
| Servidor HTTP | `node:http` | Sem framework, menos dependencias para auditar |
| Testes unitarios e de integracao | `node:test` + `assert` | Nativo, sem instalacao |
| Teste de carga | k6 | Ferramenta padrao de mercado, roda bem em CI |
| CI | GitHub Actions | Integrado ao repositorio |
| Armazenamento | Memoria | Foco nos testes, nao em banco de dados |

## Rotas

| Metodo | Rota | Descricao | Resposta |
|---|---|---|---|
| GET | `/health` | Verifica se a API esta no ar | 200 |
| GET | `/deploys` | Lista deploys (filtro opcional `?ambiente=prod`) | 200 |
| GET | `/deploys/:id` | Busca um deploy | 200 ou 404 |
| POST | `/deploys` | Registra um deploy | 201 ou 400 |
| DELETE | `/deploys/:id` | Remove um registro | 204 ou 404 |

Corpo esperado no POST:

```json
{ "servico": "checkout", "versao": "1.2.0", "ambiente": "prod", "status": "sucesso" }
```

Regras de validacao:

- `servico`: texto obrigatorio.
- `versao`: formato semantico `X.Y.Z`.
- `ambiente`: `dev`, `homolog` ou `prod`.
- `status` (opcional): `sucesso`, `falha` ou `rollback`. Padrao `sucesso`.

## Como executar

```bash
npm start                  # sobe a API na porta 3000
npm test                   # unitarios + integracao
npm run test:unit
npm run test:integration
npm run test:performance   # exige k6 instalado
```

## Estrategia de testes

| Nivel | Arquivo | O que valida | Casos |
|---|---|---|---|
| Unitario | `tests/unit/deployService.test.js` | Regras de negocio e validacao, sem HTTP | 7 |
| Integracao | `tests/integration/rotas.test.js` | Rotas reais, servidor em porta aleatoria, requisicoes com `fetch` | 7 |
| Carga | `tests/performance/deploys.k6.js` | Rampa ate 10 usuarios virtuais; p95 abaixo de 300 ms e falhas abaixo de 1% | 1 cenario |

O teste de integracao sobe o servidor na porta `0`, o sistema operacional escolhe uma porta livre. Assim os testes nao conflitam com outro processo rodando na 3000.

## Pipeline

Arquivo: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)

```
unitarios --> integracao --> performance
```

Os jobs sao sequenciais de proposito: se a regra de negocio quebra, nao faz sentido gastar tempo de runner com integracao ou carga.

## Estrutura

```
api-registro-deploys/
|-- .github/workflows/ci.yml
|-- scripts/performance.sh
|-- src/
|   |-- app.js
|   |-- deployService.js
|   `-- server.js
|-- tests/
|   |-- unit/
|   |-- integration/
|   `-- performance/
`-- package.json
```

## Documentacao

| Documento | Conteudo |
|---|---|
| [docs/requisitos.md](docs/requisitos.md) | Requisitos funcionais, regras de negocio e requisitos nao funcionais |
| [docs/arquitetura.md](docs/arquitetura.md) | Camadas, diagramas Mermaid e limitacoes |
| [docs/execucao-e-deploy.md](docs/execucao-e-deploy.md) | Pre-requisitos, variaveis, execucao local e em container |
| [Dockerfile](Dockerfile) | Imagem de container (ver [Aula 08](../../Aula08/atividade/Atividade08.md)) |
