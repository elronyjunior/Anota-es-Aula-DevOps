// Copia os arquivos de src/ para dist/, que e a pasta publicada.
const fs = require('node:fs');
const path = require('node:path');

const origem = path.join(__dirname, '..', 'src');
const destino = path.join(__dirname, '..', 'dist');

fs.rmSync(destino, { recursive: true, force: true });
fs.cpSync(origem, destino, { recursive: true });
console.log(`Build concluido: ${fs.readdirSync(destino).length} arquivos em dist/`);
