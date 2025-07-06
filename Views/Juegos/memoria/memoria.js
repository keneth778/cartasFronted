const contenedor = document.getElementById('memoriaFrame');

// Configuración base de niveles
const nivelesBase = {
    1: {
        nombre: "Nivel 1",
        cartas: ["leon.png", "mono.png", "serpiente.png"],
        rutaImagenes: "/services/img-memoria/niveluno-img/"
    },
    2: {
        nombre: "Nivel 2",
        cartas: ["cangrejo.png", "delfin.png", "pez.png", "pulpo.png"],
        rutaImagenes: "/services/img-memoria/niveldos-img/"
    },
    3: {
        nombre: "Nivel 3",
        cartas: ["arcoiris.png", "caracol.png", "gusano.png", "hoja.png", "mariposa.png", "mariquita.png"],
        rutaImagenes: "/services/img-memoria/niveltres-img/"
    },
    4: {
        nombre: "Nivel 4",
        cartas: ["burro.png", "caballo.png", "gallina.png", "jimina.png", "kook.png", "oveja.png", "perro.png", "porqui.png", "vaca.png"],
        rutaImagenes: "/services/img-memoria/nivelcuatro-img/"
    },
    5: {
        nombre: "Nivel 5",
        cartas: ["armadillo.png", "buho.png", "conejo.png", "hobi.png", "hongo.png", "lobo.png", "reno.png", "tae.png", "zorrillo.png", "zorro.png"],
        rutaImagenes: "/services/img-memoria/nivelcinco-img/"
    }
};

// Variables del juego
let cartas = [];
let cartasVolteadas = [];
let errores = 0;
let aciertos = 0;
let bloqueado = false;
let tiempoRestante = 0;
let temporizador;
let btnFinalizar;
let nivelActual = 0;
let nivelesConfigurados = [];
let tiempoPorNivel = 60;
let columnasPorNivel = 4;

// Obtener configuración de la partida
async function obtenerConfiguracionPartida() {
  try {
    const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
    if (!partidaActual?.id) {
      throw new Error('No se encontró información de partida en localStorage');
    }

    // 1. Primero validar que la partida está configurada correctamente
    const validacionResponse = await fetch(`http://localhost:3000/api/validar-partida/${partidaActual.id}`);
    const validacionData = await validacionResponse.json();

    if (!validacionResponse.ok || !validacionData.valida) {
      throw new Error(validacionData.error || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
    }

    // 2. Obtener configuración completa
    const response = await fetch(`http://localhost:3000/api/partida/${partidaActual.id}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
    }

    const data = await response.json();
    
    // 3. Validar que tiene configuración completa
    if (!data.configurada || !data.niveles || data.niveles.length === 0 || !data.dificultad) {
      throw new Error('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
    }

    // 4. Estructurar configuración final
    const config = {
      niveles: data.niveles, // Solo los niveles que el profesor seleccionó
      dificultad: data.dificultad,
      tiempoPorNivel: data.tiempoPorNivel,
      tiemposPorNivel: data.tiemposPorNivel || {},
      horaInicio: data.horaInicio || new Date().toISOString(),
      horaFin: data.horaFin || new Date(Date.now() + 3600000).toISOString(),
      configurada: true
    };

    console.log('Configuración del profesor cargada exitosamente:', config);
    return config;

  } catch (error) {
    console.error('Error crítico al obtener configuración:', error);
    
    // NO proporcionar configuración de emergencia - mostrar error y detener el juego
    alert(error.message || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
    
    // Redirigir de vuelta a la pantalla de entrada
    window.location.href = "../entradaAlumno/entradaAlumno.html";
    
    // Lanzar error para detener la ejecución
    throw error;
  }
}

// MODIFICAR la función inicializarJuego para manejar errores correctamente
async function inicializarJuego() {
  console.log('Inicializando juego de memoria...');
  
  try {
    // 1. Obtener configuración del profesor (obligatoria)
    const config = await obtenerConfiguracionPartida();

    // 2. Validar configuración
    if (!config.configurada || !config.niveles || config.niveles.length === 0) {
      throw new Error('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
    }

    // 3. Aplicar configuración EXACTA del profesor
    nivelesConfigurados = config.niveles; // Solo los niveles que el profesor seleccionó
    tiempoPorNivel = config.tiempoPorNivel;
    columnasPorNivel = mapearDificultad(config.dificultad);

    console.log('Configuración del profesor aplicada:', {
      niveles: nivelesConfigurados,
      tiempoPorNivel,
      columnas: columnasPorNivel,
      dificultad: config.dificultad
    });

    // 4. Verificar que tenemos al menos un nivel
    if (nivelesConfigurados.length === 0) {
      throw new Error('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
    }

    // 5. Iniciar primer nivel
    nivelActual = 0;
    await iniciarNivel(nivelesConfigurados[nivelActual]);

  } catch (error) {
    console.error('Error crítico al inicializar juego:', error);
    
    // NO continuar con configuración por defecto
    alert('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
    window.location.href = "../entradaAlumno/entradaAlumno.html";
    return; // Detener ejecución
  }
}
// Función para mapear dificultad a columnas
function mapearDificultad(dificultad) {
    const map = {
        'fácil': 3,
        'medio': 4,
        'difícil': 5
    };
    return map[dificultad.toLowerCase()] || 4;
}

async function inicializarJuego() {
  console.log('Inicializando juego de memoria...');
  
  try {
    // 1. Obtener configuración
    const config = await obtenerConfiguracionPartida();
    console.log('Configuración obtenida:', config);

    // 2. Validar y aplicar configuración
    if (!config.niveles || config.niveles.length === 0) {
      throw new Error('No hay niveles configurados');
    }

    // Aplicar configuración a variables globales
    nivelesConfigurados = config.niveles;
    tiempoPorNivel = config.tiempoPorNivel || 60;
    columnasPorNivel = mapearDificultad(config.dificultad || 'medio');

    console.log('Configuración aplicada:', {
      niveles: nivelesConfigurados,
      tiempoPorNivel,
      columnas: columnasPorNivel,
      dificultad: config.dificultad
    });

    // 3. Iniciar primer nivel
    nivelActual = 0;
    await iniciarNivel(nivelesConfigurados[nivelActual]);

  } catch (error) {
    console.error('Error crítico al inicializar juego:', error);
    
    // Configuración de emergencia
    nivelesConfigurados = [1, 2, 3, 4, 5];
    tiempoPorNivel = 60;
    columnasPorNivel = 4;
    
    alert('Se cargó configuración por defecto. El juego puede continuar.');
    
    nivelActual = 0;
    await iniciarNivel(nivelesConfigurados[nivelActual]);
  }
}
// Función para iniciar un nivel específico
async function iniciarNivel(numeroNivel) {
    clearInterval(temporizador);
    contenedor.innerHTML = '';
    
    // Obtener configuración base del nivel
    const configBase = nivelesBase[numeroNivel];
    if (!configBase) {
        console.error('Configuración no encontrada para el nivel:', numeroNivel);
        return;
    }

    // Crear configuración final combinando base con ajustes del profesor
    const configFinal = {
        ...configBase,
        tiempo: tiempoPorNivel,
        columnas: columnasPorNivel
    };

    // Mezclar cartas (pares)
    cartas = mezclarCartas([...configBase.cartas, ...configBase.cartas]);
    tiempoRestante = configFinal.tiempo;
    errores = 0;
    aciertos = 0;
    cartasVolteadas = [];
    bloqueado = false;
    
    // Crear interfaz
    const interfaz = await crearInterfaz(configFinal);
    contenedor.appendChild(interfaz);
    
    // Iniciar temporizador
    temporizador = setInterval(actualizarTemporizador, 1000);
}

// Función para mezclar cartas
function mezclarCartas(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Función para crear cartas
async function crearCartas(config) {
    const gridCartas = document.createElement('div');
    gridCartas.className = 'grid-cartas';
    gridCartas.style.gridTemplateColumns = `repeat(${config.columnas}, 1fr)`;
    
    const filas = Math.ceil(cartas.length / config.columnas);
    gridCartas.style.gridTemplateRows = `repeat(${filas}, 1fr)`;
    
    const gapSize = Math.max(5, 15 - (config.columnas * 1.5));
    gridCartas.style.gap = `${gapSize}px`;

    for (const carta of cartas) {
        const cartaElement = document.createElement('div');
        cartaElement.className = 'carta';
        cartaElement.dataset.carta = carta;

        const frente = document.createElement('div');
        frente.className = 'frente';
        
        const img = document.createElement('img');
        img.src = config.rutaImagenes + carta;
        img.alt = carta.split('.')[0];
        
        img.onerror = function() {
            console.error(`Error al cargar: ${config.rutaImagenes}${carta}`);
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2380B7D5"/><text x="50" y="55" font-family="Arial" font-size="10" text-anchor="middle" fill="%23fff">' + carta.split('.')[0] + '</text></svg>';
        };
        
        frente.appendChild(img);

        const dorso = document.createElement('div');
        dorso.className = 'dorso';
        
        cartaElement.appendChild(frente);
        cartaElement.appendChild(dorso);
        cartaElement.addEventListener('click', voltearCarta);
        gridCartas.appendChild(cartaElement);
    }

    return gridCartas;
}

// Función para guardar resultados
async function guardarResultadoNivel(nivel, aciertos, errores, tiempoUsado) {
    try {
        const alumnoActual = JSON.parse(localStorage.getItem('alumnoActual')) || {};
        const partidaActual = JSON.parse(localStorage.getItem('partidaActual')) || {};
        
        // Generar ID consistente para usuarios temporales
        let userId = alumnoActual.id;
        if (!userId || typeof userId !== 'string') {
            // Crear ID temporal persistente si no existe
            userId = localStorage.getItem('tempUserId');
            if (!userId) {
                userId = 'temp_' + Math.random().toString(36).substr(2, 8);
                localStorage.setItem('tempUserId', userId);
            }
        }

        // Preparar datos para enviar
        const datos = {
            id_usuario: userId,
            nombre: alumnoActual.nombre || 'Jugador Anónimo',
            avatar: alumnoActual.avatar || 'default.png',
            nivel: nivel,
            aciertos: aciertos,
            errores: errores,
            tiempo_usado: tiempoUsado,
            dificultad: columnasPorNivel === 3 ? 'fácil' : 
                      columnasPorNivel === 4 ? 'medio' : 'difícil',
          id_partida: partidaActual.id || null  // Asegúrate de incluir esto
        };

        console.log('Enviando datos al servidor:', datos);

        const response = await fetch('http://localhost:3000/api/guardar-resultado-memoria', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const responseData = await response.json();
        
        if (!response.ok) {
            throw new Error(responseData.error || 'Error al guardar resultados');
        }

        return responseData;

    } catch (error) {
        console.error('Error al guardar resultados:', error);
        
        // Mostrar error sin interrumpir el flujo del juego
        const errorElement = document.createElement('div');
        errorElement.className = 'error-flotante';
        errorElement.textContent = 'No se pudieron guardar los resultados. El juego continuará.';
        document.body.appendChild(errorElement);
        setTimeout(() => errorElement.remove(), 3000);
        
        throw error;
    }
}

// Función para crear la interfaz
async function crearInterfaz(config) {
    const juegoContainer = document.createElement('div');
    juegoContainer.className = 'juego-container';

    // Header
    const header = document.createElement('div');
    header.className = 'header';
    header.innerHTML = `
        <img src="/services/img/logo.png" class="logo">
        <h1 class="titulo-juego">UP THE CARDS</h1>
    `;
    juegoContainer.appendChild(header);

    // Sección de información
    const infoSection = document.createElement('div');
    infoSection.className = 'info-section';
    infoSection.innerHTML = `
        <div class="info-circulo">
            <span>Tiempo</span>
            <div class="valor" id="tiempo">${formatearTiempo(tiempoRestante)}</div>
        </div>
        <h2 class="titulo-memoria">MEMORIA - ${config.nombre}</h2>
        <div class="info-circulo">
            <span>Errores</span>
            <div class="valor" id="contador-errores">0</div>
        </div>
    `;
    juegoContainer.appendChild(infoSection);

    // Cartas
    const gridCartas = await crearCartas(config);
    juegoContainer.appendChild(gridCartas);

    // Botón Finalizar
    btnFinalizar = document.createElement('button');
    btnFinalizar.className = 'btn-finalizar';
    btnFinalizar.textContent = "Finalizar";
    btnFinalizar.addEventListener('click', () => finalizarNivel(false));
    juegoContainer.appendChild(btnFinalizar);

    return juegoContainer;
}

// Función para finalizar el nivel
async function finalizarNivel(completado) {
    clearInterval(temporizador);
    
    const tiempoUsado = tiempoPorNivel - tiempoRestante;
    
    try {
        await guardarResultadoNivel(
            nivelesConfigurados[nivelActual], 
            aciertos, 
            errores, 
            tiempoUsado
        );
        
        if (completado) {
            if (nivelActual < nivelesConfigurados.length - 1) {
                // Pasar al siguiente nivel
                nivelActual++;
                iniciarNivel(nivelesConfigurados[nivelActual]);
            } else {
                // Todos los niveles completados
                alert("¡Felicidades! Has completado todos los niveles.");
                window.location.href = "/Views/rankingFinal/rankingFinal.html";
            }
        } else {
            const confirmacion = confirm("¿Estás seguro de que quieres finalizar el juego?");
            if (confirmacion) {
                window.location.href = "/Views/rankingFinal/rankingFinal.html";
            } else {
                // Reanudar el juego
                temporizador = setInterval(actualizarTemporizador, 1000);
            }
        }
    } catch (error) {
        console.error("Error al finalizar nivel:", error);
        alert("Ocurrió un error al guardar tus resultados. Inténtalo de nuevo.");
    }
}

// Funciones auxiliares
function formatearTiempo(segundos) {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function actualizarTemporizador() {
    tiempoRestante--;
    document.getElementById('tiempo').textContent = formatearTiempo(tiempoRestante);
    
    if (tiempoRestante <= 0) {
        clearInterval(temporizador);
        alert("¡Tiempo terminado!");
        finalizarNivel(false);
    }
}

function voltearCarta() {
    if (bloqueado || tiempoRestante <= 0) return;
    if (this.classList.contains('flip')) return;
    if (cartasVolteadas.length >= 2) return;
    
    this.classList.add('flip');
    cartasVolteadas.push(this);
    
    if (cartasVolteadas.length === 2) {
        verificarPareja();
    }
}

function verificarPareja() {
    bloqueado = true;
    
    const [carta1, carta2] = cartasVolteadas;
    
    if (carta1.dataset.carta === carta2.dataset.carta) {
        aciertos++;
        cartasVolteadas = [];
        bloqueado = false;
        
        if (document.querySelectorAll('.carta.flip').length === cartas.length) {
            setTimeout(() => finalizarNivel(true), 500);
        }
    } else {
        errores++;
        document.getElementById('contador-errores').textContent = errores;
        
        setTimeout(() => {
            carta1.classList.remove('flip');
            carta2.classList.remove('flip');
            cartasVolteadas = [];
            bloqueado = false;
        }, 1000);
    }
}

// Iniciar el juego
inicializarJuego();