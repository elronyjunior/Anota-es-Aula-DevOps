const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const src = path.join(__dirname, '..', 'src');
const html = fs.readFileSync(path.join(src, 'index.html'), 'utf8');

test('arquivos obrigatorios existem', () => {
  for (const arquivo of ['index.html', 'style.css', 'script.js']) {
    assert.ok(fs.existsSync(path.join(src, arquivo)), `${arquivo} nao encontrado`);
  }
});

test('html declara idioma e viewport', () => {
  assert.match(html, /<html lang="pt-BR">/);
  assert.match(html, /name="viewport"/);
});

test('todos os arquivos referenciados no html existem', () => {
  const refs = [...html.matchAll(/(?:href|src)="([^"#:]+)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    assert.ok(fs.existsSync(path.join(src, ref)), `referencia quebrada: ${ref}`);
  }
});

test('elementos usados pelo script existem no html', () => {
  assert.match(html, /id="lista-etapas"/);
  assert.match(html, /id="versao"/);
});
