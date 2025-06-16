document.addEventListener('DOMContentLoaded', () => {
    // Función para mezclar un array (algoritmo Fisher-Yates)
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Estructura completa de niveles con imágenes exactas
    const levels = {
        1: {
            name: "Animales Básicos",
            parts: [
                {
                    // Parte 1 del Nivel 1 (2 imágenes)
                    question: "¿Cuál es un mono?",
                    options: [
                        { image: "../../../services/img-selecciona/niveluno/parte-1/mono.png", correct: true },
                        { image: "../../../services/img-selecciona/niveluno/parte-1/leon.png", correct: false }
                    ]
                },
                {
                    // Parte 2 del Nivel 1 (3 imágenes)
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
            name: "Animales Variados",
            parts: [
                {
                    // Parte 1 del Nivel 2 (4 imágenes)
                    question: "¿Cuál es una zorrillo?",
                    options: [
                        { image: "../../../services/img-selecciona/niveldos/parte-1/zorrillo.png", correct: true },
                        { image: "../../../services/img-selecciona/niveldos/parte-1/ardilla.png", correct: false },
                        { image: "../../../services/img-selecciona/niveldos/parte-1/lobo.png", correct: false },
                        { image: "../../../services/img-selecciona/niveldos/parte-1/zorro.png", correct: false }
                    ]
                },
                {
                    // Parte 2 del Nivel 2 (4 imágenes)
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
            name: "Animales Marinos e Insectos",
            parts: [
                {
                    // Parte 1 del Nivel 3 (5 imágenes)
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
                    // Parte 2 del Nivel 3 (6 imágenes)
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
            name: "Animales Diversos",
            parts: [
                {
                    // Parte 1 del Nivel 4 (7 imágenes)
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
                    // Parte 2 del Nivel 4 (8 imágenes)
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
            name: "Animales Complejos",
            parts: [
                {
                    // Parte 1 del Nivel 5 (12 imágenes)
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
                    // Parte 2 del Nivel 5 (16 imágenes)
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

    let currentLevel = 1;
    let currentPart = 0;
    let errors = 0;
    let selections = 0;
    let timerInterval;
    let timeLeft = 60;
    let selectedOption = null;

    // Elementos del DOM
    const questionElement = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const timerElement = document.querySelector('.timer');
    const seleccionaCountElement = document.querySelector('.selecciona-count');
    const errorsElement = document.querySelector('.errors');
    const currentLevelElement = document.getElementById('current-level');

    // Inicializar el juego
    function initGame() {
        loadLevelPart(currentLevel, currentPart);
        startTimer();
    }

    // Cargar parte del nivel
    function loadLevelPart(level, part) {
        const levelData = levels[level];
        if (!levelData) {
            alert('¡Nivel no encontrado!');
            return;
        }

        if (part >= levelData.parts.length) {
            // Nivel completado
            if (level < Object.keys(levels).length) {
                // Pasar al siguiente nivel
                currentLevel++;
                currentPart = 0;
                loadLevelPart(currentLevel, currentPart);
            } else {
                // Juego completado
                alert('¡Felicidades! Has completado todos los niveles.');
            }
            return;
        }

        const partData = levelData.parts[part];
        questionElement.textContent = partData.question;
        optionsContainer.innerHTML = '';
        selectedOption = null;

        // Configurar clase CSS según el nivel para el diseño de columnas
        optionsContainer.className = 'options-container';
        optionsContainer.classList.add(`level-${level}`);

        // Mostrar número de nivel actual
        currentLevelElement.textContent = level;

        // Mezclar las opciones antes de mostrarlas
        const shuffledOptions = shuffleArray([...partData.options]);
        
        // Crear opciones mezcladas
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            
            const imgElement = document.createElement('img');
            imgElement.src = option.image;
            imgElement.alt = `Opción ${index + 1}`;
            
            optionElement.appendChild(imgElement);
            optionElement.addEventListener('click', () => selectOption(optionElement, option.correct));
            optionsContainer.appendChild(optionElement);
        });

        // Actualizar contadores
        seleccionaCountElement.textContent = `Selecciona #${part + 1}`;
        errorsElement.textContent = `Errores ${errors}`;
        
        // Reiniciar estado del botón Siguiente
        nextButton.disabled = true;
    }

    // Manejar selección de opción
    function selectOption(optionElement, isCorrect) {
        if (selectedOption !== null) return;
        
        selectedOption = optionElement;
        optionElement.classList.add('selected');
        selections++;

        if (isCorrect) {
            optionElement.classList.add('correct');
            nextButton.disabled = false;
        } else {
            optionElement.classList.add('incorrect');
            errors++;
            errorsElement.textContent = `Errores ${errors}`;
            
            // Mostrar la opción correcta
            const options = optionsContainer.querySelectorAll('.option');
            options.forEach(opt => {
                const imgSrc = opt.querySelector('img').src;
                const correctOption = levels[currentLevel].parts[currentPart].options.find(o => o.correct);
                if (opt !== optionElement && imgSrc.includes(correctOption.image)) {
                    opt.classList.add('correct');
                }
            });
            
            nextButton.disabled = false;
        }
    }

    // Pasar a la siguiente parte
    function nextPart() {
        currentPart++;
        resetTimer();
        loadLevelPart(currentLevel, currentPart);
    }

    // Temporizador
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 30;
        updateTimerDisplay();
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                nextPart();
            }
        }, 1000);
    }

    function resetTimer() {
        clearInterval(timerInterval);
        startTimer();
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Evento para el botón Siguiente
    nextButton.addEventListener('click', nextPart);

    // Iniciar el juego
    initGame();
});