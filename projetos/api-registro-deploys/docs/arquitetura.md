# Arquitetura

## Visao geral

```mermaid
flowchart LR
    C[Cliente HTTP] --> S[server.js<br/>sobe o servidor]
    S --> A[app.js<br/>roteamento e respostas]
    A --> D[deployService.js<br/>regras e validacao]
    D --> M[(Memoria)]
```

| Camada | Arquivo | Responsabilidade |
|---|---|---|
| Entrada | `src/server.js` | Le a porta do ambiente e inicia o servidor |
| HTTP | `src/app.js` | Interpreta rota e metodo, le o corpo JSON, define o status HTTP |
| Regra de negocio | `src/deployService.js` | Valida dados, cria, lista, busca e remove registros |
| Armazenamento | Array em memoria | Guarda os registros enquanto o processo esta ativo |

A separacao entre `app.js` e `deployService.js` e o que permite testar as regras sem HTTP (unitario) e as rotas com HTTP (integracao).

## Fluxo de um POST /deploys

```mermaid
sequenceDiagram
    participant C as Cliente
    participant A as app.js
    participant D as deployService
    C->>A: POST /deploys (JSON)
    A->>A: le e converte o corpo
    A->>D: criar(dados)
    D->>D: validar(dados)
    alt dados validos
        D-->>A: registro criado
        A-->>C: 201 + registro
    else dados invalidos
        D-->>A: erro com detalhes
        A-->>C: 400 + detalhes
    end
```

## Limitacoes conhecidas

| Limitacao | Impacto | Evolucao possivel |
|---|---|---|
| Armazenamento em memoria | Dados somem ao reiniciar | Banco SQLite ou PostgreSQL |
| Sem autenticacao | Qualquer cliente pode registrar ou remover | Token por servico |
| Sem paginacao | Lista cresce sem limite | Parametros `limit` e `offset` |
