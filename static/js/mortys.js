// mortys.js - Lógica con iconos de tipo y texto desplazado

const mortys = [
  { id: 1, name: 'Morty Cascado', type: 'Piedra', img: '/static/images/mortys/pm-001.jpg' },
  { id: 2, name: 'Morty Conejo', type: 'Papel', img: '/static/images/mortys/pm-008.jpg' },
  { id: 3, name: 'Morty Mutado', type: 'Papel', img: '/static/images/mortys/pm-015.jpg' },
  { id: 4, name: 'Morty Fusionado', type: 'Tijera', img: '/static/images/mortys/pm-047.jpg' },
  { id: 5, name: 'Morty Gatero', type: 'Tijera', img: '/static/images/mortys/pm-052.jpg' },
  { id: 6, name: 'Morty Gymbro', type: 'Papel', img: '/static/images/mortys/pm-054.jpg' },
  { id: 7, name: 'Morty Venezolano', type: 'Piedra', img: '/static/images/mortys/pm-058.jpg' },
  { id: 8, name: 'Morty Mago', type: 'Tijera', img: '/static/images/mortys/pm-059.jpg' },
  { id: 9, name: 'Morty Mullet', type: 'Papel', img: '/static/images/mortys/pm-085.jpg' },
  { id: 10, name: 'Morty Afro', type: 'Piedra', img: '/static/images/mortys/pm-087.png' },
  { id: 11, name: 'Morty CareNalga', type: 'Papel', img: '/static/images/mortys/pm-283.png' },
  { id: 12, name: 'Morty Punketo', type: 'Tijera', img: '/static/images/mortys/pm-100.png' },
  { id: 13, name: 'Morty Ingeniero de Sistemas', type: 'Papel', img: '/static/images/mortys/pm-240.png' },
  { id: 14, name: 'Morty TaxiDriver', type: 'Tijera', img: '/static/images/mortys/pm-172.png' },
  { id: 15, name: 'Morty Vampiro', type: 'Papel', img: '/static/images/mortys/pm-153.png' }

];

let currentPage = 1;
const itemsPerPage = 9;

// Rutas de iconos por tipo
const iconMap = {
  'Piedra': '/static/images/icons/rock.png',
  'Papel':  '/static/images/icons/paper.png',
  'Tijera': '/static/images/icons/scissors.png'
};

function displayMortys(list = mortys) {
  const grid = document.getElementById('mortyGrid');
  grid.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end   = start + itemsPerPage;
  const slice = list.slice(start, end);

  slice.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';

    const iconUrl = iconMap[m.type] || '';

    card.innerHTML = `
      <div class="img-container">
        <img src="${m.img}" alt="${m.name}">
      </div>
      <div class="card-text">
        <h3>#${m.id} ${m.name}</h3>
        <p>Tipo: ${m.type}</p>
        ${iconUrl ? `<img class="type-icon" src="${iconUrl}" alt="${m.type}">` : ''}
      </div>
    `;
    grid.appendChild(card);
  });

  const info = document.getElementById('pageInfo');
  info.textContent = (list === mortys)
    ? `Página ${currentPage}`
    : `Resultados: ${list.length}`;
}

function nextPage() {
  if (currentPage * itemsPerPage < mortys.length) {
    currentPage++;
    displayMortys();
  }
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayMortys();
  }
}

function filterMortys() {
  const term = document.getElementById('searchInput').value.toLowerCase();
  const filtered = mortys.filter(m =>
    m.name.toLowerCase().includes(term) ||
    m.type.toLowerCase().includes(term)
  );
  currentPage = 1;
  displayMortys(filtered);
}

document.addEventListener('DOMContentLoaded', () => displayMortys());