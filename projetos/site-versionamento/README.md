# Site Versionamento

Pagina estatica (HTML, CSS e JavaScript) usada para praticar o fluxo basico de versionamento e publicacao. Projeto das aulas [02](../../Aula02/atividade/Atividade02.md) e [03](../../Aula03/atividade/Atividade03.md).

## Fluxo praticado

```bash
git init
git add .
git commit -m "feat: estrutura inicial"
git tag v0.1.0
git remote add origin <url-do-repositorio>
git push -u origin main --tags
```

| Tag | Alteracao |
|---|---|
| v0.1.0 | Estrutura inicial com HTML |
| v0.2.0 | Estilo com CSS |
| v0.3.0 | Tabela gerada com JavaScript |
| v1.0.0 | Publicacao na Vercel |

## Publicacao na Vercel

1. Importar o repositorio em vercel.com/new.
2. Framework preset: **Other** (site estatico, sem build).
3. Cada push na `main` gera um novo deploy de producao; cada branch gera um deploy de preview.

## Estrutura

```
site-versionamento/
|-- index.html
|-- script.js
`-- style.css
```
