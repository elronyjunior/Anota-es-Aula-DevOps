const AMBIENTES = ['dev', 'homolog', 'prod'];
const STATUS = ['sucesso', 'falha', 'rollback'];

let deploys = [];
let proximoId = 1;

function validar(dados) {
  const erros = [];
  if (!dados || typeof dados !== 'object') return ['corpo da requisicao invalido'];
  if (typeof dados.servico !== 'string' || dados.servico.trim() === '') erros.push('servico e obrigatorio');
  if (typeof dados.versao !== 'string' || !/^\d+\.\d+\.\d+$/.test(dados.versao)) erros.push('versao deve seguir o formato X.Y.Z');
  if (!AMBIENTES.includes(dados.ambiente)) erros.push(`ambiente deve ser um de: ${AMBIENTES.join(', ')}`);
  if (dados.status !== undefined && !STATUS.includes(dados.status)) erros.push(`status deve ser um de: ${STATUS.join(', ')}`);
  return erros;
}

function listar(filtro = {}) {
  return deploys.filter((d) => !filtro.ambiente || d.ambiente === filtro.ambiente);
}

function buscar(id) {
  return deploys.find((d) => d.id === Number(id)) || null;
}

function criar(dados) {
  const erros = validar(dados);
  if (erros.length) {
    const erro = new Error('dados invalidos');
    erro.detalhes = erros;
    throw erro;
  }
  const deploy = {
    id: proximoId++,
    servico: dados.servico.trim(),
    versao: dados.versao,
    ambiente: dados.ambiente,
    status: dados.status || 'sucesso',
    criadoEm: new Date().toISOString()
  };
  deploys.push(deploy);
  return deploy;
}

function remover(id) {
  const tamanho = deploys.length;
  deploys = deploys.filter((d) => d.id !== Number(id));
  return deploys.length < tamanho;
}

function limpar() {
  deploys = [];
  proximoId = 1;
}

module.exports = { AMBIENTES, STATUS, validar, listar, buscar, criar, remover, limpar };
