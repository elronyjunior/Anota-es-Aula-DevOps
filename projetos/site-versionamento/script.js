const versoes = [
  { tag: 'v0.1.0', descricao: 'Estrutura inicial com HTML' },
  { tag: 'v0.2.0', descricao: 'Estilo com CSS' },
  { tag: 'v0.3.0', descricao: 'Tabela gerada com JavaScript' },
  { tag: 'v1.0.0', descricao: 'Publicacao na Vercel' }
];

let somenteUltima = false;

function renderizar() {
  const lista = somenteUltima ? versoes.slice(-1) : versoes;
  document.getElementById('versoes').innerHTML = lista
    .map((v) => `<tr><td>${v.tag}</td><td>${v.descricao}</td></tr>`)
    .join('');
}

document.getElementById('alternar').addEventListener('click', (e) => {
  somenteUltima = !somenteUltima;
  e.target.textContent = somenteUltima ? 'Mostrar todas as versoes' : 'Mostrar apenas a ultima versao';
  renderizar();
});

renderizar();
