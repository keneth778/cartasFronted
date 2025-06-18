const contenedor = document.getElementById("segundoLugarFrame");

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

// Imagen de segundo lugar
let imgSegundoLugar = document.createElement('img');
imgSegundoLugar.src = "/services/imgcartasprimeroslugares/numero2.png";
imgSegundoLugar.alt = "Segundo lugar";
imgSegundoLugar.className = "img-premio";

// Mensaje de felicitación
let mensaje = document.createElement('div');
mensaje.className = 'mensaje-felicitacion';

let titulo = document.createElement('h1');
titulo.textContent = "¡Felicidades Usuario!";
titulo.className = "titulo-felicitacion";

let subtitulo = document.createElement('h2');
subtitulo.textContent = "Quedaste en el segundo lugar";
subtitulo.className = "subtitulo-felicitacion";

mensaje.appendChild(titulo);
mensaje.appendChild(subtitulo);

contentArea.appendChild(imgSegundoLugar);
contentArea.appendChild(mensaje);

container.appendChild(logoArea);
container.appendChild(contentArea);
contenedor.appendChild(container);