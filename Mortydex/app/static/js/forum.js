let posts = [];
let currentPage = 1;
const itemsPerPage = 5;

async function fetchPosts() {
  const res = await fetch('/api/posts');
  const data = await res.json();
  posts = data;
  renderPosts();
}

function renderPosts(list = posts) {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const slice = list.slice(start, start + itemsPerPage);

  slice.forEach(post => {
    const card = document.createElement('div');
    card.className = 'post-card';
    card.dataset.postId = post.id;  // Agregar ID del post como atributo
    
    card.innerHTML = `
      <h2>${post.title}</h2>
      <img src="${post.morty_img}" alt="Morty" class="morty-img" />
      <p class="morty-type">Tipo: ${post.morty_type}</p>
      <p>${post.content}</p>
      <div class="post-meta">
        <span>Publicado por ${post.author}</span>

      </div>
      <div class="actions">
        <button class="seen-btn">Visto (<span>${post.seen_count}</span>)</button>
        <button class="comment-toggle">Comentarios (${post.comments.length})</button>
      </div>
      <div class="comments" style="display:none;">
        ${post.comments.map(c => `
          <div class="comment">
            <strong>${c.user}:</strong> 
            ${c.text}
            <small>${new Date(c.created_at).toLocaleTimeString()}</small>
          </div>
        `).join('')}
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
  // Botón de "Visto"
  document.querySelectorAll('.seen-btn').forEach(btn => {
    btn.onclick = async () => {
      const postId = btn.closest('.post-card').dataset.postId;
      const span = btn.querySelector('span');
      
      try {
        const res = await fetch(`/api/posts/${postId}/seen`, {
          method: 'POST'
        });
        const data = await res.json();
        
        if (data.success) {
          span.textContent = data.new_count;
        }
      } catch (err) {
        console.error('Error al marcar como visto:', err);
      }
    };
  });
  document.querySelectorAll('.comment-toggle').forEach(btn => {
    btn.onclick = () => {
      const comments = btn.closest('.post-card').querySelector('.comments');
      comments.style.display = comments.style.display === 'none' ? 'block' : 'none';
    };
  });
   document.querySelectorAll('.add-comment-btn').forEach(btn => {
    btn.onclick = async () => {
      const card = btn.closest('.post-card');
      const postId = card.dataset.postId;
      const input = card.querySelector('.comment-input');
      const commentText = input.value.trim();
      
      if (!commentText) return;

      try {
        const res = await fetch(`/api/posts/${postId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            text: commentText
          })
        });
        
        const data = await res.json();
        
        if (data.success) {
          const commentDiv = document.createElement('div');
          commentDiv.className = 'comment';
          commentDiv.innerHTML = `
            <strong>${data.comment.user}:</strong> 
            ${data.comment.text}
            <small>${new Date(data.comment.created_at).toLocaleTimeString()}</small>
          `;
          card.querySelector('.comments').insertBefore(
            commentDiv, 
            card.querySelector('.comment-form')
          );
          input.value = '';
          
          // Actualizar contador
          const commentBtn = card.querySelector('.comment-toggle');
          const count = parseInt(commentBtn.textContent.match(/\((\d+)\)/)[1]);
          commentBtn.textContent = commentBtn.textContent.replace(
            /\(\d+\)/, 
            `(${count + 1})`
          );
        }
      } catch (err) {
        console.error('Error al agregar comentario:', err);
        alert('Error al agregar comentario');
      }
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
async function loadRecentActivity() {
  try {
    const res = await fetch('/api/activity');
    const activities = await res.json();
    
    const container = document.getElementById('recentActivity');
    container.innerHTML = '';
    
    activities.forEach(activity => {
      const li = document.createElement('li');
      li.className = 'activity-item';
      
      // Formatea la hora relativa (ej. "hace 5 minutos")
      const timeAgo = formatTimeAgo(new Date(activity.timestamp));
      
      li.innerHTML = `
        <span class="activity-user">${activity.user}</span>
        <span class="activity-action">${activity.action}</span>
        <span class="activity-time">${timeAgo}</span>
      `;
      
      container.appendChild(li);
    });
    
  } catch (err) {
    console.error('Error cargando actividad reciente:', err);
    // Muestra un mensaje de error elegante
    const container = document.getElementById('recentActivity');
    container.innerHTML = '<li>No se pudo cargar la actividad</li>';
  }
}

function formatTimeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  
  if (seconds < 60) return 'hace unos segundos';
  if (seconds < 3600) return `hace ${Math.floor(seconds / 60)} minutos`;
  if (seconds < 86400) return `hace ${Math.floor(seconds / 3600)} horas`;
  return `hace ${Math.floor(seconds / 86400)} días`;
}
//  Solo una vez, al cargar la página
// Llamar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  fetchPosts();
  loadRecentActivity();
});
