# Aula 04 - Ferramentas de Integracao e Entrega Continua

Coloque nesta pasta o material oficial da aula (slides em PDF).

## Resumo tecnico

Toda ferramenta de CI/CD faz basicamente a mesma coisa: escuta eventos do repositorio, sobe um ambiente isolado (runner/agente) e executa uma sequencia de passos definida em arquivo. O que muda e onde ela roda, como e configurada e quanto custa manter.

## Conceitos comuns entre as ferramentas

| Conceito | GitHub Actions | GitLab CI/CD | Jenkins |
|---|---|---|---|
| Arquivo de definicao | `.github/workflows/*.yml` | `.gitlab-ci.yml` | `Jenkinsfile` |
| Unidade de execucao | Job | Job | Stage |
| Maquina que executa | Runner | Runner | Agent |
| Reaproveitamento | Actions do Marketplace | Templates e `include` | Plugins e shared libraries |
| Segredos | Secrets do repositorio | Variaveis protegidas | Credentials |

## Hospedado x auto-hospedado

| Modelo | Vantagem | Desvantagem |
|---|---|---|
| Hospedado (SaaS) | Sem servidor para manter, comeca em minutos | Limite de minutos, menos controle |
| Auto-hospedado | Controle total do ambiente e dos dados | Exige manutencao, atualizacao e seguranca do servidor |
