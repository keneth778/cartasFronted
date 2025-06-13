const contenedor = document.getElementById('seleccionFrame');

let seleccion = document.createElement('div');
seleccion.className = 'seleccion-container';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.className = "logo3";
seleccion.appendChild(logo);

let titulo = document.createElement('h2');
titulo.textContent = "¿Qué quieres ser?";
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

btnProfesor.addEventListener('click', () => {
  window.location.href = "../SeleJuego/seleJuego.html";
});
btnAlumno.addEventListener('click', () => {
  window.location.href = "../codePartida/codePartida.html";
});



btnSalir.addEventListener('click', () => {
  window.location.href = "../../index.html";
});

contenedor.appendChild(seleccion);

