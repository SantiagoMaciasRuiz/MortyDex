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
