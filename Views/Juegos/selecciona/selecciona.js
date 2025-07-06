document.addEventListener('DOMContentLoaded', () => {
    // Configuración base de niveles
    const nivelesBase = {
        1: {
            name: "Nivel 1",
            parts: [
                {
                    question: "¿Cuál es un mono?",
                    options: [
                        { image: "../../../services/img-selecciona/niveluno/parte-1/mono.png", correct: true },
                        { image: "../../../services/img-selecciona/niveluno/parte-1/leon.png", correct: false }
                    ]
                },
                {
                    question: "¿Cuál es una serpiente?",
                    options: [
                        { image: "../../../services/img-selecciona/niveluno/parte-2/serpiente.png", correct: true },
                        { image: "../../../services/img-selecciona/niveluno/parte-2/oso.png", correct: false },
                        { image: "../../../services/img-selecciona/niveluno/parte-2/zorro.png", correct: false }
                    ]
                }
            ]
        },
        2: {
            name: "Nivel 2",
            parts: [
                {
                    question: "¿Cuál es una zorrillo?",
                    options: [
                        { image: "../../../services/img-selecciona/niveldos/parte-1/zorrillo.png", correct: true },
                        { image: "../../../services/img-selecciona/niveldos/parte-1/ardilla.png", correct: false },
                        { image: "../../../services/img-selecciona/niveldos/parte-1/lobo.png", correct: false },
                        { image: "../../../services/img-selecciona/niveldos/parte-1/zorro.png", correct: false }
                    ]
                },
                {
                    question: "¿Cuál es un pez?",
                    options: [
                        { image: "../../../services/img-selecciona/niveldos/parte-2/pez.png", correct: true },
                        { image: "../../../services/img-selecciona/niveldos/parte-2/armadillo.png", correct: false },
                        { image: "../../../services/img-selecciona/niveldos/parte-2/buho.png", correct: false },
                        { image: "../../../services/img-selecciona/niveldos/parte-2/pulpo.png", correct: false }
                    ]
                }
            ]
        },
        3: {
            name: "Nivel 3",
            parts: [
                {
                    question: "¿Cuál es un cangrejo?",
                    options: [
                        { image: "../../../services/img-selecciona/niveltres/parte-1/cangrejo.png", correct: true },
                        { image: "../../../services/img-selecciona/niveltres/parte-1/delfin.png", correct: false },
                        { image: "../../../services/img-selecciona/niveltres/parte-1/jimina.png", correct: false },
                        { image: "../../../services/img-selecciona/niveltres/parte-1/mariquita.png", correct: false },
                        { image: "../../../services/img-selecciona/niveltres/parte-1/serpiente.png", correct: false }
                    ]
                },
                {
                    question: "¿Cuál es una mariquita?",
                    options: [
                        { image: "../../../services/img-selecciona/niveltres/parte-1/mariquita.png", correct: true },
                        { image: "../../../services/img-selecciona/niveltres/parte-2/arcoiris.png", correct: false },
                        { image: "../../../services/img-selecciona/niveltres/parte-2/burro.png", correct: false },
                        { image: "../../../services/img-selecciona/niveltres/parte-2/gusano.png", correct: false },
                        { image: "../../../services/img-selecciona/niveltres/parte-2/hoja.png", correct: false },
                        { image: "../../../services/img-selecciona/niveltres/parte-2/oveja.png", correct: false }
                    ]
                }
            ]
        },
        4: {
            name: "Nivel 4",
            parts: [
                {
                    question: "¿Cuál es un pulpo?",
                    options: [
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/pulpo.png", correct: true },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/ardilla.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/conejo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/gallina.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/leon.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/mono.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/perro.png", correct: false }
                    ]
                },
                {
                    question: "¿Cuál es una ardilla?",
                    options: [
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-1/ardilla.png", correct: true },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-2/armadillo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-2/buho.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-2/caracol.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-2/lobo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-2/oso.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-2/porqui.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcuatro/parte-2/reno.png", correct: false }
                    ]
                }
            ]
        },
        5: {
            name: "Nivel 5",
            parts: [
                {
                    question: "¿Cuál es un conejo?",
                    options: [
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/conejo.png", correct: true },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/ardilla.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/armadillo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/buho.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/burro.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/caballo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/caracol.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/mariposa.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/oveja.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/perro.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/reno.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-1/zorro.png", correct: false }
                    ]
                },
                {
                    question: "¿Cuál es un lobo?",
                    options: [
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/lobo.png", correct: true },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/ardilla.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/armadillo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/buho.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/cangrejo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/hongo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/mono.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/oso.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/oveja.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/perro.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/pez.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/reno.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/serpiente.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/vaca.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/zorrillo.png", correct: false },
                        { image: "../../../services/img-selecciona/nivelcinco/parte-2/zorro.png", correct: false }
                    ]
                }
            ]
        }
    };

    // Variables del juego
    let estado = {
        nivelActual: 0,
        parteActual: 0,
        errores: 0,
        aciertos: 0,
        tiempoRestante: 0,
        temporizador: null,
        seleccionActual: null,
        nivelesConfigurados: [],
        tiempoPorNivel: 60,
        dificultad: 'medio',
        alumnoActual: null,
        partidaActual: null
    };

    // Elementos del DOM
    const elementos = {
        pregunta: document.getElementById('question-text'),
        opcionesContainer: document.getElementById('options-container'),
        siguienteBoton: document.getElementById('next-button'),
        temporizador: document.querySelector('.timer'),
        contadorSelecciona: document.querySelector('.selecciona-count'),
        contadorErrores: document.querySelector('.errors'),
        nivelActual: document.getElementById('current-level')
    };

    // Función para mezclar un array (algoritmo Fisher-Yates)
    function barajarArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Función para obtener configuración de la partida
    async function obtenerConfiguracionPartida() {
        try {
            estado.partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
            estado.alumnoActual = JSON.parse(localStorage.getItem('alumnoActual'));
            
            if (!estado.partidaActual?.id || !estado.alumnoActual?.id) {
                throw new Error('No se encontró información de partida o alumno en localStorage');
            }

            // Validar que la partida está configurada correctamente
            const validacionResponse = await fetch(`https://cartasbackend.onrender.com/api/validar-partida/${estado.partidaActual.id}`);
            const validacionData = await validacionResponse.json();

            if (!validacionResponse.ok || !validacionData.valida) {
                throw new Error(validacionData.error || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            }

            // Obtener configuración completa
            const response = await fetch(`https://cartasbackend.onrender.com/api/partida/${estado.partidaActual.id}`);
            
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
                configurada: true
            };

        } catch (error) {
            console.error('Error crítico al obtener configuración:', error);
            alert(error.message || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            window.location.href = "../entradaAlumno/entradaAlumno.html";
            throw error;
        }
    }

    // Función principal para inicializar el juego
    async function inicializarJuego() {
        try {
            // Obtener configuración del profesor
            const config = await obtenerConfiguracionPartida();
            
            // Aplicar configuración a variables globales
            estado.nivelesConfigurados = config.niveles;
            estado.tiempoPorNivel = config.tiempoPorNivel;
            estado.dificultad = config.dificultad;

            // Verificar que tenemos al menos un nivel
            if (estado.nivelesConfigurados.length === 0) {
                throw new Error('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            }

            // Iniciar primer nivel
            estado.nivelActual = 0;
            cargarParteNivel(estado.nivelesConfigurados[estado.nivelActual], estado.parteActual);

        } catch (error) {
            console.error('Error crítico al inicializar juego:', error);
            alert('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            window.location.href = "../entradaAlumno/entradaAlumno.html";
        }
    }

    // Función para cargar una parte específica de un nivel
    function cargarParteNivel(nivel, parte) {
        const nivelData = nivelesBase[nivel];
        if (!nivelData) {
            alert('¡Nivel no encontrado!');
            return;
        }

        if (parte >= nivelData.parts.length) {
            // Parte completada, pasar al siguiente nivel
            if (estado.nivelActual < estado.nivelesConfigurados.length - 1) {
                estado.nivelActual++;
                estado.parteActual = 0;
                cargarParteNivel(estado.nivelesConfigurados[estado.nivelActual], estado.parteActual);
            } else {
                // Todos los niveles completados
                finalizarJuego(true);
            }
            return;
        }

        const parteData = nivelData.parts[parte];
        elementos.pregunta.textContent = parteData.question;
        elementos.opcionesContainer.innerHTML = '';
        estado.seleccionActual = null;

        // Configurar clase CSS según el nivel para el diseño de columnas
        elementos.opcionesContainer.className = 'options-container';
        elementos.opcionesContainer.classList.add(`level-${nivel}`);

        // Mostrar número de nivel actual
        elementos.nivelActual.textContent = nivel;

        // Mezclar las opciones antes de mostrarlas
        const opcionesBarajadas = barajarArray([...parteData.options]);
        
        // Crear opciones mezcladas
        opcionesBarajadas.forEach((opcion, index) => {
            const opcionElemento = document.createElement('div');
            opcionElemento.className = 'option';
            
            const imgElemento = document.createElement('img');
            imgElemento.src = opcion.image;
            imgElemento.alt = `Opción ${index + 1}`;
            
            opcionElemento.appendChild(imgElemento);
            opcionElemento.addEventListener('click', () => seleccionarOpcion(opcionElemento, opcion.correct));
            elementos.opcionesContainer.appendChild(opcionElemento);
        });

        // Actualizar contadores
        elementos.contadorSelecciona.textContent = `Selecciona #${parte + 1}`;
        elementos.contadorErrores.textContent = `Errores ${estado.errores}`;
        
        // Reiniciar estado del botón Siguiente
        elementos.siguienteBoton.disabled = true;
        
        // Iniciar temporizador
        iniciarTemporizador();
    }

    // Función para manejar selección de opción
    function seleccionarOpcion(opcionElemento, esCorrecta) {
        if (estado.seleccionActual !== null) return;
        
        estado.seleccionActual = opcionElemento;
        opcionElemento.classList.add('selected');

        if (esCorrecta) {
            opcionElemento.classList.add('correct');
            estado.aciertos++;
            elementos.siguienteBoton.disabled = false;
        } else {
            opcionElemento.classList.add('incorrect');
            estado.errores++;
            elementos.contadorErrores.textContent = `Errores ${estado.errores}`;
            
            // Mostrar la opción correcta
            const opciones = elementos.opcionesContainer.querySelectorAll('.option');
            opciones.forEach(opt => {
                const imgSrc = opt.querySelector('img').src;
                const opcionCorrecta = nivelesBase[estado.nivelesConfigurados[estado.nivelActual]].parts[estado.parteActual].options.find(o => o.correct);
                if (opt !== opcionElemento && imgSrc.includes(opcionCorrecta.image)) {
                    opt.classList.add('correct');
                }
            });
            
            elementos.siguienteBoton.disabled = false;
        }
    }

    // Función para pasar a la siguiente parte
    function siguienteParte() {
        estado.parteActual++;
        cargarParteNivel(estado.nivelesConfigurados[estado.nivelActual], estado.parteActual);
    }

    // Temporizador
    function iniciarTemporizador() {
        clearInterval(estado.temporizador);
        estado.tiempoRestante = estado.tiempoPorNivel;
        actualizarTemporizador();
        
        estado.temporizador = setInterval(() => {
            estado.tiempoRestante--;
            actualizarTemporizador();

            if (estado.tiempoRestante <= 0) {
                clearInterval(estado.temporizador);
                siguienteParte();
            }
        }, 1000);
    }

    function actualizarTemporizador() {
        const minutos = Math.floor(estado.tiempoRestante / 60);
        const segundos = estado.tiempoRestante % 60;
        elementos.temporizador.textContent = `${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
    }

    // Función para guardar resultados en la base de datos
async function guardarResultadoNivel(completado) {
    const tiempoUsado = estado.tiempoPorNivel - estado.tiempoRestante;
    
    try {
        // Verificar que tenemos los datos necesarios
        if (!estado.partidaActual?.id || !estado.alumnoActual?.id) {
            throw new Error('Datos de partida o alumno incompletos');
        }

        const response = await fetch('https://cartasbackend.onrender.com/api/guardar-resultado-selecciona', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario: estado.alumnoActual.id,
                nombre: estado.alumnoActual.nombre,
                avatar: estado.alumnoActual.avatar || 'default.png',
                id_partida: estado.partidaActual.id, // Asegurar que se envía el ID de partida
                nivel: estado.nivelesConfigurados[estado.nivelActual],
                aciertos: estado.aciertos,
                errores: estado.errores,
                tiempo_usado: tiempoUsado,
                dificultad: estado.dificultad,
                puntaje: calcularPuntaje(estado.aciertos, estado.errores, tiempoUsado)
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
    // Función para finalizar el juego
    async function finalizarJuego(completado) {
        clearInterval(estado.temporizador);
        
        try {
            await guardarResultadoNivel(completado);
            
            if (completado) {
                alert('¡Felicidades! Has completado todos los niveles del juego.');
            } else {
                alert(`Juego finalizado. Alcanzaste el nivel ${estado.nivelesConfigurados[estado.nivelActual]}`);
            }
            
            window.location.href = "/Views/rankingFinal/rankingFinal.html";
        } catch (error) {
            console.error("Error al finalizar juego:", error);
            alert("Ocurrió un error al guardar tus resultados. Inténtalo de nuevo.");
        }
    }

    // Evento para el botón Siguiente
    elementos.siguienteBoton.addEventListener('click', siguienteParte);

    // Iniciar el juego
    inicializarJuego();
});