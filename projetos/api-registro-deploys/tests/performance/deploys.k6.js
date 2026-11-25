import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE = __ENV.BASE_URL || 'http://localhost:3000';

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '10s', target: 10 },
    { duration: '5s', target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(95)<300'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  const criar = http.post(`${BASE}/deploys`, JSON.stringify({
    servico: 'carga', versao: '1.0.0', ambiente: 'dev'
  }), { headers: { 'Content-Type': 'application/json' } });
  check(criar, { 'POST retorna 201': (r) => r.status === 201 });

  const listar = http.get(`${BASE}/deploys?ambiente=dev`);
  check(listar, { 'GET retorna 200': (r) => r.status === 200 });

  sleep(0.5);
}
