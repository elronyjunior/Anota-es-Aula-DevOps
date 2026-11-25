# Atividade 09 - Documentacao de software

## Objetivo

Documentar um projeto de forma que outra pessoa consiga entender, executar, testar e publicar o sistema sem precisar perguntar a quem escreveu.

## Projeto documentado

| Item | Valor |
|---|---|
| Projeto | [API Registro de Deploys](../../projetos/api-registro-deploys) |
| Origem | Projeto da [Aula 07](../../Aula07/atividade/Atividade07.md) |
| Formato | Markdown com diagramas Mermaid |

## Documentos produzidos

| Documento | Responde a pergunta |
|---|---|
| [README.md](../../projetos/api-registro-deploys/README.md) | O que e o projeto e como comecar? |
| [docs/requisitos.md](../../projetos/api-registro-deploys/docs/requisitos.md) | O que o sistema deve fazer e quais regras segue? |
| [docs/arquitetura.md](../../projetos/api-registro-deploys/docs/arquitetura.md) | Como o codigo esta organizado e como uma requisicao percorre o sistema? |
| [docs/execucao-e-deploy.md](../../projetos/api-registro-deploys/docs/execucao-e-deploy.md) | Como rodar localmente, em container e na pipeline? |

## Criterios atendidos

| Criterio | Onde esta |
|---|---|
| Descricao do sistema | README |
| Requisitos funcionais e nao funcionais | `docs/requisitos.md` |
| Regras de negocio | `docs/requisitos.md` |
| Arquitetura com diagrama | `docs/arquitetura.md` (flowchart e sequence diagram) |
| Instalacao e execucao | `docs/execucao-e-deploy.md` |
| Referencia de rotas | README, tabela de rotas |
| Estrategia de testes | README, tabela de testes |
| Limitacoes conhecidas | `docs/arquitetura.md` |

## Rastreabilidade

Cada requisito nao funcional aponta como e verificado. Exemplo: RNF01 (p95 abaixo de 300 ms) e o mesmo threshold configurado no teste k6. Se o requisito mudar, a documentacao e o teste precisam mudar juntos, e a pipeline evidencia qualquer divergencia.

## Validacao automatica

A pipeline deste repositorio ([validacao.yml](../../.github/workflows/validacao.yml)) verifica em todo push:

- Se todos os links relativos dos arquivos Markdown apontam para arquivos existentes.
- Se todo documento comeca com titulo.
- Se nao ha segredos expostos.
