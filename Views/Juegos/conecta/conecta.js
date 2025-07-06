document.addEventListener('DOMContentLoaded', () => {
    // Configuración base de niveles
    const nivelesBase = {
        1: {
            nombre: "Nivel 1",
            imagenes: ['arbol.png', 'ballenapurple.png', 'midrofonobs.png'],
            rutaImagenes: "/services/img-conecta/nivel1-img/"
        },
        2: {
            nombre: "Nivel 2",
            imagenes: ['chimmys.png', 'chocolate.png', 'libro.png', 'Ponyboy.png'],
            rutaImagenes: "/services/img-conecta/nivel2-img/"
        },
        3: {
            nombre: "Nivel 3",
            imagenes: ['Hollyss.png', 'JInn.png', 'Mickey.png', 'namu.png', 'Tanyy.png'],
            rutaImagenes: "/services/img-conecta/nivel3-img/"
        },
        4: {
            nombre: "Nivel 4",
            imagenes: ['guitarrayonngo.png', 'hobiStraw.png', 'masetapl.png', 'pezzidos.png', 'pezzi.png', 'plantatress.png'],
            rutaImagenes: "/services/img-conecta/nivel4-img/"
        },
        5: {
            nombre: "Nivel 5",
            imagenes: ['Chimmy.png', 'Chocky.png', 'Kook.png', 'koya.png', 'mangg.png', 'RJ.png', 'tata.png'],
            rutaImagenes: "/services/img-conecta/nivel5-img/"
        }
    };

    // Variables del juego
    let estado = {
        nivelActual: 0,
        tiempoRestante: 0,
        temporizador: null,
        errores: 0,
        seleccionInicial: null,
        conexiones: [],
        paresCompletados: 0,
        dibujandoLinea: false,
        lineaTemporal: null,
        nivelesConfigurados: [],
        tiempoPorNivel: 60,
        dificultad: 'medio',
        columnasPorNivel: 4,
        alumnoActual: null,
        partidaActual: null
    };

    // Elementos del DOM
    const elementos = {
        nivelActual: document.getElementById('nivel-actual'),
        tiempo: document.getElementById('tiempo'),
        errores: document.getElementById('errores'),
        botonFinalizar: document.getElementById('finalizar'),
        columnaImagenes: document.getElementById('columna-imagenes'),
        columnaDestinos: document.getElementById('columna-destinos'),
        contenedorConexiones: document.getElementById('conexiones'),
        areaJuego: document.querySelector('.area-juego')
    };

    // Función para obtener configuración de la partida
    async function obtenerConfiguracionPartida() {
        try {
            const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
            const alumnoActual = JSON.parse(localStorage.getItem('alumnoActual'));
            
            if (!partidaActual?.id || !alumnoActual?.id) {
                throw new Error('No se encontró información de partida o alumno en localStorage');
            }

            // Validar que la partida está configurada correctamente
            const validacionResponse = await fetch(`https://cartasbackend.onrender.com/api/validar-partida/${partidaActual.id}`);
            const validacionData = await validacionResponse.json();

            if (!validacionResponse.ok || !validacionData.valida) {
                throw new Error(validacionData.error || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            }

            // Obtener configuración completa
            const response = await fetch(`https://cartasbackend.onrender.com/api/partida/${partidaActual.id}`);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            }

            const data = await response.json();
            
            // Validar que tiene configuración completa
            if (!data.configurada || !data.niveles || data.niveles.length === 0 || !data.dificultad) {
                throw new Error('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            }

            // Estructurar configuración final
            return {
                niveles: data.niveles,
                dificultad: data.dificultad,
                tiempoPorNivel: data.tiempoPorNivel,
                alumnoActual: alumnoActual,
                partidaActual: partidaActual
            };

        } catch (error) {
            console.error('Error crítico al obtener configuración:', error);
            alert(error.message || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            window.location.href = "../entradaAlumno/entradaAlumno.html";
            throw error;
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

    // Función principal para inicializar el juego
    async function inicializarJuego() {
        try {
            // Obtener configuración del profesor
            const config = await obtenerConfiguracionPartida();
            
            // Aplicar configuración a variables globales
            estado.nivelesConfigurados = config.niveles;
            estado.tiempoPorNivel = config.tiempoPorNivel;
            estado.columnasPorNivel = mapearDificultad(config.dificultad);
            estado.dificultad = config.dificultad;
            estado.alumnoActual = config.alumnoActual;
            estado.partidaActual = config.partidaActual;

            // Verificar que tenemos al menos un nivel
            if (estado.nivelesConfigurados.length === 0) {
                throw new Error('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            }

            // Iniciar primer nivel
            estado.nivelActual = 0;
            await iniciarNivel(estado.nivelesConfigurados[estado.nivelActual]);

        } catch (error) {
            console.error('Error crítico al inicializar juego:', error);
            alert('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            window.location.href = "../entradaAlumno/entradaAlumno.html";
        }
    }

    // Función para iniciar un nivel específico
    async function iniciarNivel(numeroNivel) {
        clearInterval(estado.temporizador);
        elementos.columnaImagenes.innerHTML = '';
        elementos.columnaDestinos.innerHTML = '';
        elementos.contenedorConexiones.innerHTML = '';
        
        // Obtener configuración base del nivel
        const configBase = nivelesBase[numeroNivel];
        if (!configBase) {
            console.error('Configuración no encontrada para el nivel:', numeroNivel);
            return;
        }

        // Reiniciar estado del nivel
        estado.conexiones = [];
        estado.paresCompletados = 0;
        estado.seleccionInicial = null;
        estado.errores = 0;
        estado.tiempoRestante = estado.tiempoPorNivel;
        
        // Actualizar UI
        actualizarUI();
        
        // Mezclar imágenes para el nivel
        const imagenesBarajadas = barajarArray([...configBase.imagenes]);
        const destinosBarajados = barajarArray([...configBase.imagenes]);

        // Crear elementos de imágenes y destinos
        imagenesBarajadas.forEach((imagen, index) => {
            crearElementoImagen(imagen, index, numeroNivel, elementos.columnaImagenes, configBase.rutaImagenes);
        });

        destinosBarajados.forEach((imagen, index) => {
            crearElementoDestino(imagen, index, numeroNivel, elementos.columnaDestinos, configBase.rutaImagenes);
        });

        // Iniciar temporizador
        estado.temporizador = setInterval(actualizarTemporizador, 1000);
    }

    // Función para crear elemento de imagen (origen)
    function crearElementoImagen(imagen, index, nivel, contenedor, rutaBase) {
        const elementoImagen = document.createElement('div');
        elementoImagen.className = 'imagen-conecta';
        elementoImagen.dataset.imagen = imagen;
        elementoImagen.dataset.indice = index;
        elementoImagen.dataset.tipo = 'origen';
        
        const img = document.createElement('img');
        img.src = `${rutaBase}${imagen}`;
        img.alt = `Imagen ${index + 1}`;
        
        elementoImagen.appendChild(img);
        
        elementoImagen.addEventListener('mousedown', iniciarDibujoLinea);
        elementoImagen.addEventListener('mouseup', finalizarDibujoLinea);
        
        contenedor.appendChild(elementoImagen);
    }

    // Función para crear elemento de destino
    function crearElementoDestino(imagen, index, nivel, contenedor, rutaBase) {
        const elementoDestino = document.createElement('div');
        elementoDestino.className = 'destino-conecta';
        elementoDestino.dataset.imagen = imagen;
        elementoDestino.dataset.indice = index;
        elementoDestino.dataset.tipo = 'destino';
        
        const img = document.createElement('img');
        img.src = `${rutaBase}${imagen}`;
        img.alt = `Destino ${index + 1}`;
        
        elementoDestino.appendChild(img);
        
        elementoDestino.addEventListener('mouseup', finalizarDibujoLinea);
        
        contenedor.appendChild(elementoDestino);
    }

    // Función para barajar un array
    function barajarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Función para iniciar el dibujo de una línea
    function iniciarDibujoLinea(e) {
        if (estado.dibujandoLinea) return;
        
        estado.dibujandoLinea = true;
        estado.seleccionInicial = e.currentTarget;
        estado.seleccionInicial.classList.add('seleccionado');
        
        estado.lineaTemporal = document.createElement('div');
        estado.lineaTemporal.className = 'conexion-temporal';
        elementos.contenedorConexiones.appendChild(estado.lineaTemporal);
        
        elementos.areaJuego.addEventListener('mousemove', actualizarLineaTemporal);
    }

    // Función para actualizar la línea temporal mientras se dibuja
    function actualizarLineaTemporal(e) {
        if (!estado.dibujandoLinea || !estado.seleccionInicial) return;
        
        const rectInicial = estado.seleccionInicial.getBoundingClientRect();
        const x1 = rectInicial.right - elementos.contenedorConexiones.getBoundingClientRect().left;
        const y1 = rectInicial.top + rectInicial.height / 2 - elementos.contenedorConexiones.getBoundingClientRect().top;
        
        const x2 = e.clientX - elementos.contenedorConexiones.getBoundingClientRect().left;
        const y2 = e.clientY - elementos.contenedorConexiones.getBoundingClientRect().top;
        
        const longitud = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angulo = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        estado.lineaTemporal.style.width = `${longitud}px`;
        estado.lineaTemporal.style.left = `${x1}px`;
        estado.lineaTemporal.style.top = `${y1}px`;
        estado.lineaTemporal.style.transform = `rotate(${angulo}deg)`;
    }

    // Función para finalizar el dibujo de una línea
    function finalizarDibujoLinea(e) {
        if (!estado.dibujandoLinea || !estado.seleccionInicial) return;
        
        elementos.areaJuego.removeEventListener('mousemove', actualizarLineaTemporal);
        
        if (estado.lineaTemporal) {
            elementos.contenedorConexiones.removeChild(estado.lineaTemporal);
            estado.lineaTemporal = null;
        }
        
        const elementoFinal = e.currentTarget;
        
        if (estado.seleccionInicial.dataset.tipo === 'origen' && 
            elementoFinal.dataset.tipo === 'destino' &&
            estado.seleccionInicial.dataset.imagen === elementoFinal.dataset.imagen) {
            
            dibujarConexion(estado.seleccionInicial, elementoFinal);
            
            estado.seleccionInicial.classList.add('conectado');
            elementoFinal.classList.add('correcto');
            
            estado.seleccionInicial.style.pointerEvents = 'none';
            elementoFinal.style.pointerEvents = 'none';
            
            estado.paresCompletados++;
            
            if (estado.paresCompletados === nivelesBase[estado.nivelesConfigurados[estado.nivelActual]].imagenes.length) {
                setTimeout(() => completarNivel(true), 1000);
            }
        } else if (estado.seleccionInicial !== elementoFinal) {
            estado.errores++;
            elementos.errores.textContent = estado.errores;
            
            // Efecto de error
            if (elementoFinal.dataset.tipo === 'destino') {
                elementoFinal.classList.add('error-temporario');
                setTimeout(() => {
                    elementoFinal.classList.remove('error-temporario');
                }, 500);
            }
        }
        
        estado.seleccionInicial.classList.remove('seleccionado');
        estado.seleccionInicial = null;
        estado.dibujandoLinea = false;
    }

    // Función para dibujar una conexión permanente
    function dibujarConexion(origen, destino) {
        const rectOrigen = origen.getBoundingClientRect();
        const rectDestino = destino.getBoundingClientRect();
        const rectContenedor = elementos.contenedorConexiones.getBoundingClientRect();
        
        const x1 = rectOrigen.right - rectContenedor.left;
        const y1 = rectOrigen.top + rectOrigen.height / 2 - rectContenedor.top;
        
        const x2 = rectDestino.left - rectContenedor.left;
        const y2 = rectDestino.top + rectDestino.height / 2 - rectContenedor.top;
        
        const dx = x2 - x1;
        const dy = y2 - y1;
        const longitud = Math.sqrt(dx * dx + dy * dy);
        const angulo = Math.atan2(dy, dx) * 180 / Math.PI;
     
        const conexion = document.createElement('div');
        conexion.className = 'conexion';
        conexion.style.width = `${longitud}px`;
        conexion.style.left = `${x1}px`;
        conexion.style.top = `${y1}px`;
        conexion.style.transform = `rotate(${angulo}deg)`;
        conexion.style.transformOrigin = '0 0';
       
        elementos.contenedorConexiones.appendChild(conexion);
        estado.conexiones.push(conexion);
    }

    // Función para actualizar el temporizador
    function actualizarTemporizador() {
        estado.tiempoRestante--;
        const minutos = Math.floor(estado.tiempoRestante / 60);
        const segundos = estado.tiempoRestante % 60;
        elementos.tiempo.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        if (estado.tiempoRestante <= 0) {
            clearInterval(estado.temporizador);
            completarNivel(false);
        }
    }

    // Función para actualizar la UI
    function actualizarUI() {
        elementos.nivelActual.textContent = estado.nivelesConfigurados[estado.nivelActual];
        elementos.errores.textContent = estado.errores;
    }

    // Función para guardar resultados en la base de datos
async function guardarResultadoNivel(completado) {
    const tiempoUsado = estado.tiempoPorNivel - estado.tiempoRestante;
    
    try {
        // Verificar que tenemos los datos necesarios
        if (!estado.partidaActual?.id || !estado.alumnoActual?.id) {
            throw new Error('Datos de partida o alumno incompletos');
        }

        const response = await fetch('https://cartasbackend.onrender.com/api/guardar-resultado-conecta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario: estado.alumnoActual.id,
                nombre: estado.alumnoActual.nombre,
                avatar: estado.alumnoActual.avatar || 'default.png',
                id_partida: estado.partidaActual.id, // Asegurar que se envía el ID de partida
                nivel: estado.nivelesConfigurados[estado.nivelActual],
                aciertos: estado.paresCompletados,
                errores: estado.errores,
                tiempo_usado: tiempoUsado,
                dificultad: estado.dificultad,
                puntaje: calcularPuntaje(estado.paresCompletados, estado.errores, tiempoUsado)
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error al guardar resultados');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al guardar resultados:', error);
        throw error;
    }
}

function calcularPuntaje(aciertos, errores, tiempoUsado) {
    // Fórmula de puntuación: (aciertos * 10) - (errores * 2) - (tiempoUsado / 10)
    return Math.max(0, (aciertos * 10) - (errores * 2) - Math.floor(tiempoUsado / 10));
}

    // Función para completar un nivel
    async function completarNivel(exitoso) {
        clearInterval(estado.temporizador);
        
        try {
            await guardarResultadoNivel(exitoso);
            
            if (exitoso) {
                if (estado.nivelActual < estado.nivelesConfigurados.length - 1) {
                    // Pasar al siguiente nivel
                    estado.nivelActual++;
                    setTimeout(() => {
                        alert(`¡Nivel ${estado.nivelesConfigurados[estado.nivelActual - 1]} completado! Pasando al nivel ${estado.nivelesConfigurados[estado.nivelActual]}`);
                        iniciarNivel(estado.nivelesConfigurados[estado.nivelActual]);
                    }, 500);
                } else {
                    // Todos los niveles completados
                    alert('¡Felicidades! Has completado todos los niveles del juego.');
                    window.location.href = "/Views/rankingFinal/rankingFinal.html";
                }
            } else {
                alert(`¡Tiempo agotado! Has llegado al nivel ${estado.nivelesConfigurados[estado.nivelActual]}`);
                window.location.href = "/Views/rankingFinal/rankingFinal.html";
            }
        } catch (error) {
            console.error("Error al finalizar nivel:", error);
            alert("Ocurrió un error al guardar tus resultados. Inténtalo de nuevo.");
        }
    }

    // Evento para el botón de finalizar
    elementos.botonFinalizar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres finalizar el juego?')) {
            clearInterval(estado.temporizador);
            completarNivel(false);
        }
    });

    // Iniciar el juego
    inicializarJuego();
});