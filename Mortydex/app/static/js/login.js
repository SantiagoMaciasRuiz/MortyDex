await fetch('/crear_sesion', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: data.username }),
  credentials: 'include'  // NECESARIO para que se guarde la cookie de sesión
});
