const contenedor = document.getElementById("seleJuegoFrame");
const user = JSON.parse(localStorage.getItem('user'));

// Verificar que el usuario es profesor
if (!user || user.rol !== 'profesor') {
  window.location.href = "../seleccionRol/seleccionRol.html";
  throw new Error('Acceso no autorizado');
}

let section = document.createElement("div");
section.className = "seleJuego-container";

// Logo + Título
let logoTitulo = document.createElement("div");
logoTitulo.className = "logo-titulo";

let logo = document.createElement("img");
logo.src = "/services/img/logo.png";
logo.alt = "Logo";

let titulo = document.createElement("h2");
titulo.textContent = `Profesor ${user.nombre}, ¿qué juego deseas crear?`;

logoTitulo.appendChild(logo);
logoTitulo.appendChild(titulo);
section.appendChild(logoTitulo);

// Contenedor de botones
let botonesContainer = document.createElement("div");
botonesContainer.className = "botones-juegos";

const juegos = ["Memoria", "Pregunta", "Conecta", "Selecciona"];

// Función para crear nueva partida
const crearPartida = async (tipoJuego) => {
  try {
    const response = await fetch('https://cartasbackend.onrender.com/api/nueva-partida', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        profesorId: user.id,
        tipoJuego: tipoJuego
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Guardar datos de la partida en localStorage
      localStorage.setItem('partidaActual', JSON.stringify({
        id: data.partidaId,
        tipoJuego: tipoJuego,
        codigo: data.codigoJuego
      }));
      
      // Redirigir a la pantalla de niveles
      window.location.href = "../Nivel/nivel.html";
    } else {
      alert('Error al crear partida: ' + (data.error || 'Error desconocido'));
    }
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo conectar al servidor. Verifica tu conexión.');
  }
};

// Crear botones para cada juego
juegos.forEach(juego => {
  let btn = document.createElement("button");
  btn.textContent = juego;

  btn.addEventListener("click", () => crearPartida(juego));

  botonesContainer.appendChild(btn);
});

section.appendChild(botonesContainer);

// Botón salir
let btnSalir = document.createElement("button");
btnSalir.className = "salir-btn";
btnSalir.textContent = "Cambiar Rol";
btnSalir.addEventListener("click", () => {
  window.location.href = "../seleccionRol/seleccionRol.html";
});



section.appendChild(btnSalir);

// Insertar en el contenedor principal
contenedor.appendChild(section);