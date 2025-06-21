// forum.js

// Tus datos de ejemplo:
const posts = [
  {
    id: 1,
    title: 'Han visto el morty Guineo?',
    content: 'Estaba relajadito en Urabá y me encontré este care banano, no sé si alguien más lo habrá visto pero que hpta tiradero de caja',
    seen_count: 5,
    comments: [
      { user: 'Rick', text: 'Qué chimba!' },
      { user: 'Summer', text: '¡Yo también lo vi!' }
    ]
  },
  {
    id: 2,
    title: 'Morty Vampiro avistado',
    content: 'Un Morty Vampiro apareció en el cementerio de Itagüí, ¡cuidado con los colmillos!',
    seen_count: 3,
    comments: [
      { user: 'Beth', text: '¡Cuidado con esos colmillos!' }
    ]
  }
];

let currentPage = 1;
const itemsPerPage = 5;

function renderPosts(list = posts) {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const slice = list.slice(start, start + itemsPerPage);

  slice.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.innerHTML = `
      <h2>${post.title}</h2>
      <p>${post.content}</p>
      <div class="actions">
        <button class="seen-btn">Visto (<span>${post.seen_count}</span>)</button>
        <button class="comment-toggle">Comentarios (${post.comments.length})</button>
      </div>
      <div class="comments" style="display:none;">
        ${post.comments.map(c => `<div class="comment"><strong>${c.user}:</strong> ${c.text}</div>`).join('')}
        <div class="comment-form">
          <input type="text" class="comment-input" placeholder="Escribe un comentario...">
          <button class="add-comment-btn">Agregar</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  document.getElementById('forumPageInfo').textContent =
    `Página ${currentPage} / ${Math.ceil(posts.length / itemsPerPage)}`;

  attachForumEvents();
}

function attachForumEvents() {
  document.querySelectorAll('.seen-btn').forEach(btn => {
    btn.onclick = () => {
      const span = btn.querySelector('span');
      span.textContent = parseInt(span.textContent) + 1;
    };
  });
  document.querySelectorAll('.comment-toggle').forEach(btn => {
    btn.onclick = () => {
      const comments = btn.closest('.post-card').querySelector('.comments');
      comments.style.display = comments.style.display === 'none' ? 'block' : 'none';
    };
  });
  document.querySelectorAll('.add-comment-btn').forEach(btn => {
    btn.onclick = () => {
      const card = btn.closest('.post-card');
      const input = card.querySelector('.comment-input');
      if (!input.value.trim()) return;
      const div = document.createElement('div');
      div.className = 'comment';
      div.innerHTML = `<strong>Tú:</strong> ${input.value.trim()}`;
      card.querySelector('.comments').insertBefore(div, btn.parentElement);
      input.value = '';
    };
  });
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderPosts();
  }
}
function nextPage() {
  if (currentPage * itemsPerPage < posts.length) {
    currentPage++;
    renderPosts();
  }
}

function filterPosts() {
  const term = document.getElementById('forumSearch').value.toLowerCase();
  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(term) ||
    p.content.toLowerCase().includes(term)
  );
  currentPage = 1;
  renderPosts(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
});

