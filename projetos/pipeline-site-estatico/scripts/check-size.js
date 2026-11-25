// Falha a pipeline se o site publicado passar do limite definido.
const fs = require('node:fs');
const path = require('node:path');

const LIMITE_KB = 500;
const dist = path.join(__dirname, '..', 'dist');

const tamanho = fs.readdirSync(dist, { recursive: true })
  .map((f) => path.join(dist, f))
  .filter((f) => fs.statSync(f).isFile())
  .reduce((total, f) => total + fs.statSync(f).size, 0);

const kb = (tamanho / 1024).toFixed(1);
console.log(`Tamanho de dist/: ${kb} KB (limite ${LIMITE_KB} KB)`);
if (tamanho > LIMITE_KB * 1024) process.exit(1);
