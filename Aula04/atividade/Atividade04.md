# Atividade 04 - Comparativo de ferramentas de CI/CD

## Objetivo

Comparar as principais ferramentas de CI/CD do mercado e justificar qual faz mais sentido para os projetos da disciplina.

## Criterios usados

Os criterios foram escolhidos pensando em um time pequeno, com codigo no GitHub e sem servidor proprio:

1. Integracao com o repositorio.
2. Curva de aprendizado.
3. Custo para projetos publicos e academicos.
4. Necessidade de infraestrutura propria.
5. Ecossistema de extensoes.

## Ferramentas avaliadas

| Ferramenta | Tipo | Configuracao | Ponto forte | Ponto fraco |
|---|---|---|---|---|
| GitHub Actions | SaaS (runner proprio opcional) | YAML | Nativo do GitHub, Marketplace grande | Preso ao GitHub |
| GitLab CI/CD | SaaS ou auto-hospedado | YAML | Plataforma completa (repo, CI, registry, seguranca) | Recursos avancados em planos pagos |
| Jenkins | Auto-hospedado | Groovy (Jenkinsfile) | Altamente customizavel, milhares de plugins | Manutencao do servidor e dos plugins |
| Azure DevOps Pipelines | SaaS ou auto-hospedado | YAML ou editor visual | Integracao com Azure e Boards | Mais complexo para projetos pequenos |
| CircleCI | SaaS | YAML | Execucao rapida, cache eficiente | Limite de creditos no plano gratuito |
| Travis CI | SaaS | YAML | Simples | Perdeu espaco apos mudancas no plano gratuito |
| AWS CodePipeline | SaaS (AWS) | Console, JSON ou YAML | Integracao com servicos AWS | Fora da AWS perde valor |

## Matriz de avaliacao

Notas de 1 (fraco) a 5 (forte), considerando o cenario da disciplina:

| Criterio | GitHub Actions | GitLab CI/CD | Jenkins |
|---|---|---|---|
| Integracao com o repositorio | 5 | 3 (repo no GitHub) | 3 |
| Curva de aprendizado | 4 | 4 | 2 |
| Custo | 5 (gratis para repositorio publico) | 4 | 3 (custo do servidor) |
| Infraestrutura propria | 5 (nao precisa) | 5 (nao precisa) | 1 (precisa) |
| Ecossistema | 5 | 4 | 5 |
| **Total** | **24** | **20** | **14** |

## Conclusao

Para este contexto o GitHub Actions e a escolha mais direta: o codigo ja esta no GitHub, nao ha servidor para manter e repositorios publicos nao pagam pelos minutos de runner. Jenkins continua relevante em empresas que precisam rodar tudo dentro da propria rede, mas o custo de manutencao nao se justifica aqui. Por isso todos os projetos deste repositorio usam GitHub Actions.

## Referencias

- [Documentacao do GitHub Actions](https://docs.github.com/actions)
- [Documentacao do GitLab CI/CD](https://docs.gitlab.com/ee/ci/)
- [Documentacao do Jenkins](https://www.jenkins.io/doc/)
- [Documentacao do Azure Pipelines](https://learn.microsoft.com/azure/devops/pipelines/)
