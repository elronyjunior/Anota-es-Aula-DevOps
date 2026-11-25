# Anotacoes Aula DevOps

Repositorio de estudo da disciplina de Integracao e Entrega Continua (DevOps). Aqui ficam o resumo tecnico de cada aula, o registro das atividades praticas e os projetos desenvolvidos ao longo do semestre.

A ideia e que o repositorio sirva como referencia rapida: cada aula tem a teoria resumida em tabelas e a pratica documentada passo a passo, com link direto para o codigo.

## Indice de aulas

| Aula | Tema | Resumo | Atividade | Projeto relacionado |
|---|---|---|---|---|
| 01 | Introducao ao DevOps | [Resumo](Aula01/conteudo/README.md) | [Organizacao inicial](Aula01/atividade/Atividade01.md) | - |
| 02 | Conceitos de CI/CD e Git | [Resumo](Aula02/conteudo/README.md) | [Git, GitHub e publicacao](Aula02/atividade/Atividade02.md) | [site-versionamento](projetos/site-versionamento) |
| 03 | Gerencia de configuracao | [Resumo](Aula03/conteudo/README.md) | [Gerencia de configuracao na pratica](Aula03/atividade/Atividade03.md) | [site-versionamento](projetos/site-versionamento) |
| 04 | Ferramentas de CI/CD | [Resumo](Aula04/conteudo/README.md) | [Comparativo de ferramentas](Aula04/atividade/Atividade04.md) | - |
| 05 | Pipeline de integracao continua | [Resumo](Aula05/conteudo/README.md) | [Pipeline com GitHub Actions](Aula05/atividade/Atividade05.md) | [pipeline-site-estatico](projetos/pipeline-site-estatico) |
| 06 | Revisao de ferramentas e pipelines | [Resumo](Aula06/conteudo/README.md) | [Pipeline do repositorio e analise de projetos](Aula06/atividade/Atividade06.md) | [validacao.yml](.github/workflows/validacao.yml) |
| 07 | Testes automatizados | [Resumo](Aula07/conteudo/README.md) | [Testes em pipeline de CI](Aula07/atividade/Atividade07.md) | [api-registro-deploys](projetos/api-registro-deploys) |
| 08 | Ferramentas DevOps | [Resumo](Aula08/conteudo/README.md) | [Apresentacao: Docker](Aula08/atividade/Atividade08.md) | [Dockerfile da API](projetos/api-registro-deploys/Dockerfile) |
| 09 | Documentacao de software | [Resumo](Aula09/conteudo/README.md) | [Documentacao da API](Aula09/atividade/Atividade09.md) | [docs da API](projetos/api-registro-deploys/docs) |

## Projetos

Projetos com codigo proprio ficam em `projetos/`. Cada pasta ja tem seu README, seus testes e seu workflow, entao pode ser movida para um repositorio separado sem ajuste.

| Projeto | Descricao | Stack | Pipeline | Site |
|---|---|---|---|---|
| [site-versionamento](projetos/site-versionamento) | Pagina estatica para praticar commits, tags e deploy na Vercel | HTML, CSS, JS | Deploy automatico da Vercel | [site-versionamento.vercel.app](https://site-versionamento.vercel.app) |
| [pipeline-site-estatico](projetos/pipeline-site-estatico) | Guia de CI/CD publicado no GitHub Pages | HTML, CSS, JS, Node.js | [pipeline.yml](projetos/pipeline-site-estatico/.github/workflows/pipeline.yml) | [pipeline-site-estatico.vercel.app](https://pipeline-site-estatico.vercel.app) |
| [api-registro-deploys](projetos/api-registro-deploys) | API REST com testes unitarios, de integracao e de carga | Node.js, node:test, k6, Docker | [ci.yml](projetos/api-registro-deploys/.github/workflows/ci.yml) | - |

## Estrutura do repositorio

```
.
|-- .github/workflows/validacao.yml   pipeline deste repositorio
|-- scripts/validar_docs.py           validacoes usadas pela pipeline
|-- AulaNN/
|   |-- conteudo/                     slides da aula + README com resumo tecnico
|   `-- atividade/                    AtividadeNN.md com o registro da pratica
`-- projetos/
    |-- site-versionamento/
    |-- pipeline-site-estatico/
    `-- api-registro-deploys/
```

## Pipeline do repositorio

Todo push e pull request para `main` executa [validacao.yml](.github/workflows/validacao.yml):

| Etapa | O que verifica |
|---|---|
| Estrutura | Toda aula tem resumo e atividade |
| Links | Nenhum link relativo quebrado nos arquivos Markdown |
| Formato | Todo documento comeca com titulo e nao usa emoji |
| Seguranca | Nenhuma chave privada, token do GitHub ou chave AWS versionada |
| Projetos | `npm test` de cada projeto |
| Pacote | Gera um `.tar.gz` com a documentacao como artefato |

Detalhes na [Atividade 06](Aula06/atividade/Atividade06.md).

## Tecnologias e conceitos

| Area | Itens |
|---|---|
| Versionamento | Git, GitHub, tags, versionamento semantico, gerencia de configuracao |
| CI/CD | GitHub Actions, matriz, artefatos, permissoes, concorrencia, GitHub Pages, Vercel |
| Testes | node:test, testes unitarios, testes de integracao, k6 (carga) |
| Containers | Docker, Dockerfile, imagem, registry |
| Documentacao | Markdown, Mermaid, docs as code, requisitos e arquitetura |
| Ferramentas comparadas | GitHub Actions, GitLab CI/CD, Jenkins, Azure DevOps, CircleCI |

## Como usar

```bash
git clone https://github.com/elronyjunior/Anota-es-Aula-DevOps.git
cd Anota-es-Aula-DevOps

# validar a documentacao
python scripts/validar_docs.py links

# rodar os testes da API
cd projetos/api-registro-deploys && npm test
```
