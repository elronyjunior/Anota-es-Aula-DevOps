# Aula 02 - Integracao e Entrega Continua: conceitos

Coloque nesta pasta o material oficial da aula (slides em PDF).

## Resumo tecnico

| Pratica | Definicao curta | Gatilho | Intervencao humana |
|---|---|---|---|
| Integracao Continua (CI) | Integrar codigo na branch principal varias vezes por dia, sempre com build e testes automaticos | Push ou pull request | Nao |
| Entrega Continua (CD) | Todo codigo aprovado na CI fica pronto para producao | Fim da CI | Sim, para liberar o deploy |
| Implantacao Continua | Todo codigo aprovado vai direto para producao | Fim da CI | Nao |

A diferenca entre Entrega e Implantacao Continua esta so no ultimo passo: quem aperta o botao de producao.

## Git em uma tabela

| Comando | Para que serve |
|---|---|
| `git init` | Cria um repositorio local |
| `git status` | Mostra o que mudou e o que esta preparado para commit |
| `git add <arquivo>` | Coloca a alteracao na area de preparacao (staging) |
| `git commit -m "msg"` | Grava um ponto no historico |
| `git tag v1.0.0` | Marca uma versao especifica do historico |
| `git remote add origin <url>` | Liga o repositorio local ao remoto |
| `git push -u origin main --tags` | Envia commits e tags para o remoto |
| `git pull` | Traz alteracoes do remoto |

## Local x remoto

```
Diretorio de trabalho --add--> Staging --commit--> Repositorio local --push--> Repositorio remoto (GitHub)
```

## Versionamento semantico

`MAJOR.MINOR.PATCH`, por exemplo `2.4.1`:

- MAJOR: mudanca que quebra compatibilidade.
- MINOR: nova funcionalidade compativel.
- PATCH: correcao de bug.
