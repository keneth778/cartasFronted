const contenedor = document.getElementById("graciasFrame");

function crearVistaGracias() {
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

  // Obtener nombre del usuario actual
  const alumnoActual = JSON.parse(localStorage.getItem('alumnoActual') || '{}');
  const nombreUsuario = alumnoActual.nombre || 'Participante';

  // Mensaje personalizado
  let mensaje = document.createElement('h1');
  mensaje.textContent = `¡Gracias por participar, ${nombreUsuario}!`;
  mensaje.className = "mensaje-gracias";

  // Avatar del usuario
  let avatarUsuario = document.createElement('img');
  avatarUsuario.src = `/services/img/${alumnoActual.avatar || 'default.png'}`;
  avatarUsuario.alt = "Tu avatar";
  avatarUsuario.className = "avatar-gracias";
  avatarUsuario.onerror = function() {
    this.src = '/services/img/default.png';
  };

  // Mensaje adicional
  let mensajeAdicional = document.createElement('p');
  mensajeAdicional.textContent = "Tu participación ha sido registrada. ¡Sigue practicando para mejorar tu puntuación!";
  mensajeAdicional.className = "mensaje-adicional";

  contentArea.appendChild(imgFondo);
  contentArea.appendChild(mensaje);
  contentArea.appendChild(avatarUsuario);
  contentArea.appendChild(mensajeAdicional);

  container.appendChild(logoArea);
  container.appendChild(contentArea);
  contenedor.appendChild(container);
}

// Lógica para determinar qué vista mostrar
function determinarVistaFinal() {
  const partidaActual = JSON.parse(localStorage.getItem('partidaActual') || '{}');
  const alumnoActual = JSON.parse(localStorage.getItem('alumnoActual') || '{}');
  
  if (!partidaActual.id) {
    // No hay partida, redirigir
    window.location.href = "../../SeleJuego/seleJuego.html";
    return;
  }
  
  // Verificar si el usuario está en el top 3
  fetch(`http://localhost:3000/api/partida/${partidaActual.id}/ranking`)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const usuarioEnTop3 = data.ranking.some(u => u.nombre === alumnoActual.nombre);
        
        if (usuarioEnTop3) {
          // Mostrar ranking
          const rankingView = rankingView();
          contenedor.appendChild(rankingView);
        } else {
          // Mostrar vista de gracias
          crearVistaGracias();
        }
      } else {
        // Mostrar vista de gracias por defecto si hay error
        crearVistaGracias();
      }
    })
    .catch(error => {
      console.error('Error al verificar ranking:', error);
      // Mostrar vista de gracias por defecto si hay error
      crearVistaGracias();
    });
}

// Iniciar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', determinarVistaFinal);