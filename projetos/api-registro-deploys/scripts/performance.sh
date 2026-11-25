#!/usr/bin/env bash
# Sobe a API em segundo plano, executa o teste de carga com k6 e derruba a API no final.
set -euo pipefail

PORT="${PORT:-3000}" node src/server.js &
PID=$!
trap 'kill $PID' EXIT

for _ in $(seq 1 20); do
  curl -sf "http://localhost:${PORT:-3000}/health" > /dev/null && break
  sleep 0.5
done

BASE_URL="http://localhost:${PORT:-3000}" k6 run tests/performance/deploys.k6.js
