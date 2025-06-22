// login.js – demo client‐side login
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const user = document.getElementById('username').value.trim();
    const pass = document.getElementById('password').value.trim();
    if (!user || !pass) {
      alert('Por favor ingresa tu usuario y contraseña.');
      return;
    }
    // Demo: redirecciona a la home
    window.location.href = '/';
  });
});