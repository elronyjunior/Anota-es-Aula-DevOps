# Aula 03 - Gerencia de Configuracao

Coloque nesta pasta o material oficial da aula (slides em PDF).

## Resumo tecnico

Gerencia de Configuracao de Software (GCS) e o conjunto de praticas que garante que se sabe exatamente o que compoe cada versao do sistema e que qualquer versao pode ser reproduzida.

| Atividade da GCS | Pergunta que responde | Ferramenta comum |
|---|---|---|
| Identificacao | Quais itens fazem parte do sistema? | Estrutura do repositorio |
| Controle de versao | O que mudou, quando e por quem? | Git |
| Controle de mudancas | Essa mudanca foi revisada e aprovada? | Pull request, issues |
| Auditoria | A versao em producao bate com o repositorio? | Tags, logs de pipeline |
| Relato de status | Em que estado esta cada item? | Releases, changelog |

## Item de configuracao

Tudo que influencia o resultado final deve ser versionado:

- Codigo-fonte.
- Arquivos de dependencias (`package.json`, `package-lock.json`).
- Configuracao de build (`vite.config.js`, `tsconfig.json`).
- Definicao de pipeline (`.github/workflows/*.yml`).
- Infraestrutura como codigo (Dockerfile, Terraform).

O que **nao** deve ser versionado: `node_modules/`, `dist/`, arquivos `.env` com senhas. Para isso existe o `.gitignore`.

## Build reproduzivel

| Comando | Comportamento |
|---|---|
| `npm install` | Pode atualizar versoes dentro do intervalo do `package.json` |
| `npm ci` | Instala exatamente o que esta no `package-lock.json`; usado em pipelines |
