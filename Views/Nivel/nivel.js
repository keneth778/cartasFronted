const contenedor = document.getElementById("nivelFrame");

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
titulo.textContent = "Elige tu nivel";

let botonesContainer = document.createElement('div');
botonesContainer.className = 'botones-nivel';

let contadorNivel = 0;

for (let i = 1; i <= 5; i++) {
  let btn = document.createElement('button');
  btn.textContent = `Nivel ${i}`;

  btn.addEventListener('click', () => {
    btn.classList.toggle('selected');
    contadorNivel = document.querySelectorAll('.botones-nivel .selected').length;
    contador.textContent = `Niveles seleccionados: ${contadorNivel}`;
  });

  botonesContainer.appendChild(btn);
}

let codigoBtn = document.createElement('button');
codigoBtn.textContent = "Código de partida";
codigoBtn.className = "codigo-btn";
// Puedes añadir funcionalidad si deseas

infoArea.appendChild(contador);
infoArea.appendChild(titulo);
infoArea.appendChild(botonesContainer);
infoArea.appendChild(codigoBtn);

// Añadir todo al contenedor principal
container.appendChild(logoArea);
container.appendChild(infoArea);
contenedor.appendChild(container);
