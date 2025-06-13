const contenedor = document.getElementById('registroFrame');

let registro = document.createElement('div');
registro.className = 'registro-container';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.className = "logo2";
registro.appendChild(logo);

let titulo = document.createElement('h2');
titulo.textContent = "Registrarse";
registro.appendChild(titulo);

let Email = document.createElement('label');
Email.textContent = "Correo Gmail:";
Email.className = "Email";
registro.appendChild(Email);

let inputCorreo = document.createElement('input');
inputCorreo.type = "email";
inputCorreo.placeholder = "Correo electrónico";
registro.appendChild(inputCorreo);

let contra = document.createElement('label');
contra.textContent = "Contraseña:";
contra.className = "contra";
registro.appendChild(contra);


let inputPass = document.createElement('input');
inputPass.type = "password";
inputPass.placeholder = "Contraseña";
registro.appendChild(inputPass);

let botonRegistrar = document.createElement('button');
botonRegistrar.textContent = "Enviar";
botonRegistrar.className = "enviar"
registro.appendChild(botonRegistrar);

botonRegistrar.addEventListener('click', () => {
  window.location.href = "index.html"; // Regresa al login
});

contenedor.appendChild(registro);
