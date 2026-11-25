# Atividade 03 - Gerencia de configuracao na pratica

## Objetivo

Aplicar gerencia de configuracao em um projeto: identificar o que deve ou nao ser versionado, garantir build reproduzivel e publicar a partir do repositorio.

## Projeto

| Item | Valor |
|---|---|
| Codigo | [projetos/site-versionamento](../../projetos/site-versionamento) |
| Hospedagem | Vercel |
| Site publicado | [site-versionamento.vercel.app](https://site-versionamento.vercel.app) |

## Checklist aplicado

| Item | Situacao |
|---|---|
| Codigo-fonte versionado | Sim |
| Versoes marcadas com tag semantica | Sim (`v0.1.0` ate `v1.0.0`) |
| `.gitignore` excluindo `node_modules/` e `dist/` | Sim |
| Nenhum segredo no repositorio | Sim |
| Deploy feito a partir do repositorio, nao da maquina local | Sim (Vercel ligada ao GitHub) |

## Fluxo de deploy na Vercel

```
push na main -> Vercel detecta -> baixa o codigo -> instala dependencias -> build -> publica
```

Como o deploy parte do repositorio, a versao no ar e sempre rastreavel ate um commit especifico. Isso e o que a gerencia de configuracao busca: nenhuma alteracao em producao sem registro.

## Problema comum observado

Ao copiar um projeto de outro lugar, ele pode trazer uma pasta `.git` propria. O Git trata isso como repositorio aninhado e nao versiona os arquivos internos. Solucao:

```bash
rm -rf pasta-copiada/.git
git add pasta-copiada
git commit -m "chore: incorpora projeto copiado"
```
