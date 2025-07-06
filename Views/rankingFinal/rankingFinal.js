export function rankingView() {
  const contenedor = document.createElement('div');
  contenedor.className = 'rkf-container';

  // Obtener partida actual del localStorage
  const partidaActual = JSON.parse(localStorage.getItem('partidaActual')) || {};
  
  // Cargar datos reales
  cargarDatosReales(partidaActual.id, contenedor);

  return contenedor;
}

async function cargarDatosReales(partidaId, contenedor) {
  // Elementos de la UI
  const logo = document.createElement('img');
  logo.src = '../../services/img/logo2.png';
  logo.alt = 'logo';
  logo.className = 'rkf-logo';
  contenedor.appendChild(logo);

  const titulo = document.createElement('h1');
  titulo.textContent = 'Ranking Final';
  titulo.className = 'rkf-title';
  contenedor.appendChild(titulo);

  const lista = document.createElement('div');
  lista.id = 'rkf-list';
  contenedor.appendChild(lista);

  // Mostrar loading
  lista.innerHTML = '<div class="cargando">Cargando resultados...</div>';

  try {
    const response = await fetch(`http://localhost:3000/api/ranking-final/${partidaId}`);
    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || 'Error al cargar el ranking');
    }

    // Limpiar contenedor
    lista.innerHTML = '';

    // Mostrar tipo de juego
    const tipoJuego = document.createElement('div');
    tipoJuego.className = 'rkf-tipo-juego';
    tipoJuego.textContent = `Juego: ${data.tipoJuego.charAt(0).toUpperCase() + data.tipoJuego.slice(1)}`;
    lista.appendChild(tipoJuego);

    // Mostrar top 3 con estilos especiales
    if (data.top3 && data.top3.length > 0) {
      const tituloTop = document.createElement('h2');
      tituloTop.textContent = 'mejor jugador';
      tituloTop.className = 'rkf-subtitle';
      lista.appendChild(tituloTop);

      const podioContainer = document.createElement('div');
      podioContainer.className = 'rkf-podio-container';
      
      // Definir estilos para cada posición del podio
      const podioStyles = [
        { class: 'rkf-oro', label: '1°' },
        { class: 'rkf-plata', label: '2°' },
        { class: 'rkf-bronce', label: '3°' }
      ];
      
      data.top3.forEach((jugador, index) => {
        const estilo = podioStyles[index] || { class: '', label: `${index + 1}°` };
        
        const podioItem = document.createElement('div');
        podioItem.className = `rkf-podio-item ${estilo.class}`;
        
        // Posición
        const posicion = document.createElement('div');
        posicion.className = 'rkf-posicion';
        posicion.textContent = estilo.label;
        podioItem.appendChild(posicion);
        
        // Avatar
        const avatar = document.createElement('img');
        avatar.src = `/services/img/${jugador.avatar || 'default.png'}`;
        avatar.alt = 'avatar';
        avatar.className = 'rkf-avatar';
        podioItem.appendChild(avatar);
        
        // Nombre
        const nombre = document.createElement('div');
        nombre.className = 'rkf-nombre';
        nombre.textContent = jugador.nombre || 'Jugador';
        podioItem.appendChild(nombre);
        
        // Puntaje
        const puntaje = document.createElement('div');
        puntaje.className = 'rkf-puntaje';
        puntaje.textContent = `${jugador.puntaje_total} pts`;
        podioItem.appendChild(puntaje);
        
        podioContainer.appendChild(podioItem);
      });
      
      lista.appendChild(podioContainer);
    }

    // Mostrar otros jugadores en lista normal
    if (data.otrosJugadores && data.otrosJugadores.length > 0) {
      const tituloOtros = document.createElement('h2');
      tituloOtros.textContent = 'Todos los Participantes';
      tituloOtros.className = 'rkf-subtitle';
      lista.appendChild(tituloOtros);

      const listaJugadores = document.createElement('div');
      listaJugadores.className = 'rkf-lista-jugadores';
      
      data.otrosJugadores.forEach((jugador, index) => {
        const item = document.createElement('div');
        item.className = 'rkf-item';
        
        // Posición
        const posicion = document.createElement('div');
        posicion.className = 'rkf-posicion';
        posicion.textContent = index + 4;
        item.appendChild(posicion);
        
        // Avatar
        const avatar = document.createElement('img');
        avatar.src = `/services/img/${jugador.avatar || 'default.png'}`;
        avatar.alt = 'avatar';
        avatar.className = 'rkf-avatar';
        item.appendChild(avatar);
        
        // Nombre
        const nombre = document.createElement('div');
        nombre.className = 'rkf-nombre';
        nombre.textContent = jugador.nombre || 'Jugador';
        item.appendChild(nombre);
        
        // Puntaje
        const puntaje = document.createElement('div');
        puntaje.className = 'rkf-puntaje';
        puntaje.textContent = `${jugador.puntaje_total} pts`;
        item.appendChild(puntaje);
        
        // Aciertos/Errores
        const stats = document.createElement('div');
        stats.className = 'rkf-stats';
        stats.textContent = `✅ ${jugador.aciertos_totales} ❌ ${jugador.errores_totales} ⏱ ${formatearTiempo(jugador.tiempo_total)}`;
        item.appendChild(stats);
        
        listaJugadores.appendChild(item);
      });
      
      lista.appendChild(listaJugadores);
    }

  } catch (error) {
    console.error('Error:', error);
    lista.innerHTML = `
      <div class="rkf-error">
        <p>Error al cargar el ranking</p>
        <p>${error.message}</p>
      </div>
    `;
  }
}

function formatearTiempo(segundos) {
  const mins = Math.floor(segundos / 60);
  const secs = segundos % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}