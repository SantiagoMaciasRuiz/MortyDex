let mortys = [];
let currentPage = 1;
const itemsPerPage = 9;

const iconMap = {
  'Piedra': '/static/images/icons/rock.png',
  'Papel':  '/static/images/icons/paper.png',
  'Tijera': '/static/images/icons/scissors.png'
};

async function fetchMortys() {
  try {
    const response = await fetch('/api/mortys');
    mortys = await response.json();
    displayMortys();
  } catch (err) {
    console.error('Error cargando mortys:', err);
  }
}

function displayMortys(list = mortys) {
  const grid = document.getElementById('mortyGrid');
  grid.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = list.slice(start, end);

  pageItems.forEach(m => {
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
  info.textContent = `Página ${currentPage}`;
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

document.addEventListener('DOMContentLoaded', fetchMortys);
