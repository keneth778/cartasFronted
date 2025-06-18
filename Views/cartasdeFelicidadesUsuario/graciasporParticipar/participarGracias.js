const contenedor = document.getElementById("graciasFrame");

let container = document.createElement('div');
container.className = 'gracias-container';

// Área del logo y botón de regresar
let logoArea = document.createElement('div');
logoArea.className = 'logo-area';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.alt = "Logo";
logo.className = "logo-gracias";

let regresarBtn = document.createElement('button');
regresarBtn.textContent = "Regresar";
regresarBtn.className = "regresar-btn";
regresarBtn.addEventListener('click', () => {
  window.location.href = "../../SeleJuego/seleJuego.html";
});

logoArea.appendChild(logo);
logoArea.appendChild(regresarBtn);

// Contenido principal
let contentArea = document.createElement('div');
contentArea.className = 'content-area';

// Imagen de fondo
let imgFondo = document.createElement('img');
imgFondo.src = "/services/imgcartasprimeroslugares/fondo.png";
imgFondo.alt = "Gracias por participar";
imgFondo.className = "img-fondo";

// Mensaje
let mensaje = document.createElement('h1');
mensaje.textContent = "¡Gracias por participar!";
mensaje.className = "mensaje-gracias";

contentArea.appendChild(imgFondo);
contentArea.appendChild(mensaje);

container.appendChild(logoArea);
container.appendChild(contentArea);
contenedor.appendChild(container);