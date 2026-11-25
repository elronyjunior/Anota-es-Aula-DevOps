# Aula 07 - Testes Automatizados

Coloque nesta pasta o material oficial da aula (slides em PDF).

## Resumo tecnico

Teste automatizado e codigo que verifica outro codigo. Dentro de uma pipeline ele e a barreira que impede uma alteracao quebrada de chegar a producao.

## Piramide de testes

```
        /\        E2E / interface    poucos, lentos, caros
       /  \
      /----\      Integracao         quantidade media
     /      \
    /--------\    Unitario           muitos, rapidos, baratos
```

| Tipo | Escopo | Velocidade | Exemplo |
|---|---|---|---|
| Unitario | Uma funcao ou classe isolada | Milissegundos | Validar formato de versao |
| Integracao | Varias partes juntas (rota + regra + armazenamento) | Segundos | `POST /deploys` retorna 201 |
| End-to-end | Sistema inteiro pela interface | Minutos | Usuario preenche formulario no navegador |
| Desempenho / carga | Comportamento sob muitos acessos | Minutos | 10 usuarios simultaneos, p95 abaixo de 300 ms |

## Termos importantes

| Termo | Significado |
|---|---|
| Asercao (assert) | Comparacao entre o resultado obtido e o esperado |
| Mock / stub | Substituto de uma dependencia real durante o teste |
| Cobertura | Percentual do codigo executado pelos testes |
| Teste instavel (flaky) | Passa ou falha sem mudanca no codigo; deve ser corrigido, nao ignorado |
| p95 | 95% das requisicoes foram mais rapidas que esse valor |
| Threshold | Limite que faz o teste de carga falhar se for ultrapassado |
