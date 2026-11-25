# Aula 06 - Revisao de Ferramentas e Pipelines

Coloque nesta pasta o material oficial da aula (slides em PDF).

## Resumo tecnico

Recursos do GitHub Actions que aparecem com frequencia em projetos reais:

| Recurso | Para que serve | Exemplo |
|---|---|---|
| `strategy.matrix` | Roda o mesmo job com combinacoes diferentes (versoes, sistemas) | Node 20, 22 e 24 em Linux e Windows |
| `fail-fast: false` | Uma combinacao da matriz falhar nao cancela as outras | Ver todas as versoes que quebram |
| `concurrency` | Cancela execucoes antigas da mesma branch | Push seguido de outro push |
| `paths-ignore` | Nao roda a pipeline se so mudou documentacao | Ignorar `*.md` |
| `permissions` | Restringe o token automatico do workflow | `contents: read` |
| `needs` | Ordem entre jobs | Deploy depois dos testes |
| Artefatos | Passar arquivos entre jobs ou guardar resultado | Relatorio de cobertura |
| Cache | Reaproveitar dependencias entre execucoes | `actions/cache`, `cache: npm` |
| Fixar action por SHA | Evita que uma tag alterada mude o codigo executado | `uses: actions/checkout@<sha> # v7.0.1` |
