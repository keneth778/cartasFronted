document.addEventListener('DOMContentLoaded', () => {
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }
    const levels = {
        1: {
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
            ],
            time: 60 
        },
        2: {
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
            ],
            time: 50 
        },
        3: {
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
            ],
            time: 45 
        },
        4: {
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
            ],
            time: 40 
        },
        5: {
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
            ],
            time: 30 
        }
    };

    let currentLevel = 1;
    let errors = 0;
    let timerInterval;
    let timeLeft = 0;
    let selectedOptions = {};

    const animalImage = document.getElementById('animal-image');
    const finalizarButton = document.getElementById('finalizar-button');
    const timerElement = document.getElementById('timer');
    const errorCountElement = document.getElementById('error-count');
    const questionsContainer = document.getElementById('questions-container');
    const currentLevelElement = document.getElementById('current-level');

    function initGame() {
        loadLevel(currentLevel);
    }

    function loadLevel(level) {
        const levelData = levels[level];
        if (!levelData) {
            alert('¡Juego completado!');
            return;
        }

        selectedOptions = {};
        errors = 0;
        errorCountElement.textContent = errors;

        currentLevelElement.textContent = level;
        
        animalImage.src = levelData.image;
        
        timeLeft = levelData.time;
        updateTimerDisplay();
        
        questionsContainer.innerHTML = '';
        
        levelData.questions.forEach((q, qIndex) => {
            const questionItem = document.createElement('div');
            questionItem.className = 'question-item';
            
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = q.question;
            questionItem.appendChild(questionText);
            
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'options-container';
            
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
                    selectOption(optionElement, option.correct, qIndex);
                });
                
                optionContainer.appendChild(optionElement);
                optionsContainer.appendChild(optionContainer);
            });
            
            questionItem.appendChild(optionsContainer);
            questionsContainer.appendChild(questionItem);
        });
        
        startTimer();
    }

    function selectOption(optionElement, isCorrect, questionIndex) {
        if (selectedOptions[questionIndex] !== undefined) return;
        
        const questionItem = questionsContainer.querySelectorAll('.question-item')[questionIndex];
        
        const existingMessages = questionItem.querySelectorAll('.attempt-message');
        existingMessages.forEach(msg => msg.remove());
        
        selectedOptions[questionIndex] = true;
        
        if (isCorrect) {
            optionElement.classList.add('correct');
        } else {
            optionElement.classList.add('incorrect');
            errors++;
            errorCountElement.textContent = errors;
            
            const attemptMessage = document.createElement('div');
            attemptMessage.className = 'attempt-message';
            attemptMessage.textContent = 'Inténtalo de nuevo';
            optionElement.parentNode.appendChild(attemptMessage);
            
            const options = questionItem.querySelectorAll('.option');
            options.forEach(opt => {
                if (opt.dataset.correct === 'true') {
                    opt.classList.add('correct');
                }
            });
        }
    }

 
    function startTimer() {
        clearInterval(timerInterval);
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                finalizarLevel();
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    function finalizarLevel() {
        clearInterval(timerInterval);
        
        const questionItems = questionsContainer.querySelectorAll('.question-item');
        questionItems.forEach((item, index) => {
            if (selectedOptions[index] === undefined) {
                const correctOption = item.querySelector('.option[data-correct="true"]');
                if (correctOption) {
                    correctOption.classList.add('correct');
                }
            }
        });
        
        const allOptions = questionsContainer.querySelectorAll('.option');
        allOptions.forEach(option => {
            option.style.pointerEvents = 'none';
        });
        
        finalizarButton.textContent = 'Siguiente Nivel';
        finalizarButton.onclick = nextLevel;
    }

    function nextLevel() {
        currentLevel++;
        loadLevel(currentLevel);
        finalizarButton.textContent = 'Finalizar';
        finalizarButton.onclick = finalizarLevel;
    }

    finalizarButton.addEventListener('click', finalizarLevel);

    initGame();
});