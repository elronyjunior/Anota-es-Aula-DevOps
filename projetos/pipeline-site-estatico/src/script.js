const ETAPAS = [
  'Checkout: o runner baixa o codigo do repositorio.',
  'Build: o projeto e preparado para distribuicao.',
  'Testes: verificacoes automaticas garantem que nada quebrou.',
  'Analise: qualidade e seguranca sao conferidas.',
  'Deploy: o artefato e publicado no ambiente de destino.',
  'Verificacao: o ambiente publicado e testado apos o deploy.'
];

const VERSAO = '1.0.0';

document.getElementById('lista-etapas').innerHTML = ETAPAS.map((e) => `<li>${e}</li>`).join('');
document.getElementById('versao').textContent = VERSAO;
