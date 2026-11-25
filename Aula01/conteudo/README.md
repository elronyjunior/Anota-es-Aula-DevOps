# Aula 01 - Introducao ao DevOps

Coloque nesta pasta o material oficial da aula (slides em PDF).

## Resumo tecnico

DevOps e a forma de trabalhar em que desenvolvimento (Dev) e operacao (Ops) dividem a responsabilidade pelo software do commit ate a producao. O objetivo e entregar mudancas pequenas, com frequencia e com baixo risco.

| Antes do DevOps | Com DevOps |
|---|---|
| Dev entrega o codigo e Ops "se vira" para colocar no ar | O mesmo time responde pelo codigo em producao |
| Deploy manual, raro e grande | Deploy automatizado, frequente e pequeno |
| Erro descoberto pelo usuario | Erro barrado pela pipeline ou pelo monitoramento |
| Ambiente configurado na mao | Ambiente descrito em codigo e versionado |

## Ciclo DevOps

```
Planejar -> Codificar -> Build -> Testar -> Liberar -> Implantar -> Operar -> Monitorar
    ^                                                                            |
    |____________________________________________________________________________|
```

O ciclo e continuo: o que o monitoramento mostra vira entrada para o proximo planejamento.

## Pilares (modelo CALMS)

| Pilar | Significado pratico |
|---|---|
| Cultura | Time compartilha responsabilidade, sem culpar pessoas por falhas |
| Automacao | Tudo que e repetitivo vira script ou pipeline |
| Lean | Lotes pequenos, menos espera entre etapas |
| Medicao | Decisoes baseadas em dados (tempo de deploy, taxa de falha) |
| Compartilhamento | Conhecimento documentado e acessivel |
