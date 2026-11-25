# Atividade 02 - Git, GitHub e publicacao

## Objetivo

Praticar o ciclo completo de um projeto pequeno: criar os arquivos, versionar com commits e tags, enviar ao GitHub e publicar na internet.

## Projeto

| Item | Valor |
|---|---|
| Nome | Site Versionamento |
| Codigo | [projetos/site-versionamento](../../projetos/site-versionamento) |
| Tecnologias | HTML, CSS, JavaScript |
| Hospedagem | Vercel |
| Site publicado | [site-versionamento.vercel.app](https://site-versionamento.vercel.app) |

## Passo a passo

1. Instalacao do VS Code e do Git.
2. Configuracao da identidade do Git:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.com"
```

3. Criacao dos arquivos `index.html`, `style.css` e `script.js` em uma unica pasta.
4. Versionamento com um commit e uma tag por etapa:

| Tag | O que entrou |
|---|---|
| v0.1.0 | Estrutura HTML |
| v0.2.0 | CSS |
| v0.3.0 | Tabela gerada por JavaScript |
| v1.0.0 | Versao publicada |

5. Envio ao GitHub com `git push -u origin main --tags`.
6. Importacao do repositorio na Vercel (preset "Other", sem build).

## Resultado

- Historico com tags que permitem voltar a qualquer versao: `git checkout v0.2.0`.
- Cada push na `main` gera um novo deploy automatico na Vercel. Esse e o primeiro contato pratico com entrega continua.

## Observacoes

- Tag nao e enviada por padrao no `git push`; e preciso `--tags` ou `git push origin v1.0.0`.
- A Vercel cria deploys de preview para outras branches, o que permite revisar antes de ir para producao.
