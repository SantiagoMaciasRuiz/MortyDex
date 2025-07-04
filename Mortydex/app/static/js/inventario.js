// inventario.js
const inventory = [
  { id: 1, name: 'Morty Conejo', type: 'Papel', img: '/static/images/mortys/pm-015.jpg' },
  { id: 2, name: 'M/orty Gato', type: 'Tijera', img: '/static/images/mortys/pm-052.jpg' },
  { id: 3, name: 'Morty Ninja', type: 'Piedra', img: '/static/images/mortys/pm-085.jpg' }
];
const grid = document.getElementById('inventoryGrid');
function renderInventory() {
  grid.innerHTML = '';
  inventory.forEach(item => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Tipo: ${item.type}</p>
    `;
    grid.appendChild(card);
  });
}
document.getElementById('uploadBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('mortyImage');
  const nameInput = document.getElementById('mortyName');
  const typeInput = document.getElementById('mortyType');
  const file = fileInput.files[0];
  if (!file || !nameInput.value.trim() || !typeInput.value.trim()) {
    alert('Completa todos los campos e imagen.');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    inventory.push({ id: inventory.length + 1, name: nameInput.value.trim(), type: typeInput.value.trim(), img: e.target.result });
    renderInventory();
    fileInput.value = ''; nameInput.value = ''; typeInput.value = '';
  };
  reader.readAsDataURL(file);
});
document.addEventListener('DOMContentLoaded', renderInventory);