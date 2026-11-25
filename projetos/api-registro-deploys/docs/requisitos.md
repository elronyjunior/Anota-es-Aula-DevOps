# Requisitos

## Funcionais

| Id | Requisito |
|---|---|
| RF01 | Registrar um deploy informando servico, versao, ambiente e status |
| RF02 | Listar todos os deploys |
| RF03 | Filtrar deploys por ambiente |
| RF04 | Consultar um deploy pelo id |
| RF05 | Remover um registro de deploy |
| RF06 | Informar se a API esta no ar (`/health`) |

## Regras de negocio

| Id | Regra |
|---|---|
| RN01 | `servico` e obrigatorio e nao pode ser so espacos |
| RN02 | `versao` segue o padrao semantico `X.Y.Z` |
| RN03 | `ambiente` aceita apenas `dev`, `homolog` ou `prod` |
| RN04 | `status` aceita `sucesso`, `falha` ou `rollback`; padrao `sucesso` |
| RN05 | Toda resposta de erro informa o motivo |

## Nao funcionais

| Id | Requisito | Como e verificado |
|---|---|---|
| RNF01 | p95 de latencia abaixo de 300 ms com 10 usuarios simultaneos | Teste k6 na pipeline |
| RNF02 | Taxa de erro abaixo de 1% sob carga | Teste k6 na pipeline |
| RNF03 | Nenhuma dependencia externa em producao | `package.json` sem `dependencies` |
| RNF04 | Container executa sem privilegio de root | `USER node` no Dockerfile |
