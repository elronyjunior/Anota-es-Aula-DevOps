const { test, beforeEach } = require('node:test');
const assert = require('node:assert/strict');
const service = require('../../src/deployService');

const valido = { servico: 'checkout', versao: '1.2.0', ambiente: 'prod' };

beforeEach(() => service.limpar());

test('cria deploy valido com status padrao sucesso', () => {
  const deploy = service.criar(valido);
  assert.equal(deploy.id, 1);
  assert.equal(deploy.status, 'sucesso');
  assert.ok(deploy.criadoEm);
});

test('rejeita versao fora do padrao semantico', () => {
  assert.throws(() => service.criar({ ...valido, versao: 'v1' }), /dados invalidos/);
});

test('rejeita ambiente desconhecido', () => {
  const erros = service.validar({ ...valido, ambiente: 'teste' });
  assert.equal(erros.length, 1);
});

test('rejeita servico vazio', () => {
  const erros = service.validar({ ...valido, servico: '  ' });
  assert.deepEqual(erros, ['servico e obrigatorio']);
});

test('filtra deploys por ambiente', () => {
  service.criar(valido);
  service.criar({ ...valido, ambiente: 'dev' });
  assert.equal(service.listar({ ambiente: 'dev' }).length, 1);
  assert.equal(service.listar().length, 2);
});

test('busca deploy por id', () => {
  const criado = service.criar(valido);
  assert.deepEqual(service.buscar(criado.id), criado);
  assert.equal(service.buscar(99), null);
});

test('remove deploy existente e informa quando nao existe', () => {
  const criado = service.criar(valido);
  assert.equal(service.remover(criado.id), true);
  assert.equal(service.remover(criado.id), false);
});
