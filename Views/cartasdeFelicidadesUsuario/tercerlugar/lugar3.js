const contenedor = document.getElementById("tercerLugarFrame");

let container = document.createElement('div');
container.className = 'felicitacion-container';

// Área del logo y botón de regresar
let logoArea = document.createElement('div');
logoArea.className = 'logo-area';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.alt = "Logo";
logo.className = "logo-felicitacion";

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

// Imagen de tercer lugar
let imgTercerLugar = document.createElement('img');
imgTercerLugar.src = "/services/imgcartasprimeroslugares/numero3.png";
imgTercerLugar.alt = "Tercer lugar";
imgTercerLugar.className = "img-premio";

// Mensaje de felicitación
let mensaje = document.createElement('div');
mensaje.className = 'mensaje-felicitacion';

let titulo = document.createElement('h1');
titulo.textContent = "¡Felicidades Usuario!";
titulo.className = "titulo-felicitacion";

let subtitulo = document.createElement('h2');
subtitulo.textContent = "Quedaste en el tercer lugar";
subtitulo.className = "subtitulo-felicitacion";

mensaje.appendChild(titulo);
mensaje.appendChild(subtitulo);

contentArea.appendChild(imgTercerLugar);
contentArea.appendChild(mensaje);

container.appendChild(logoArea);
container.appendChild(contentArea);
contenedor.appendChild(container);