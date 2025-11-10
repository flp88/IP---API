const form = document.querySelector('#ipForm');
const input = document.querySelector('#ipInput');
const tableBody = document.querySelector('#ipTableBody');
const API_URL = 'https://ipinfo.io/';

async function buscarIP(ip) {
  try {
    const resposta = await fetch(`${API_URL}${ip}/json`);
    if (!resposta.ok) throw new Error('Falha na requisição.');
    return await resposta.json();
  } catch (erro) {
    console.error(erro);
    alert('Erro ao consultar a API. Verifique o IP digitado.');
  }
}

function adicionarLinha(dados) {
  const linha = document.createElement('tr');

  const campos = [
    dados.ip || '—',
    dados.org || '—',
    dados.country || '—',
    dados.city || '—'
  ];

  campos.forEach(texto => {
    const celula = document.createElement('td');
    celula.textContent = texto;
    linha.appendChild(celula);
  });

  const removerCelula = document.createElement('td');
  const removerBtn = document.createElement('button');
  removerBtn.textContent = '🗑️';
  removerBtn.classList.add('remove-btn');
  removerBtn.addEventListener('click', () => linha.remove());
  removerCelula.appendChild(removerBtn);
  linha.appendChild(removerCelula);

  tableBody.appendChild(linha);
}

form.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const ip = input.value.trim();

  if (!ip) {
    alert('Por favor, digite um endereço IP!');
    return;
  }

  const dados = await buscarIP(ip);
  if (!dados || dados.error) {
    alert('IP inválido ou não encontrado.');
    return;
  }

  adicionarLinha(dados);
  form.reset();
  input.focus();
});
