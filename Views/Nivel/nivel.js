const contenedor = document.getElementById("nivelFrame");

let container = document.createElement('div');
container.className = 'nivel-container';

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

codigoBtn.addEventListener('click', async () => {
    try {
        const nivelesSeleccionados = [];
        document.querySelectorAll('.botones-nivel .selected').forEach(btn => {
            nivelesSeleccionados.push(btn.textContent.trim());
        });

        if (nivelesSeleccionados.length === 0) {
            alert('Por favor selecciona al menos un nivel');
            return;
        }

        // Importación dinámica con ruta corregida
        const { crearVistaDarCodigo } = await import('../darcodigo/darcodigo.js');
        
        // Limpiar y cargar la vista
        document.getElementById('nivelFrame').innerHTML = '';
        document.getElementById('nivelFrame').appendChild(crearVistaDarCodigo());
        
    } catch (error) {
        console.error('Error al cargar la vista:', error);
        alert('Error al cargar la vista. Verifica la consola para más detalles.');
    }
});

infoArea.appendChild(contador);
infoArea.appendChild(titulo);
infoArea.appendChild(botonesContainer);
infoArea.appendChild(codigoBtn);

container.appendChild(logoArea);
container.appendChild(infoArea);
contenedor.appendChild(container);