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

// Campo de email
let emailGroup = document.createElement('div');
emailGroup.className = "input-group";

let Email = document.createElement('label');
Email.textContent = "Correo Gmail:";
Email.className = "Email";
emailGroup.appendChild(Email);

let emailContainer = document.createElement('div');
emailContainer.className = "input-container";

let inputCorreo = document.createElement('input');
inputCorreo.type = "email";
inputCorreo.placeholder = "Correo electrónico";
emailContainer.appendChild(inputCorreo);

let usuarioIcon = document.createElement('img');
usuarioIcon.src = "/services/img/usuario.png";
usuarioIcon.className = "input-icon right-icon";
emailContainer.appendChild(usuarioIcon);

emailGroup.appendChild(emailContainer);
registro.appendChild(emailGroup);

let passGroup = document.createElement('div');
passGroup.className = "input-group";

let contra = document.createElement('label');
contra.textContent = "Contraseña:";
contra.className = "contra";
passGroup.appendChild(contra);

let passContainer = document.createElement('div');
passContainer.className = "input-container";

let inputPass = document.createElement('input');
inputPass.type = "password";
inputPass.placeholder = "Contraseña";
passContainer.appendChild(inputPass);

let candadoIcon = document.createElement('img');
candadoIcon.src = "/services/img/candado.png";
candadoIcon.className = "input-icon right-icon";
passContainer.appendChild(candadoIcon);

passGroup.appendChild(passContainer);
registro.appendChild(passGroup);

let botonRegistrar = document.createElement('button');
botonRegistrar.textContent = "Enviar";
botonRegistrar.className = "enviar"
registro.appendChild(botonRegistrar);

botonRegistrar.addEventListener('click', () => {
  window.location.href = "index.html";
});

contenedor.appendChild(registro);