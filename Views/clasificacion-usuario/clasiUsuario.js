const contenedor = document.getElementById("clasiUsuarioFrame");

let container = document.createElement('div');
container.className = 'clasi-container';

let logoArea = document.createElement('div');
logoArea.className = 'logo-area';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.alt = "Logo";
logo.className = "logo-clasi";

let regresarBtn = document.createElement('button');
regresarBtn.textContent = "Regresar";
regresarBtn.className = "regresar-btn";
regresarBtn.addEventListener('click', () => {
  window.location.href = "../SeleJuego/seleJuego.html";
});

logoArea.appendChild(logo);
logoArea.appendChild(regresarBtn);

let contentArea = document.createElement('div');
contentArea.className = 'content-area';

let titulo = document.createElement('h1');
titulo.textContent = "Tabla de clasificación";
titulo.className = "titulo-clasi";

let listaUsuarios = document.createElement('div');
listaUsuarios.className = 'lista-usuarios';

// Función para crear items de usuario
function crearItemUsuario(usuario, index) {
  let item = document.createElement('div');
  item.className = 'usuario-item';
  
  // Animación de entrada
  item.style.opacity = '0';
  item.style.transform = 'translateY(20px)';
  item.style.transition = `all 0.3s ease ${index * 0.1}s`;
  
  let posicion = document.createElement('span');
  posicion.className = 'posicion-usuario';
  posicion.textContent = `#${index + 1}`;
  
  let avatar = document.createElement('img');
  avatar.src = usuario.avatar ? `/services/img/${usuario.avatar}` : '/services/img/default.png';
  avatar.alt = `Avatar ${usuario.nombre}`;
  avatar.className = 'avatar-usuario';
  
  let nombre = document.createElement('span');
  nombre.className = 'nombre-usuario';
  nombre.textContent = usuario.nombre;
  
  let puntos = document.createElement('span');
  puntos.className = 'puntos-usuario';
  puntos.textContent = `${usuario.puntaje_total || usuario.puntos || 0}pts`;
  
  item.appendChild(posicion);
  item.appendChild(avatar);
  item.appendChild(nombre);
  item.appendChild(puntos);
  
  // Aplicar animación después de un breve retraso
  setTimeout(() => {
    item.style.opacity = '1';
    item.style.transform = 'translateY(0)';
  }, 50);
  
  return item;
}

// Función para cargar resultados reales
async function cargarResultadosPartida() {
  try {
    const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
    if (!partidaActual || !partidaActual.id) {
      throw new Error('No se encontró información de la partida');
    }

    // Simular carga de datos (en producción, harías una petición al backend)
    // const response = await fetch(`http://localhost:3000/api/partida/${partidaActual.id}/resultados`);
    // const data = await response.json();
    
    // Datos de ejemplo (eliminar en producción)
    const data = {
      resultados: [
        {
          id_usuario: 1,
          nombre: "Usuario Ejemplo 1",
          avatar: "zorro.png",
          puntaje_total: 150,
          aciertos_total: 15,
          errores_total: 2,
          niveles_completados: 3
        },
        {
          id_usuario: 2,
          nombre: "Usuario Ejemplo 2",
          avatar: "mapache.png",
          puntaje_total: 120,
          aciertos_total: 12,
          errores_total: 3,
          niveles_completados: 3
        },
        {
          id_usuario: 3,
          nombre: "Usuario Ejemplo 3",
          avatar: "ran.png",
          puntaje_total: 90,
          aciertos_total: 9,
          errores_total: 5,
          niveles_completados: 3
        }
      ]
    };

    // Guardar resultados para el ranking final
    localStorage.setItem('resultadosPartida', JSON.stringify(data.resultados));
    
    // Actualizar la lista de usuarios
    actualizarListaUsuarios(data.resultados);

  } catch (error) {
    console.error('Error al cargar resultados:', error);
    mostrarError(error.message);
    
    // Mostrar datos de ejemplo si hay error
    const usuariosEjemplo = [
      { nombre: "Usuario1", puntos: 100, avatar: "koalapt.png" },
      { nombre: "Usuario2", puntos: 80, avatar: "lobopt.png" },
      { nombre: "Usuario3", puntos: 60, avatar: "pandapt.png" }
    ];
    actualizarListaUsuarios(usuariosEjemplo);
  }
}

function actualizarListaUsuarios(usuarios) {
  listaUsuarios.innerHTML = '';
  usuarios.forEach((usuario, index) => {
    listaUsuarios.appendChild(crearItemUsuario(usuario, index));
  });
}

function mostrarError(mensaje) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = mensaje;
  errorElement.style.cssText = `
    color: red;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid red;
    border-radius: 5px;
    text-align: center;
  `;
  
  if (contentArea) {
    contentArea.insertBefore(errorElement, contentArea.firstChild);
    setTimeout(() => errorElement.remove(), 5000);
  }
}

contentArea.appendChild(titulo);
contentArea.appendChild(listaUsuarios);

let botonesArea = document.createElement('div');
botonesArea.className = 'botones-area';

let btnSalir = document.createElement('button');
btnSalir.textContent = "Salir";
btnSalir.className = "btn-salir";
btnSalir.addEventListener('click', () => {
  window.location.href = "../SeleJuego/seleJuego.html";
});

let btnRanking = document.createElement('button');
btnRanking.textContent = "Ranking final";
btnRanking.className = "btn-ranking";
btnRanking.addEventListener('click', () => {
  window.location.href = "../rankingFinal/rankingFinal.html";
});

let btnDescargar = document.createElement('button');
btnDescargar.textContent = "Descargar tarjeta";
btnDescargar.className = "btn-descargar";
btnDescargar.addEventListener('click', () => {
  const resultados = JSON.parse(localStorage.getItem('resultadosPartida')) || [];
  const contenido = resultados.map(j => `${j.nombre}: ${j.puntaje_total || j.puntos || 0} pts`).join('\n');
  const blob = new Blob([contenido], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `resultados-${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  
  URL.revokeObjectURL(url);
});

botonesArea.appendChild(btnSalir);
botonesArea.appendChild(btnRanking);
botonesArea.appendChild(btnDescargar);

contentArea.appendChild(botonesArea);

container.appendChild(logoArea);
container.appendChild(contentArea);
contenedor.appendChild(container);

// Cargar resultados al iniciar
document.addEventListener('DOMContentLoaded', cargarResultadosPartida);