const contenedor = document.getElementById("nivelFrame");
const user = JSON.parse(localStorage.getItem('user'));
const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));

// Verificar que el usuario es profesor y tiene partida
if (!user || user.rol !== 'profesor' || !partidaActual) {
  window.location.href = "../seleccionRol/seleccionRol.html";
  throw new Error('Acceso no autorizado');
}

let container = document.createElement('div');
container.className = 'nivel-container';

// Lado izquierdo: Logo + Botón regresar
let logoArea = document.createElement('div');
logoArea.className = 'logo-area';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.alt = "Logo";

let regresarBtn = document.createElement('button');
regresarBtn.textContent = "Regresar";
regresarBtn.className = "regresar-btn";
regresarBtn.addEventListener('click', () => {
  window.location.href = "../SeleJuego/seleJuego.html";
});

logoArea.appendChild(logo);
logoArea.appendChild(regresarBtn);

// Lado derecho: Contenido de niveles
let infoArea = document.createElement('div');
infoArea.className = 'nivel-info';

let contador = document.createElement('div');
contador.className = 'contador';
contador.textContent = "Niveles seleccionados: 0";

let titulo = document.createElement('h2');
titulo.textContent = `Elige niveles para ${partidaActual.tipoJuego}`;

// Selector de dificultad
let dificultadContainer = document.createElement('div');
dificultadContainer.className = 'dificultad-container';

let dificultadLabel = document.createElement('label');
dificultadLabel.textContent = "Dificultad:";
dificultadLabel.htmlFor = "dificultad";

let dificultadSelect = document.createElement('select');
dificultadSelect.id = "dificultad";
['Fácil', 'Medio', 'Difícil'].forEach(opcion => {
  let option = document.createElement('option');
  option.value = opcion.toLowerCase();
  option.textContent = opcion;
  dificultadSelect.appendChild(option);
});

dificultadContainer.appendChild(dificultadLabel);
dificultadContainer.appendChild(dificultadSelect);

let botonesContainer = document.createElement('div');
botonesContainer.className = 'botones-nivel';

let contadorNivel = 0;
const nivelesSeleccionados = new Set();

for (let i = 1; i <= 5; i++) {
  let btn = document.createElement('button');
  btn.textContent = `Nivel ${i}`;

  btn.addEventListener('click', () => {
    btn.classList.toggle('selected');
    
    if (nivelesSeleccionados.has(i)) {
      nivelesSeleccionados.delete(i);
    } else {
      nivelesSeleccionados.add(i);
    }
    
    contadorNivel = nivelesSeleccionados.size;
    contador.textContent = `Niveles seleccionados: ${contadorNivel}`;
  });

  botonesContainer.appendChild(btn);
}

// Botón para guardar niveles
let guardarBtn = document.createElement('button');
guardarBtn.textContent = "Guardar Niveles";
guardarBtn.className = "guardar-btn";

guardarBtn.addEventListener('click', async () => {
  // Validar selección de niveles
  if (contadorNivel === 0) {
    alert('Por favor selecciona al menos un nivel');
    return;
  }

  // Obtener valores seleccionados
  const dificultad = dificultadSelect.value;
  const nivelesArray = Array.from(nivelesSeleccionados).sort((a, b) => a - b);
  const dificultadTexto = dificultadSelect.options[dificultadSelect.selectedIndex].text;

  // Mensaje de confirmación
  let confirmMessage = `Configurar partida con:\n\n` +
                     `• Niveles: ${nivelesArray.join(', ')}\n` +
                     `• Dificultad: ${dificultadTexto}\n\n` +
                     `¿Deseas continuar?`;

  if (dificultad === 'dificil') {
    confirmMessage += '\n\n¡ADVERTENCIA! La dificultad difícil reduce el tiempo por nivel.';
  }

  if (!confirm(confirmMessage)) {
    return;
  }

  // Configurar estado del botón durante la operación
  guardarBtn.disabled = true;
  guardarBtn.textContent = "Guardando...";
  guardarBtn.classList.add('processing');

  try {
    // Enviar datos al servidor
    const response = await fetch('https://cartasbackend.onrender.com/api/actualizar-partida', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        partidaId: partidaActual.id,
        niveles: nivelesArray, // Enviar array de niveles seleccionados
        cantidadNiveles: contadorNivel,
        dificultad: dificultad
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al guardar la configuración');
    }

    // Mostrar feedback al usuario
    const tiempoPorNivel = data.tiempoPorNivel || 60;
    const horaInicio = new Date(data.horaInicio).toLocaleTimeString();
    const horaFin = new Date(data.horaFinEstimada).toLocaleTimeString();

    // Actualizar localStorage
    partidaActual.configuracion = {
      niveles: nivelesArray,
      cantidadNiveles: contadorNivel,
      dificultad: dificultad,
      tiempoPorNivel: tiempoPorNivel,
      horaInicio: data.horaInicio,
      horaFinEstimada: data.horaFinEstimada
    };
    localStorage.setItem('partidaActual', JSON.stringify(partidaActual));

    // Mensaje de éxito con formato mejorado
    const successMessage = [
      "✅ Configuración guardada exitosamente",
      `• Niveles: ${nivelesArray.join(', ')}`,
      `• Dificultad: ${dificultadTexto}`,
      `• Tiempo por nivel: ${tiempoPorNivel} segundos`,
      `• Hora inicio: ${horaInicio}`,
      `• Hora fin estimada: ${horaFin}`
    ].join('\n');

    alert(successMessage);

    // Habilitar botón de código si la operación fue exitosa
    codigoBtn.disabled = false;

  } catch (error) {
    console.error('Error:', error);
    alert(`❌ Error al guardar: ${error.message}`);
  } finally {
    // Restaurar estado del botón
    guardarBtn.disabled = false;
    guardarBtn.textContent = "Guardar Niveles";
    guardarBtn.classList.remove('processing');
  }
});

// Botón para ver código de partida
let codigoBtn = document.createElement('button');
codigoBtn.textContent = "Ver Código de Partida";
codigoBtn.className = "codigo-btn";
codigoBtn.addEventListener('click', () => {
  // Redirigir a la vista de código
  window.location.href = "../darcodigo/darcodigo.html";
});

infoArea.appendChild(contador);
infoArea.appendChild(titulo);
infoArea.appendChild(dificultadContainer);
infoArea.appendChild(botonesContainer);
infoArea.appendChild(guardarBtn);
infoArea.appendChild(codigoBtn);

// Añadir todo al contenedor principal
container.appendChild(logoArea);
container.appendChild(infoArea);
contenedor.appendChild(container);