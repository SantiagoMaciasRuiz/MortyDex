<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.remove-inventory-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const mortyId = this.getAttribute('data-morty-id');
      fetch('/api/inventario/eliminar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ morty_id: mortyId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          location.reload();
        } else {
          alert(data.message || 'No se pudo eliminar.');
        }
      });
    });
  });
});

=======
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
>>>>>>> b22191b62505c3ddb8b7b3fe64e3cd8768505825
document.getElementById('uploadBtn').addEventListener('click', () => {
  const fileInput = document.getElementById('mortyImage');
  const nameInput = document.getElementById('mortyName');
  const typeInput = document.getElementById('mortyType');

  const file = fileInput.files[0];
  const name = nameInput.value.trim();
  const type = typeInput.value.trim();

  if (!file || !name || !type) {
    alert('Completa todos los campos e imagen.');
    return;
  }
<<<<<<< HEAD

  const formData = new FormData();
  formData.append('image', file);
  formData.append('name', name);
  formData.append('type', type);

  fetch('/api/inventario/agregar', {
    method: 'POST',
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('Morty subido y agregado al inventario!');
      location.reload();  // Recargar la página para ver el nuevo Morty
    } else {
      alert('Error: ' + data.message);
    }
  })
  .catch(err => {
    console.error(err);
    alert('Ocurrió un error al subir el Morty.');
  });
});
=======
  const reader = new FileReader();
  reader.onload = e => {
    inventory.push({ id: inventory.length + 1, name: nameInput.value.trim(), type: typeInput.value.trim(), img: e.target.result });
    renderInventory();
    fileInput.value = ''; nameInput.value = ''; typeInput.value = '';
  };
  reader.readAsDataURL(file);
});
document.addEventListener('DOMContentLoaded', renderInventory);
>>>>>>> b22191b62505c3ddb8b7b3fe64e3cd8768505825
