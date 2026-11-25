# Atividade 06 - Pipeline deste repositorio e analise de projetos abertos

## Parte 1 - Pipeline deste repositorio

Arquivo: [.github/workflows/validacao.yml](../../.github/workflows/validacao.yml)
Script usado pelos jobs: [scripts/validar_docs.py](../../scripts/validar_docs.py)

### Fluxo

```
documentacao (matriz: estrutura | links | formato | seguranca)
        |
        v
projetos (matriz: api-registro-deploys | pipeline-site-estatico)
        |
        v
pacote (gera .tar.gz e guarda como artefato)
```

| Job | Verificacao | Falha quando |
|---|---|---|
| documentacao / estrutura | Cada aula tem `conteudo/README.md` e `atividade/AtividadeNN.md` | Falta algum arquivo |
| documentacao / links | Links relativos dos `.md` apontam para arquivos existentes | Link quebrado |
| documentacao / formato | Todo `.md` comeca com titulo e nao tem emoji | Fora do padrao |
| documentacao / seguranca | Busca chave privada, token do GitHub e chave AWS | Encontrou padrao de segredo |
| projetos | Roda `npm test` em cada projeto | Algum teste falhou |
| pacote | Gera `anotacoes-devops.tar.gz` | Erro no empacotamento |

### Decisoes

- **Matriz em vez de jobs repetidos.** As quatro verificacoes usam o mesmo script com argumento diferente. Com `matrix` o YAML fica curto e cada verificacao aparece separada na aba Actions.
- **`fail-fast: false`.** Se o formato falhar, os links continuam sendo verificados. O relatorio mostra todos os problemas de uma vez.
- **Sem dependencias externas.** O script usa so a biblioteca padrao do Python.

Para rodar localmente:

```bash
python scripts/validar_docs.py estrutura
python scripts/validar_docs.py links
python scripts/validar_docs.py formato
python scripts/validar_docs.py seguranca
```

## Parte 2 - Analise de tres repositorios publicos

Foram escolhidos projetos de ecossistemas e tamanhos diferentes para comparar como cada um organiza o CI.

| Projeto | Linguagem | Workflow analisado |
|---|---|---|
| [expressjs/express](https://github.com/expressjs/express) | JavaScript | [ci.yml](https://github.com/expressjs/express/blob/master/.github/workflows/ci.yml) |
| [pallets/flask](https://github.com/pallets/flask) | Python | [tests.yaml](https://github.com/pallets/flask/blob/main/.github/workflows/tests.yaml) |
| [vitejs/vite](https://github.com/vitejs/vite) | TypeScript | [ci.yml](https://github.com/vitejs/vite/blob/main/.github/workflows/ci.yml) |

### Express

- Gatilhos: `push` em `master`, `develop` e branches de versao (`4.x`, `5.x`), `pull_request` e `workflow_dispatch`. Ignora alteracoes so em `*.md`.
- Jobs: `lint`, `test` e `coverage`.
- `test` usa matriz com Node.js do 18 ao 26 em `ubuntu-latest` e `windows-latest`.
- Cada combinacao envia seu `lcov.info` como artefato; o job `coverage` junta todos e envia ao Coveralls.
- Actions fixadas por SHA e `permissions: contents: read`.

### Flask

- Gatilhos: `push` em `main` e `stable`, `pull_request`. Ignora `docs/**` e `README.md`.
- Jobs: `tests` e `typing`.
- Matriz com `include`: varias versoes do Python (3.11 ate 3.15, incluindo a versao free-threaded `3.14t`), PyPy, Windows, macOS, e ambientes com versoes minimas e de desenvolvimento das dependencias.
- Usa `uv` para instalar dependencias e `tox` para executar os ambientes de teste.
- `typing` roda o mypy com cache do `.mypy_cache`.
- `permissions: {}` (nenhuma permissao padrao) e `concurrency` por PR.

### Vite

- Gatilhos: `push` em `main` e em branches de release, feature, fix e versao; `pull_request` e `workflow_dispatch`.
- Primeiro job (`changed`) verifica os arquivos alterados. Se mudou so documentacao ou markdown, os testes pesados sao pulados.
- `test` usa matriz com Node 20, 22, 24 e 26 em Linux, mais Node 26 em macOS e Windows, com `timeout-minutes: 20`.
- Instala e faz cache do navegador do Playwright para testes que rodam em navegador.
- Variaveis de ambiente globais para memoria do Node e retry de testes instaveis.

### Comparativo

| Criterio | Express | Flask | Vite |
|---|---|---|---|
| Matriz de versoes | Node 18 a 26 | Python 3.11 a 3.15 + PyPy | Node 20 a 26 |
| Sistemas operacionais | Linux, Windows | Linux, Windows, macOS | Linux, Windows, macOS |
| Pula quando muda so docs | Sim (`paths-ignore`) | Sim (`paths-ignore`) | Sim (job `changed`) |
| Concurrency | Sim | Sim | Sim |
| Permissoes restritas | `contents: read` | Nenhuma | Nenhuma |
| Actions fixadas por SHA | Sim | Sim | Sim |
| Cobertura de testes | Sim, consolidada | Nao neste workflow | Nao neste workflow |
| Complexidade | Media | Media | Alta |

### Conclusoes

1. Os tres projetos restringem as permissoes do token e fixam actions por SHA. Seguranca da pipeline e tratada como requisito, nao como detalhe.
2. Todos evitam gastar runner com mudancas so de documentacao. Quanto maior o projeto, mais sofisticado o filtro (o Vite usa um job dedicado).
3. A matriz e o recurso central em bibliotecas: o objetivo e garantir que o codigo funciona em todas as versoes suportadas, nao so na maquina do desenvolvedor.
4. Pontos que foram trazidos para a pipeline deste repositorio: `permissions` restrito, `matrix` com `fail-fast: false` e uso de artefato.

Analise feita com base nos arquivos de workflow da branch principal de cada projeto em novembro de 2026.
