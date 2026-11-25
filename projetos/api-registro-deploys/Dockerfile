# Imagem enxuta: o projeto nao tem dependencias, so precisa do Node.
FROM node:22-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src

ENV PORT=3000
EXPOSE 3000

# Executa como usuario sem privilegios de root.
USER node

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:3000/health || exit 1

CMD ["node", "src/server.js"]
