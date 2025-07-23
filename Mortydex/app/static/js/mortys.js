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
        <img src="/static/images/icons/logo.png" alt="Logo" class="hover-logo"/>
        <button class="add-inventory-btn" data-morty-id="${m.id}">Agregar al inventario</button>
        ${window.IS_ADMIN ? `
          <button class="delete-morty-btn" data-morty-id="${m.id}">Borrar</button>
          <button class="edit-morty-btn" data-morty-id="${m.id}">Editar</button>
        ` : ''}
      </div>
      <div class="card-text">
        <h3>#${m.id} ${m.name}</h3>
        <p>Tipo: ${m.type}</p>
        ${iconUrl ? `<img class="type-icon" src="${iconUrl}" alt="${m.type}">` : ''}
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.add-inventory-btn').forEach(btn => {
    btn.onclick = () => {
      const mortyId = btn.getAttribute('data-morty-id');
      agregarAlInventario(mortyId);
    };
  });

  // Manejar el botón de borrar solo si es admin
  if (window.IS_ADMIN) {
    grid.querySelectorAll('.delete-morty-btn').forEach(btn => {
      btn.onclick = () => {
        const mortyId = btn.getAttribute('data-morty-id');
        if (confirm('¿Seguro que quieres borrar este Morty?')) {
          fetch(`/api/mortys/${mortyId}/eliminar`, { method: 'DELETE' })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                alert('Morty eliminado');
                fetchMortys();
              } else {
                alert(data.message || 'No se pudo eliminar.');
              }
            });
        }
      };
    });
  }

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

function agregarAlInventario(mortyId) {
  fetch('/api/inventario/agregar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ morty_id: mortyId })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert('¡Morty agregado!');
      location.reload();
    } else {
      alert(data.message || 'No se pudo agregar.');
    }
  });
}

// Mostrar modal al hacer click en editar
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('edit-morty-btn')) {
    const mortyId = e.target.getAttribute('data-morty-id');
    const morty = mortys.find(m => m.id == mortyId);
    if (morty) {
      document.getElementById('editMortyId').value = morty.id;
      document.getElementById('editMortyName').value = morty.name;
      document.getElementById('editMortyType').value = morty.type;
      document.getElementById('editMortyImg').value = morty.img;
      document.getElementById('editMortyModal').style.display = 'flex';
    }
  }
});

function closeEditModal() {
  document.getElementById('editMortyModal').style.display = 'none';
}

// Enviar cambios al backend
document.getElementById('editMortyForm').onsubmit = function(e) {
  e.preventDefault();
  const mortyId = document.getElementById('editMortyId').value;
  const data = {
    name: document.getElementById('editMortyName').value,
    type: document.getElementById('editMortyType').value,
    img: document.getElementById('editMortyImg').value
  };
  fetch(`/api/mortys/${mortyId}/editar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(resp => {
    if (resp.success) {
      alert('Morty actualizado');
      closeEditModal();
      fetchMortys();
    } else {
      alert(resp.message || 'Error al actualizar');
    }
  });
};

document.addEventListener('DOMContentLoaded', fetchMortys);
