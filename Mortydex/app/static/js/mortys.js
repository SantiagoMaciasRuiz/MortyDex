
// mortys.js - Lógica con iconos de tipo y texto desplazado

// mortys.js - Lógica con iconos de tipo y texto desplazado

const mortys = [
  { id: 1, name: 'Morty', type: 'Piedra', img: '/static/images/mortys/pm-001.jpg' },
  { id: 2, name: 'Test X72', type: 'Papel', img: '/static/images/mortys/pm-008.jpg' },
  { id: 3, name: 'Morty Conejo', type: 'Papel', img: '/static/images/mortys/pm-015.jpg' },
  { id: 4, name: 'Morty Fusionado', type: 'Tijera', img: '/static/images/mortys/pm-047.jpg' },
  { id: 5, name: 'Morty Gato', type: 'Tijera', img: '/static/images/mortys/pm-052.jpg' },
  { id: 6, name: 'Morty Herido', type: 'Papel', img: '/static/images/mortys/pm-054.jpg' },
  { id: 7, name: 'Morty Vampiro', type: 'Piedra', img: '/static/images/mortys/pm-058.jpg' },
  { id: 8, name: 'Morty Rey', type: 'Tijera', img: '/static/images/mortys/pm-059.jpg' },
  { id: 9, name: 'Morty Ninja', type: 'Papel', img: '/static/images/mortys/pm-085.jpg' },
  { id: 10, name: 'Morty Afro', type: 'Piedra', img: '/static/images/mortys/pm-087.png' }
];

let currentPage = 1;
const itemsPerPage = 9;

// Mapa de iconos según tipo (coloca tus rutas reales aquí)
const iconMap = {
  'Piedra': '/static/images/icons/rock.png',
  'Papel': '/static/images/icons/paper.png',
  'Tijera': '/static/images/icons/scissors.png'
};

function displayMortys(list = mortys) {
  const grid = document.getElementById('mortyGrid');
  grid.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const slice = list.slice(start, end);

  slice.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';

    // Escoge el icono según el tipo
    const iconUrl = iconMap[m.type] || '';

    card.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <div class="card-text">
        <h3>#${m.id} ${m.name}</h3>
        <p>
          Tipo: ${m.type}
          ${iconUrl ? `<img class="type-icon" src="${iconUrl}" alt="${m.type}">` : ''}
        </p>
      </div>
    `;

    grid.appendChild(card);
  });

  // Actualiza información de la página o resultados
  const info = document.getElementById('pageInfo');
  info.textContent = list === mortys
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

  // Reinicia a primera página cuando filtres
  currentPage = 1;
  displayMortys(filtered);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => displayMortys());