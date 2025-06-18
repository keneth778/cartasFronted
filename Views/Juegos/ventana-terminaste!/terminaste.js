// Asegúrate de exportar la función correctamente
export function crearVistaTerminaste() {
  const contenedor = document.getElementById("terminasteFrame");
  contenedor.innerHTML = ''; // Limpiar contenedor

  let container = document.createElement('div');
  container.className = 'terminaste-container';

  // Área del logo y botón de regresar
  let logoArea = document.createElement('div');
  logoArea.className = 'logo-area';

  let logo = document.createElement('img');
  logo.src = "/services/img/logo.png";
  logo.alt = "Logo";
  logo.className = "logo-terminaste";

  let regresarBtn = document.createElement('button');
  regresarBtn.textContent = "Regresar";
  regresarBtn.className = "regresar-btn";
  regresarBtn.addEventListener('click', () => {
    window.location.href = "../SeleJuego/seleJuego.html";
  });

  logoArea.appendChild(logo);
  logoArea.appendChild(regresarBtn);

  // Área de contenido principal
  let contentArea = document.createElement('div');
  contentArea.className = 'content-area';

  // Título
  let titulo = document.createElement('h1');
  titulo.textContent = "¡Terminaste!";
  titulo.className = "titulo-terminaste";

  // Resultado del usuario
  let resultadoUsuario = document.createElement('div');
  resultadoUsuario.className = 'resultado-usuario';

  // Avatar del usuario
  const avatares = [
    "koalapt.png", "lobopt.png", "pandapt.png",
    "pinguinopt.png", "ranapt.png", "zorropt.png"
  ];
  const avatarAleatorio = avatares[Math.floor(Math.random() * avatares.length)];

  let avatarImg = document.createElement('img');
  avatarImg.src = `/services/img-terminaste/${avatarAleatorio}`;
  avatarImg.alt = "Avatar usuario";
  avatarImg.className = "avatar-usuario";

  let usuarioInfo = document.createElement('div');
  usuarioInfo.className = "usuario-info";

  let nombreUsuario = document.createElement('span');
  nombreUsuario.textContent = "Usuario";
  nombreUsuario.className = "nombre-usuario";

  let puntajeUsuario = document.createElement('span');
  puntajeUsuario.textContent = "60pts";
  puntajeUsuario.className = "puntaje-usuario";

  usuarioInfo.appendChild(nombreUsuario);
  usuarioInfo.appendChild(puntajeUsuario);

  resultadoUsuario.appendChild(avatarImg);
  resultadoUsuario.appendChild(usuarioInfo);

  // Separador
  let separador = document.createElement('div');
  separador.className = "separador";

  // Botón siguiente nivel
  let siguienteBtn = document.createElement('button');
  siguienteBtn.textContent = "Siguiente nivel";
  siguienteBtn.className = "btn-siguiente";
  siguienteBtn.addEventListener('click', () => {
    window.location.href = "../Nivel/nivel.html";
  });

  // Construcción de la estructura
  contentArea.appendChild(titulo);
  contentArea.appendChild(resultadoUsuario);
  contentArea.appendChild(separador);
  contentArea.appendChild(siguienteBtn);

  container.appendChild(logoArea);
  container.appendChild(contentArea);
  contenedor.appendChild(container);

  return contenedor; // Retornamos el contenedor modificado
}

// Opcional: Auto-ejecución si se carga directamente
if (document.getElementById('terminasteFrame')) {
  document.getElementById('terminasteFrame').appendChild(crearVistaTerminaste());
}