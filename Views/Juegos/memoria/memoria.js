const contenedor = document.getElementById('memoriaFrame');

// 1. Configuración de niveles con rutas absolutas desde la raíz
const niveles = {
    1: {
        nombre: "Nivel 1",
        cartas: ["leon.png", "mono.png", "serpiente.png"],
        columnas: 3,
        tiempo: 60,
        rutaImagenes: "/services/img-memoria/niveluno-img/"
    },
    2: {
        nombre: "Nivel 2",
        cartas: ["cangrejo.png", "delfin.png", "pez.png", "pulpo.png"],
        columnas: 4,
        tiempo: 90,
        rutaImagenes: "/services/img-memoria/niveldos-img/"
    },
    3: {
        nombre: "Nivel 3",
        cartas: ["arcoiris.png", "caracol.png", "gusano.png", "hoja.png", "mariposa.png", "mariquita.png"],
        columnas: 4,
        tiempo: 120,
        rutaImagenes: "/services/img-memoria/niveltres-img/"
        
    },
    4: {
        nombre: "Nivel 4",
        cartas: ["burro.png", "caballo.png", "gallina.png", "jimina.png", "kook.png", "oveja.png", "perro.png", "porqui.png", "vaca.png"],
        columnas: 5,
        tiempo: 150,
        rutaImagenes: "/services/img-memoria/nivelcuatro-img/"
    },
    5: {
        nombre: "Nivel 5",
        cartas: ["armadillo.png", "buho.png", "conejo.png", "hobi.png", "hongo.png", "lobo.png", "reno.png", "tae.png", "zorrillo.png", "zorro.png"],
        columnas: 5,
        tiempo: 180,
        rutaImagenes: "/services/img-memoria/nivelcinco-img/"
    }
};

// Variables del juego
let cartas = [];
let cartasVolteadas = [];
let errores = 0;
let bloqueado = false;
let tiempoRestante = 0;
let temporizador;
let nivelActual = 1;

// 2. Función para mezclar cartas
function mezclarCartas(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// 3. Función para crear cartas
async function crearCartas(config) {
    const gridCartas = document.createElement('div');
    gridCartas.className = 'grid-cartas';
    gridCartas.style.gridTemplateColumns = `repeat(${config.columnas}, 1fr)`;

    // Verificar rutas en consola
    console.log(`Cargando imágenes desde: ${config.rutaImagenes}`);
    
    for (const carta of cartas) {
        const cartaElement = document.createElement('div');
        cartaElement.className = 'carta';
        cartaElement.dataset.carta = carta;

        const frente = document.createElement('div');
        frente.className = 'frente';
        
        const img = document.createElement('img');
        img.src = config.rutaImagenes + carta;
        img.alt = carta.split('.')[0];
        
        // Manejo de error para imágenes
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

// 4. Función para crear la interfaz completa
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
    const btnFinalizar = document.createElement('button');
    btnFinalizar.className = 'btn-finalizar';
    btnFinalizar.textContent = "Finalizar";
    btnFinalizar.addEventListener('click', () => {
        clearInterval(temporizador);
        alert("Juego finalizado");
    });
    juegoContainer.appendChild(btnFinalizar);

    return juegoContainer;
}

// 5. Funciones auxiliares
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
    }
}

function voltearCarta() {
    if (bloqueado) return;
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
        cartasVolteadas = [];
        bloqueado = false;
        
        // Verificar si se completó el nivel
        if (document.querySelectorAll('.carta.flip').length === cartas.length) {
            setTimeout(() => {
                if (nivelActual < 5) {
                    nivelActual++;
                    iniciarNivel(nivelActual);
                } else {
                    alert("¡Felicidades! Has completado todos los niveles.");
                }
            }, 500);
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

// 6. Función para iniciar nivel
async function iniciarNivel(nivel) {
    clearInterval(temporizador);
    contenedor.innerHTML = '';
    
    const config = niveles[nivel];
    cartas = mezclarCartas([...config.cartas, ...config.cartas]);
    tiempoRestante = config.tiempo;
    errores = 0;
    cartasVolteadas = [];
    bloqueado = false;
    
    const interfaz = await crearInterfaz(config);
    contenedor.appendChild(interfaz);
    
    temporizador = setInterval(actualizarTemporizador, 1000);
}

// Iniciar el juego
iniciarNivel(1);