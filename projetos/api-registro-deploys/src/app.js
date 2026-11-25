const http = require('node:http');
const service = require('./deployService');

function responder(res, status, corpo) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(corpo === undefined ? '' : JSON.stringify(corpo));
}

function lerCorpo(req) {
  return new Promise((resolve, reject) => {
    let dados = '';
    req.on('data', (parte) => { dados += parte; });
    req.on('end', () => {
      if (!dados) return resolve({});
      try { resolve(JSON.parse(dados)); } catch { reject(new Error('json invalido')); }
    });
    req.on('error', reject);
  });
}

function criarApp() {
  return http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const partes = url.pathname.split('/').filter(Boolean);

    if (url.pathname === '/health' && req.method === 'GET') {
      return responder(res, 200, { status: 'ok' });
    }

    if (partes[0] !== 'deploys' || partes.length > 2) {
      return responder(res, 404, { erro: 'rota nao encontrada' });
    }

    const id = partes[1];

    if (!id && req.method === 'GET') {
      return responder(res, 200, service.listar({ ambiente: url.searchParams.get('ambiente') }));
    }

    if (!id && req.method === 'POST') {
      try {
        const corpo = await lerCorpo(req);
        return responder(res, 201, service.criar(corpo));
      } catch (erro) {
        return responder(res, 400, { erro: erro.message, detalhes: erro.detalhes || [] });
      }
    }

    if (id && req.method === 'GET') {
      const deploy = service.buscar(id);
      return deploy ? responder(res, 200, deploy) : responder(res, 404, { erro: 'deploy nao encontrado' });
    }

    if (id && req.method === 'DELETE') {
      return service.remover(id) ? responder(res, 204) : responder(res, 404, { erro: 'deploy nao encontrado' });
    }

    return responder(res, 405, { erro: 'metodo nao permitido' });
  });
}

module.exports = { criarApp };
