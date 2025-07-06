const contenedor = document.getElementById('seleccionFrame');

// Obtener usuario de localStorage CORREGIDO
const userData = localStorage.getItem('user');
if (!userData) {
  window.location.href = "../../index.html"; // Redirigir si no hay sesión
}

const user = JSON.parse(userData);

let seleccion = document.createElement('div');
seleccion.className = 'seleccion-container';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.className = "logo3";
seleccion.appendChild(logo);

let titulo = document.createElement('h2');
titulo.textContent = `Hola ${user.nombre}, ¿qué quieres ser?`;
seleccion.appendChild(titulo);

let botonesContainer = document.createElement('div');
botonesContainer.className = 'botones-container';

let btnProfesor = document.createElement('button');
btnProfesor.textContent = "Profesor";
btnProfesor.className = "btn-rol";
botonesContainer.appendChild(btnProfesor);

let btnAlumno = document.createElement('button');
btnAlumno.textContent = "Alumno";
btnAlumno.className = "btn-rol";
botonesContainer.appendChild(btnAlumno);

seleccion.appendChild(botonesContainer);

let btnSalir = document.createElement('button');
btnSalir.textContent = "Salir";
btnSalir.className = "btn-salir";
seleccion.appendChild(btnSalir);

// Función para actualizar rol
const actualizarRol = async (nuevoRol) => {
  try {
    const response = await fetch('http://localhost:3000/api/actualizar-rol', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        userId: user.id,
        nuevoRol: nuevoRol
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Actualizar el usuario en localStorage
      user.rol = nuevoRol;
      localStorage.setItem('user', JSON.stringify(user));
      
      // Redirigir según el rol
      if (nuevoRol === 'profesor') {
        window.location.href = "../SeleJuego/seleJuego.html";
      } else {
        window.location.href = "../codePartida/codePartida.html";
      }
    } else {
      console.error('Error al actualizar rol:', data.error);
      alert('Error al actualizar rol. Intenta nuevamente.');
    }
  } catch (error) {
    console.error('Error de conexión:', error);
    alert('No se pudo conectar al servidor. Verifica tu conexión.');
  }
};

btnProfesor.addEventListener('click', () => actualizarRol('profesor'));
btnAlumno.addEventListener('click', () => actualizarRol('alumno'));

btnSalir.addEventListener('click', () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = "../../index.html";
});

contenedor.appendChild(seleccion);