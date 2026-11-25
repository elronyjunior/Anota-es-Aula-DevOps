const { test, before, after, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const { criarApp } = require('../../src/app');
const service = require('../../src/deployService');

let servidor;
let base;

before(async () => {
  servidor = criarApp();
  await new Promise((resolve) => servidor.listen(0, resolve));
  base = `http://127.0.0.1:${servidor.address().port}`;
});

after(() => new Promise((resolve) => servidor.close(resolve)));

beforeEach(() => service.limpar());

const enviar = (corpo) => fetch(`${base}/deploys`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(corpo)
});

test('GET /health responde ok', async () => {
  const res = await fetch(`${base}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: 'ok' });
});

test('POST /deploys cria registro e retorna 201', async () => {
  const res = await enviar({ servico: 'api', versao: '2.0.1', ambiente: 'homolog' });
  assert.equal(res.status, 201);
  const corpo = await res.json();
  assert.equal(corpo.servico, 'api');
});

test('POST /deploys com dados invalidos retorna 400 e detalhes', async () => {
  const res = await enviar({ servico: '', versao: 'x', ambiente: 'nada' });
  assert.equal(res.status, 400);
  const corpo = await res.json();
  assert.equal(corpo.detalhes.length, 3);
});

test('GET /deploys lista e filtra por ambiente', async () => {
  await enviar({ servico: 'a', versao: '1.0.0', ambiente: 'dev' });
  await enviar({ servico: 'b', versao: '1.0.0', ambiente: 'prod' });
  const res = await fetch(`${base}/deploys?ambiente=prod`);
  const lista = await res.json();
  assert.equal(lista.length, 1);
  assert.equal(lista[0].servico, 'b');
});

test('GET /deploys/:id retorna 404 para id inexistente', async () => {
  const res = await fetch(`${base}/deploys/42`);
  assert.equal(res.status, 404);
});

test('DELETE /deploys/:id remove e retorna 204', async () => {
  const criado = await (await enviar({ servico: 'a', versao: '1.0.0', ambiente: 'dev' })).json();
  const res = await fetch(`${base}/deploys/${criado.id}`, { method: 'DELETE' });
  assert.equal(res.status, 204);
  assert.equal((await fetch(`${base}/deploys/${criado.id}`)).status, 404);
});

test('rota desconhecida retorna 404', async () => {
  const res = await fetch(`${base}/qualquer`);
  assert.equal(res.status, 404);
});
