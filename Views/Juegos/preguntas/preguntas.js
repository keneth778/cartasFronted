document.addEventListener('DOMContentLoaded', () => {
    // Configuración base de niveles
    const nivelesBase = {
        1: {
            nombre: "Nivel 1",
            image: "../../../services/img-pregunta/nivel1/vaca.png",
            questions: [
                {
                    question: "¿Qué come la vaca?",
                    options: [
                        { text: "Heno", correct: true },
                        { text: "Pescado", correct: false }
                    ]
                },
                {
                    question: "¿Qué nos da la vaca?",
                    options: [
                        { text: "Leche", correct: true },
                        { text: "Huevos", correct: false }
                    ]
                }
            ]
        },
        2: {
            nombre: "Nivel 2",
            image: "../../../services/img-pregunta/nivel2/leon.png",
            questions: [
                {
                    question: "¿Dónde vive el león?",
                    options: [
                        { text: "Sabana", correct: true },
                        { text: "Norte", correct: false }
                    ]
                },
                {
                    question: "¿Quién tiene melena?",
                    options: [
                        { text: "León", correct: true },
                        { text: "Leona", correct: false }
                    ]
                },
                {
                    question: "¿Qué es el león?",
                    options: [
                        { text: "Carnívoro", correct: true },
                        { text: "Herbívoro", correct: false }
                    ]
                }
            ]
        },
        3: {
            nombre: "Nivel 3",
            image: "../../../services/img-pregunta/nivel3/delfin.png",
            questions: [
                {
                    question: "¿Dónde vive la ballena?",
                    options: [
                        { text: "En el mar", correct: true },
                        { text: "En el río", correct: false }
                    ]
                },
                {
                    question: "¿Cómo respira la ballena?",
                    options: [
                        { text: "Por pulmones", correct: true },
                        { text: "Por branquias", correct: false }
                    ]
                },
                {
                    question: "¿La ballena es un pez?",
                    options: [
                        { text: "No", correct: true },
                        { text: "Sí", correct: false }
                    ]
                }
            ]
        },
        4: {
            nombre: "Nivel 4",
            image: "../../../services/img-pregunta/nivel4/gusano.png",
            questions: [
                {
                    question: "¿Los gusanos tienen patas?",
                    options: [
                        { text: "No", correct: true },
                        { text: "Sí", correct: false }
                    ]
                },
                {
                    question: "¿Dónde viven los gusanos?",
                    options: [
                        { text: "En la tierra", correct: true },
                        { text: "En el agua", correct: false }
                    ]
                },
                {
                    question: "¿El gusano es blando o duro?",
                    options: [
                        { text: "Blando", correct: true },
                        { text: "Duro", correct: false }
                    ]
                },
                {
                    question: "¿Los gusanos tienen ojos?",
                    options: [
                        { text: "No", correct: true },
                        { text: "Sí", correct: false }
                    ]
                }
            ]
        },
        5: {
            nombre: "Nivel 5",
            image: "../../../services/img-pregunta/nivel5/reno.png",
            questions: [
                {
                    question: "¿Qué tienen los venados en la cabeza?",
                    options: [
                        { text: "Cuernos", correct: true },
                        { text: "Alas", correct: false }
                    ]
                },
                {
                    question: "¿Dónde viven los venados?",
                    options: [
                        { text: "Bosque", correct: true },
                        { text: "Océano", correct: false }
                    ]
                },
                {
                    question: "¿Qué comen los venados?",
                    options: [
                        { text: "Plantas", correct: true },
                        { text: "Carne", correct: false }
                    ]
                },
                {
                    question: "¿El venado es salvaje?",
                    options: [
                        { text: "Sí", correct: true },
                        { text: "No", correct: false }
                    ]
                },
                {
                    question: "¿Los venados son lentos o rápidos?",
                    options: [
                        { text: "Rápidos", correct: true },
                        { text: "Lentos", correct: false }
                    ]
                }
            ]
        }
    };

    // Variables del juego
    let nivelActual = 0;
    let nivelesConfigurados = [];
    let tiempoPorNivel = 60;
    let tiempoRestante = 0;
    let temporizador;
    let errores = 0;
    let aciertos = 0;
    let selectedOptions = {};
    let juegoTerminado = false;

    // Elementos del DOM
    const contenedor = document.querySelector('.game-container');
    const animalImage = document.createElement('img');
    animalImage.id = 'animal-image';
    const finalizarButton = document.createElement('button');
    finalizarButton.id = 'finalizar-button';
    finalizarButton.textContent = "Finalizar";
    const timerElement = document.createElement('div');
    timerElement.id = 'timer';
    const errorCountElement = document.createElement('div');
    errorCountElement.id = 'error-count';
    const questionsContainer = document.createElement('div');
    questionsContainer.id = 'questions-container';
    const currentLevelElement = document.createElement('div');
    currentLevelElement.id = 'current-level';

    // Función para mezclar opciones
    function shuffleArray(array) {
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
            const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
            if (!partidaActual?.id) {
                throw new Error('No se encontró información de partida en localStorage');
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
            alert(error.message || 'No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            throw error;
        }
    }

    // Función para inicializar el juego
    async function inicializarJuego() {
        console.log('Inicializando juego de preguntas...');
        
        try {
            // Obtener configuración del profesor
            const config = await obtenerConfiguracionPartida();
            console.log('Configuración obtenida:', config);

            // Validar y aplicar configuración
            if (!config.niveles || config.niveles.length === 0) {
                throw new Error('No hay niveles configurados');
            }

            // Aplicar configuración a variables globales
            nivelesConfigurados = config.niveles;
            tiempoPorNivel = config.tiempoPorNivel || 60;

            console.log('Configuración aplicada:', {
                niveles: nivelesConfigurados,
                tiempoPorNivel,
                dificultad: config.dificultad
            });

            // Iniciar primer nivel
            nivelActual = 0;
            iniciarNivel(nivelesConfigurados[nivelActual]);

        } catch (error) {
            console.error('Error crítico al inicializar juego:', error);
            alert('No se pudo cargar la configuración del profesor. No se puede iniciar el juego.');
            window.location.href = "../entradaAlumno/entradaAlumno.html";
        }
    }

    // Función para iniciar un nivel específico
    function iniciarNivel(numeroNivel) {
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
            tiempo: tiempoPorNivel
        };

        // Reiniciar variables del nivel
        tiempoRestante = configFinal.tiempo;
        errores = 0;
        aciertos = 0;
        selectedOptions = {};
        juegoTerminado = false;
        
        // Crear interfaz
        const interfaz = crearInterfaz(configFinal);
        contenedor.appendChild(interfaz);
        
        // Iniciar temporizador
        temporizador = setInterval(actualizarTemporizador, 1000);
    }

    // Función para crear la interfaz del juego
    function crearInterfaz(config) {
        const juegoContainer = document.createElement('div');
        juegoContainer.className = 'juego-container';

        // Header
        const header = document.createElement('div');
        header.className = 'header';
        header.innerHTML = `
            <img src="/services/img/logo.png" class="logo">
            <h1 class="titulo-juego">UP THE QUESTIONS</h1>
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
            <h2 class="titulo-preguntas">PREGUNTAS - ${config.nombre}</h2>
            <div class="info-circulo">
                <span>Errores</span>
                <div class="valor" id="contador-errores">0</div>
            </div>
        `;
        juegoContainer.appendChild(infoSection);

        // Imagen del animal
        animalImage.src = config.image;
        animalImage.alt = `Imagen de ${config.nombre}`;
        animalImage.onerror = function() {
            this.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="%2380B7D5"/><text x="50" y="55" font-family="Arial" font-size="10" text-anchor="middle" fill="%23fff">Imagen no disponible</text></svg>';
        };
        juegoContainer.appendChild(animalImage);

        // Contenedor de preguntas
        questionsContainer.innerHTML = '';
        
        // Mezclar preguntas para este nivel
        const preguntasMezcladas = shuffleArray(config.questions);
        
        preguntasMezcladas.forEach((q, qIndex) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = q.question;
            questionItem.appendChild(questionText);
            
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
            // Mezclar opciones
            const shuffledOptions = shuffleArray(q.options);
            
            shuffledOptions.forEach((option, oIndex) => {
                const optionContainer = document.createElement('div');
                optionContainer.className = 'option-container';
                
                const optionElement = document.createElement('div');
                optionElement.className = 'option';
                optionElement.textContent = option.text;
                if (option.correct) {
                    optionElement.dataset.correct = 'true';
                }
                
                optionElement.addEventListener('click', () => {
                    seleccionarOpcion(optionElement, option.correct, qIndex);
                });
                
                optionContainer.appendChild(optionElement);
                optionsContainer.appendChild(optionContainer);
            });
            
            questionItem.appendChild(optionsContainer);
            questionsContainer.appendChild(questionItem);
        });
        
        juegoContainer.appendChild(questionsContainer);

        // Botón Finalizar
        finalizarButton.className = 'btn-finalizar';
        finalizarButton.addEventListener('click', () => finalizarNivel(false));
        juegoContainer.appendChild(finalizarButton);

        return juegoContainer;
    }

    // Función para seleccionar una opción
    function seleccionarOpcion(optionElement, isCorrect, questionIndex) {
        if (juegoTerminado || selectedOptions[questionIndex] !== undefined) return;
        
        const questionItem = questionsContainer.querySelectorAll('.question-item')[questionIndex];
        
        // Eliminar mensajes anteriores
        const existingMessages = questionItem.querySelectorAll('.attempt-message');
        existingMessages.forEach(msg => msg.remove());
        
        selectedOptions[questionIndex] = true;
        
        if (isCorrect) {
            optionElement.classList.add('correct');
            aciertos++;
        } else {
            optionElement.classList.add('incorrect');
            errores++;
            document.getElementById('contador-errores').textContent = errores;
            
            // Mostrar mensaje de error
            const attemptMessage = document.createElement('div');
            attemptMessage.className = 'attempt-message';
            attemptMessage.textContent = 'Inténtalo de nuevo';
            optionElement.parentNode.appendChild(attemptMessage);
            
            // Mostrar la respuesta correcta
            const options = questionItem.querySelectorAll('.option');
            options.forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                }
            });
        }
        
        // Verificar si todas las preguntas han sido respondidas
        const totalPreguntas = questionsContainer.querySelectorAll('.question-item').length;
        if (Object.keys(selectedOptions).length === totalPreguntas) {
            finalizarNivel(true);
        }
    }

    // Función para actualizar el temporizador
    function actualizarTemporizador() {
        tiempoRestante--;
        document.getElementById('tiempo').textContent = formatearTiempo(tiempoRestante);
        
        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            finalizarNivel(false);
        }
    }

    // Función para formatear el tiempo
    function formatearTiempo(segundos) {
        const mins = Math.floor(segundos / 60);
        const secs = segundos % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Función para guardar resultados
async function guardarResultadoNivel(nivel, aciertos, errores, tiempoUsado) {
    try {
        const alumnoActual = JSON.parse(localStorage.getItem('alumnoActual'));
        const partidaActual = JSON.parse(localStorage.getItem('partidaActual'));
        
        if (!alumnoActual || !alumnoActual.id || !alumnoActual.nombre) {
            throw new Error('Datos del alumno incompletos');
        }

        if (!partidaActual || !partidaActual.id) {
            throw new Error('Datos de partida incompletos');
        }

        const response = await fetch('https://cartasbackend.onrender.com/api/guardar-resultado-preguntas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id_usuario: alumnoActual.id,
                nombre: alumnoActual.nombre,
                avatar: alumnoActual.avatar || 'default.png',
                id_partida: partidaActual.id,  // Asegurar que se envía el ID de partida
                nivel: nivel,
                aciertos: aciertos,
                errores: errores,
                tiempo_usado: tiempoUsado,
                puntaje: calcularPuntaje(aciertos, errores, tiempoUsado)  // Calcular puntaje
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

    // Función para finalizar el nivel
async function finalizarNivel(completado) {
    clearInterval(temporizador);
    juegoTerminado = true;
    
    const tiempoUsado = tiempoPorNivel - tiempoRestante;
    
    try {
        const resultado = await guardarResultadoNivel(
            nivelesConfigurados[nivelActual], 
            aciertos, 
            errores, 
            tiempoUsado
        );
        
        console.log('Resultados guardados:', resultado);
        
        if (completado) {
            if (nivelActual < nivelesConfigurados.length - 1) {
                nivelActual++;
                iniciarNivel(nivelesConfigurados[nivelActual]);
            } else {
                mostrarMensajeFinal();
            }
        } else {
            const confirmacion = confirm("¿Estás seguro de que quieres finalizar el juego?");
            if (confirmacion) {
                mostrarMensajeFinal();
            } else {
                juegoTerminado = false;
                temporizador = setInterval(actualizarTemporizador, 1000);
            }
        }
    } catch (error) {
        console.error("Error al finalizar nivel:", error);
        alert(`Error: ${error.message}\nTus resultados no se guardaron completamente.`);
    }
}

function mostrarMensajeFinal() {
    alert(`Juego terminado!\nAciertos: ${aciertos}\nErrores: ${errores}`);
    window.location.href = "/Views/rankingFinal/rankingFinal.html";
}
    // Iniciar el juego
    inicializarJuego();
});