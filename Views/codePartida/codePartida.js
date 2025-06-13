const contenedor = document.getElementById('codePartidaFrame');

let section = document.createElement('div');
section.className = 'codePartida-container';

// Logo + Título
let logoTitulo = document.createElement('div');
logoTitulo.className = 'logo-titulo';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.alt = "Logo";

let titulo = document.createElement('h2');
titulo.textContent = "UP THE CARDS";

logoTitulo.appendChild(logo);
logoTitulo.appendChild(titulo);
section.appendChild(logoTitulo);

// Input nombre usuario
let inputNombre = document.createElement('input');
inputNombre.type = "text";
inputNombre.placeholder = "Nombre de usuario";
inputNombre.className = "iusuario";
section.appendChild(inputNombre);

// Título de avatar
let avatarSection = document.createElement('div');
avatarSection.className = "avatar-section";

let avatarTitle = document.createElement('h3');
avatarTitle.textContent = "Elige un avatar";
avatarSection.appendChild(avatarTitle);

// Avatares
let avatarContainer = document.createElement('div');
avatarContainer.className = "avatar-options";

const avatares = ["zorro.png", "mapache.png", "ran.png", "panda.png", "koala.png", "pinguino.png"];

avatares.forEach((nombre, index) => {
  let avatar = document.createElement('img');
  avatar.src = `/services/img/${nombre}`;
  avatar.alt = `Avatar ${index + 1}`;
  avatar.addEventListener('click', () => {
    document.querySelectorAll('.avatar-options img').forEach(img => img.classList.remove('selected'));
    avatar.classList.add('selected');
  });
  avatarContainer.appendChild(avatar);
});

avatarSection.appendChild(avatarContainer);
section.appendChild(avatarSection);

// Input código de partida
let inputCodigo = document.createElement('input');
inputCodigo.type = "text";
inputCodigo.className = "icodigo";
inputCodigo.placeholder = "Código de partida";
section.appendChild(inputCodigo);

// Botón ingresar
let btnIngresar = document.createElement('button');
btnIngresar.textContent = "Ingresar";
btnIngresar.className = "btn_ingresar";
btnIngresar.addEventListener('click', () => {
  window.location.href = "../seleccionRol/seleccionRol.html"; // puedes redirigir a otra vista luego
});

section.appendChild(btnIngresar);

contenedor.appendChild(section);
