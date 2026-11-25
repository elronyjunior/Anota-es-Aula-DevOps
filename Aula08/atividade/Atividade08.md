# Atividade 08 - Apresentacao de ferramenta DevOps: Docker

## Objetivo

Apresentar uma ferramenta do ecossistema DevOps: o que e, qual problema resolve, onde entra no ciclo e como integrar a um projeto real.

## O que e

Docker e uma plataforma para empacotar uma aplicacao junto com tudo que ela precisa para rodar (runtime, bibliotecas, configuracao) em uma unidade padrao chamada **container**. O container roda igual no notebook do desenvolvedor, no runner da pipeline e no servidor de producao.

## Problema que resolve

| Sem Docker | Com Docker |
|---|---|
| "Na minha maquina funciona" | A imagem e a mesma em todo lugar |
| Instalar runtime e dependencias em cada servidor | O servidor so precisa do Docker |
| Conflito de versoes entre aplicacoes no mesmo servidor | Cada container e isolado |
| Ambiente de teste diferente de producao | Mesma imagem em todos os ambientes |

## Conceitos

| Conceito | Definicao |
|---|---|
| Dockerfile | Receita em texto que descreve como montar a imagem |
| Imagem | Pacote imutavel gerado a partir do Dockerfile |
| Container | Instancia em execucao de uma imagem |
| Registry | Repositorio de imagens (Docker Hub, GitHub Container Registry) |
| Camada (layer) | Cada instrucao do Dockerfile gera uma camada reaproveitada em cache |
| Volume | Armazenamento que sobrevive a remocao do container |

## Container x maquina virtual

| Criterio | Container | Maquina virtual |
|---|---|---|
| Isolamento | Processo, compartilha o kernel do host | Sistema operacional completo |
| Tamanho | Dezenas de MB | Varios GB |
| Inicializacao | Segundos | Minutos |
| Uso tipico | Aplicacoes e microsservicos | Sistemas que exigem outro SO ou isolamento forte |

## Onde entra no ciclo DevOps

Docker fica entre o build e o deploy: a pipeline gera a imagem, testa, envia para um registry e o ambiente de destino apenas baixa e executa. Tambem e a base para orquestradores como Kubernetes.

## Exemplo aplicado

Foi criado um Dockerfile para a API da Aula 07: [projetos/api-registro-deploys/Dockerfile](../../projetos/api-registro-deploys/Dockerfile).

```bash
cd projetos/api-registro-deploys
docker build -t api-registro-deploys:1.0.0 .
docker run -d -p 3000:3000 --name api api-registro-deploys:1.0.0
curl http://localhost:3000/health
```

Boas praticas aplicadas no Dockerfile:

| Pratica | Como foi aplicada |
|---|---|
| Imagem base pequena | `node:22-alpine` |
| Copiar so o necessario | `.dockerignore` exclui testes, scripts e documentacao |
| Nao rodar como root | `USER node` |
| Verificacao de saude | `HEALTHCHECK` chamando `/health` |
| Versao explicita | Tag `1.0.0` na imagem, nunca so `latest` |

## Integracao com CI/CD

Exemplo de job que gera e publica a imagem no GitHub Container Registry:

```yaml
  imagem:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v7
      - uses: docker/login-action@v4
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v7
        with:
          context: .
          push: true
          tags: ghcr.io/${{ github.repository }}:${{ github.sha }}
```

## Avaliacao da ferramenta

| Criterio | Avaliacao |
|---|---|
| Facilidade de uso | Alta para o basico; redes e volumes exigem mais estudo |
| Integracao | Suportado por todas as ferramentas de CI e nuvens |
| Automacao | Build e publicacao totalmente automatizaveis |
| Custo | Docker Engine e gratuito; Docker Desktop tem licenca paga para empresas grandes |
| Limitacoes | Nao gerencia varios servidores sozinho; para isso existe orquestracao |

## Referencias

- [Documentacao oficial do Docker](https://docs.docker.com/)
- [Boas praticas para Dockerfile](https://docs.docker.com/build/building/best-practices/)
