
const mortys = [
  { id: 1, name: 'Morty', type: 'Normal', img: 'https://i.imgur.com/dC3yO0E.png' },
  { id: 2, name: 'Test X72', type: 'Mutante', img: 'https://i.imgur.com/gJ8ZxC9.png' },
  { id: 3, name: 'Morty Conejo', type: 'Animal', img: 'https://i.imgur.com/Uw5uOEc.png' },
  { id: 4, name: 'Morty Fusionado', type: 'Normal', img: 'https://i.imgur.com/QiY29mu.png' },
  { id: 5, name: 'Morty Gato', type: 'Animal', img: 'https://i.imgur.com/m1tcZPK.png' },
  { id: 6, name: 'Morty Herido', type: 'Luchador', img: 'https://i.imgur.com/MsQ6UML.png' },
  { id: 7, name: 'Morty Vampiro', type: 'Oscuro', img: 'https://i.imgur.com/KfVRd4V.png' },
  { id: 8, name: 'Morty Rey', type: 'Real', img: 'https://i.imgur.com/Vyx35I0.png' },
  { id: 9, name: 'Morty Ninja', type: 'Luchador', img: 'https://i.imgur.com/XQoEMmk.png' },
  { id: 10, name: 'Morty Cactus', type: 'Planta', img: 'https://i.imgur.com/xLK7HHO.png' }
];

let currentPage = 1;
const itemsPerPage = 9;

function displayMortys() {
  const grid = document.getElementById('mortyGrid');
  grid.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const mortysToShow = mortys.slice(start, end);

  mortysToShow.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <h3>#${m.id} ${m.name}</h3>
      <p>Tipo: ${m.type}</p>
    `;
    grid.appendChild(card);
  });

  document.getElementById('pageInfo').textContent = `Página ${currentPage}`;
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
  const filtered = mortys.filter(m => m.name.toLowerCase().includes(term) || m.type.toLowerCase().includes(term));
  const grid = document.getElementById('mortyGrid');
  grid.innerHTML = '';

  filtered.forEach(m => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${m.img}" alt="${m.name}">
      <h3>#${m.id} ${m.name}</h3>
      <p>Tipo: ${m.type}</p>
    `;
    grid.appendChild(card);
  });

  document.getElementById('pageInfo').textContent = `Resultados: ${filtered.length}`;
}

document.addEventListener('DOMContentLoaded', displayMortys);
