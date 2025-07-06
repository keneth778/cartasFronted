const contenedor = document.getElementById('codePartidaFrame');
const inputNombre = document.createElement('input');
const inputCodigo = document.createElement('input');
const btnIngresar = document.createElement('button');
let avatarSeleccionado = null;
let intervaloVerificacion = null; // Para verificar el estado de la partida

// Configuración inicial
function inicializarInterfaz() {
  contenedor.innerHTML = '';
  
  const section = document.createElement('div');
  section.className = 'codePartida-container';

  // Logo y título
  const logoTitulo = document.createElement('div');
  logoTitulo.className = 'logo-titulo';

  const logo = document.createElement('img');
  logo.src = "/services/img/logo.png";
  logo.alt = "Logo";

  const titulo = document.createElement('h2');
  titulo.textContent = "UP THE CARDS";

  logoTitulo.appendChild(logo);
  logoTitulo.appendChild(titulo);
  section.appendChild(logoTitulo);

  // Input nombre
  inputNombre.type = "text";
  inputNombre.placeholder = "Nombre de usuario";
  inputNombre.className = "iusuario";
  inputNombre.required = true;
  section.appendChild(inputNombre);

  // Sección de avatar
  const avatarSection = document.createElement('div');
  avatarSection.className = "avatar-section";

  const avatarTitle = document.createElement('h3');
  avatarTitle.textContent = "Elige un avatar";
  avatarSection.appendChild(avatarTitle);

  const avatarContainer = document.createElement('div');
  avatarContainer.className = "avatar-options";

  const avatares = ["zorro.png", "mapache.png", "ran.png", "panda.png", "koala.png", "pinguino.png"];

  avatares.forEach((nombre) => {
    const avatar = document.createElement('img');
    avatar.src = `/services/img/${nombre}`;
    avatar.alt = `Avatar ${nombre.split('.')[0]}`;
    avatar.addEventListener('click', () => {
      document.querySelectorAll('.avatar-options img').forEach(img => img.classList.remove('selected'));
      avatar.classList.add('selected');
      avatarSeleccionado = nombre;
    });
    avatarContainer.appendChild(avatar);
  });

  avatarSection.appendChild(avatarContainer);
  section.appendChild(avatarSection);

  // Input código
  inputCodigo.type = "text";
  inputCodigo.className = "icodigo";
  inputCodigo.placeholder = "Código de partida";
  inputCodigo.required = true;
  section.appendChild(inputCodigo);

  // Botón ingresar
  btnIngresar.textContent = "Ingresar";
  btnIngresar.className = "btn_ingresar";
  section.appendChild(btnIngresar);

  contenedor.appendChild(section);
}

// Configuración de rutas de juegos
const rutasJuegos = {
  'memoria': '/Views/Juegos/memoria/memoria.html',
  'conecta': '/Views/Juegos/conecta/conecta.html',
  'preguntas': '/Views/Juegos/preguntas/preguntas.html',
  'selecciona': '/Views/Juegos/selecciona/selecciona.html'
};

// Normalizar tipo de juego
function normalizarTipoJuego(tipo) {
  const tipos = {
    'memoria': 'memoria',
    'conecta': 'conecta',
    'pregunta': 'preguntas',
    'preguntas': 'preguntas',
    'selecciona': 'selecciona'
  };
  return tipos[tipo.toLowerCase()] || tipo;
}

// Generar ID temporal para usuarios no registrados
function generarIdTemporal() {
  let tempId = localStorage.getItem('tempUserId');
  if (!tempId) {
    tempId = `temp_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('tempUserId', tempId);
  }
  return tempId;
}

async function verificarEstadoPartida(partidaId) {
  if (!partidaId) {
    console.error('ID de partida no definido');
    return;
  }

  try {
    const response = await fetch(`https://cartasbackend.onrender.com/api/partida/${partidaId}/estado`);
    
    // Verifica si la respuesta es JSON válido
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new Error(data.error || 'Error al verificar estado');
    }

    if (data.estado === 'en_progreso') {
      // Detener la verificación
      clearInterval(intervaloVerificacion);
      
      // Redirigir al juego
      const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
      const tipoJuego = normalizarTipoJuego(partidaActual.tipoJuego);
      const rutaJuego = rutasJuegos[tipoJuego];
      
      if (rutaJuego) {
        window.location.href = rutaJuego;
      }
    }
  } catch (error) {
    console.error('Error al verificar estado:', error);
  }
}

// Función para mostrar pantalla de espera
// Función para mostrar pantalla de espera (sin botón de volver a intentar)
function mostrarPantallaEspera(partidaData) {
  contenedor.innerHTML = '';
  
  const section = document.createElement('div');
  section.className = 'espera-container';
  section.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
    text-align: center;
    padding: 20px;
  `;

  // Logo
  const logo = document.createElement('img');
  logo.src = "/services/img/logo.png";
  logo.alt = "Logo";
  logo.style.cssText = 'width: 100px; height: 100px; margin-bottom: 20px;';
  section.appendChild(logo);

  // Título
  const titulo = document.createElement('h2');
  titulo.textContent = "¡Registro Exitoso!";
  titulo.style.cssText = 'color: #4CAF50; margin-bottom: 20px;';
  section.appendChild(titulo);

  // Mensaje de espera
  const mensaje = document.createElement('p');
  mensaje.textContent = "Esperando a que el profesor inicie el juego...";
  mensaje.style.cssText = 'font-size: 18px; color: #666; margin-bottom: 30px;';
  section.appendChild(mensaje);

  // Información del jugador
  const infoJugador = document.createElement('div');
  infoJugador.style.cssText = 'background: #f5f5f5; padding: 20px; border-radius: 10px; margin-bottom: 20px;';
  
  const alumnoActual = JSON.parse(localStorage.getItem('alumnoActual') || '{}');
  
  infoJugador.innerHTML = `
    <h3>Tu información:</h3>
    <p><strong>Nombre:</strong> ${alumnoActual.nombre || 'N/A'}</p>
    <p><strong>Juego:</strong> ${partidaData.tipoJuego || 'N/A'}</p>
    <img src="/services/img/${alumnoActual.avatar || 'default.png'}" 
         style="width: 50px; height: 50px; border-radius: 50%; margin-top: 10px;"
         alt="Tu avatar">
  `;
  section.appendChild(infoJugador);

  // Indicador de carga
  const indicador = document.createElement('div');
  indicador.innerHTML = `
    <div class="spinner" style="
      border: 4px solid #f3f3f3;
      border-top: 4px solid #3498db;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 2s linear infinite;
      margin: 0 auto;
    "></div>
    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;
  section.appendChild(indicador);

  contenedor.appendChild(section);

  // Iniciar verificación periódica del estado
  console.log('Iniciando verificación de estado para partida:', partidaData.partidaId);
  intervaloVerificacion = setInterval(() => {
    verificarEstadoPartida(partidaData.partidaId);
  }, 3000); // Verificar cada 3 segundos
}

// Evento para el botón ingresar (CORREGIDO)
btnIngresar.addEventListener('click', async () => {
  const nombre = inputNombre.value.trim();
  const codigo = inputCodigo.value.trim();
  
  if (!nombre || !codigo) {
    alert('Por favor completa todos los campos');
    return;
  }

  if (!avatarSeleccionado) {
    alert('Por favor selecciona un avatar');
    return;
  }

  try {
    btnIngresar.disabled = true;
    btnIngresar.textContent = "Ingresando...";

    // 1. Obtener ID de usuario (declaración movida aquí)
    const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
    const idUsuario = usuario.id || generarIdTemporal();

    // 2. Registrar al alumno
    const registroResponse = await fetch('https://cartasbackend.onrender.com/api/registrar-alumno', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: nombre,
        avatar: avatarSeleccionado,
        codigoPartida: codigo,
        id_usuario: idUsuario
      })
    });

    const registroData = await registroResponse.json();

    if (!registroResponse.ok) {
      throw new Error(registroData.error || 'Error al registrar alumno');
    }

    console.log('Datos de registro:', registroData);

    // 3. Guardar datos en localStorage
    localStorage.setItem('alumnoActual', JSON.stringify({
      id: idUsuario,
      nombre: nombre,
      avatar: avatarSeleccionado
    }));

    localStorage.setItem('partidaActual', JSON.stringify({
      id: registroData.partidaId,
      tipoJuego: registroData.tipoJuego,
      estado: registroData.estado || 'esperando'
    }));

    // 4. Manejar redirección según estado
    if (registroData.estado === 'en_progreso') {
      const tipoJuego = normalizarTipoJuego(registroData.tipoJuego);
      const rutaJuego = rutasJuegos[tipoJuego];
      
      if (rutaJuego) {
        window.location.href = rutaJuego;
      } else {
        throw new Error('Tipo de juego no reconocido');
      }
    } else {
      mostrarPantallaEspera({
        partidaId: registroData.partidaId,
        tipoJuego: registroData.tipoJuego
      });
    }

  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'Error al ingresar a la partida');
    btnIngresar.disabled = false;
    btnIngresar.textContent = "Ingresar";
  }
});

// Limpiar intervalos al salir
window.addEventListener('beforeunload', () => {
  if (intervaloVerificacion) {
    clearInterval(intervaloVerificacion);
  }
});

// Inicializar la interfaz al cargar
document.addEventListener('DOMContentLoaded', inicializarInterfaz);