document.addEventListener('DOMContentLoaded', () => {
  // Botones “Visto”
  document.querySelectorAll('.seen-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const span = btn.querySelector('.seen-count');
      let count = parseInt(span.textContent, 10);
      span.textContent = ++count;
      // Aquí podrías enviar un fetch a tu backend para guardar el voto
    });
  });

  // Toggle comentarios
  document.querySelectorAll('.comment-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const comments = btn.closest('.post-card').querySelector('.comments');
      comments.style.display = comments.style.display === 'none' ? 'block' : 'none';
    });
  });

  // Añadir comentario (front-end)
  document.querySelectorAll('.add-comment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.post-card');
      const input = card.querySelector('.comment-input');
      const text = input.value.trim();
      if (!text) return;
      const div = document.createElement('div');
      div.className = 'comment';
      div.innerHTML = `<strong>Tú:</strong> ${text}`;
      card.querySelector('.comments').insertBefore(div, card.querySelector('.comment-form'));
      input.value = '';
      // Aquí podrías enviar un fetch a tu backend para guardar el comentario
    });
  });
});