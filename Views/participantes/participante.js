const contenedor = document.getElementById('participantesFrame');

async function cargarParticipantes() {
  try {
    const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
    const response = await fetch(`http://localhost:3000/api/participantes/${partidaActual.id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Error al cargar participantes');
    }
    
    const listaParticipantes = document.createElement('ul');
    listaParticipantes.className = "lista-participantes";
    
    if (data.participantes.length === 0) {
      listaParticipantes.innerHTML = '<li class="sin-participantes">No hay participantes aún</li>';
    } else {
      data.participantes.forEach(participante => {
        const item = document.createElement('li');
        item.className = 'participante-item';
        
        const avatar = document.createElement('img');
        avatar.src = `/services/img/${participante.avatar}`;
        avatar.alt = "Avatar";
        avatar.className = "avatar-participante";
        
        const nombre = document.createElement('span');
        nombre.textContent = participante.nombre;
        nombre.className = "nombre-participante";
        
        item.appendChild(avatar);
        item.appendChild(nombre);
        listaParticipantes.appendChild(item);
      });
    }
    
    return listaParticipantes;
    
  } catch (error) {
    console.error('Error:', error);
    const errorElement = document.createElement('div');
    errorElement.className = "error";
    errorElement.textContent = `Error al cargar participantes: ${error.message}`;
    return errorElement;
  }
}

async function inicializarPagina() {
  const section = document.createElement('div');
  section.className = 'participantes-container';
  
  // Logo
  const logo = document.createElement('img');
  logo.src = "/services/img/logo2.png";
  logo.alt = "Logo";
  logo.className = "logo-participantes";
  section.appendChild(logo);
  
  // Título
  const titulo = document.createElement('h1');
  titulo.textContent = "Participantes";
  titulo.className = "titulo-participantes";
  section.appendChild(titulo);
  
  // Lista de participantes
  const lista = await cargarParticipantes();
  section.appendChild(lista);
  
  // Botón Comenzar Partida (MODIFICADO)
  const btnComenzar = document.createElement('button');
  btnComenzar.textContent = "Comenzar partida";
  btnComenzar.className = "btn-comenzar";
// participantes.js - Modificación en el evento click del botón
btnComenzar.addEventListener('click', async () => {
  try {
    btnComenzar.disabled = true;
    btnComenzar.textContent = "Iniciando...";
    
    const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
    
    // Verificar que existe partidaActual y partidaActual.id
    if (!partidaActual || !partidaActual.id) {
      throw new Error('No se encontró información de la partida');
    }

    // Cambiar estado de la partida
    const response = await fetch(`http://localhost:3000/api/partida/${partidaActual.id}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ estado: 'en_progreso' })
    });

    // Verificar si la respuesta es OK (200-299)
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    // Intentar parsear la respuesta como JSON solo si hay contenido
    const data = response.status !== 204 ? await response.json() : null;
    
    
  } catch (error) {
    console.error('Error al iniciar partida:', error);
    alert(error.message || 'Error al comenzar partida');
    btnComenzar.disabled = false;
    btnComenzar.textContent = "Comenzar partida";
  }
});

  section.appendChild(btnComenzar);
  
 
  contenedor.appendChild(section);
}

document.addEventListener('DOMContentLoaded', inicializarPagina);