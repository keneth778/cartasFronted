document.addEventListener('DOMContentLoaded', async () => {
  // Elementos del DOM
  const codigoElement = document.getElementById('codigoPartida');
  const btnVer = document.getElementById('btnVer');
  const btnSiguiente = document.getElementById('btnSiguiente');

  try {
    // Obtener el código real de la base de datos
    const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
    const response = await fetch(`http://localhost:3000/api/partida/${partidaActual.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al obtener código de partida');
    }

    // Mostrar el código real
    codigoElement.textContent = data.codigoJuego;

    // Event listeners
    btnVer.addEventListener('click', () => {
      window.location.href = '../participantes/participante.html';
    });

    
  } catch (error) {
    console.error('Error:', error);
    codigoElement.textContent = 'Error al cargar código';
    codigoElement.style.color = 'red';
  }
});