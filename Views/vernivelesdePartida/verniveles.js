const contenedor = document.getElementById("nivelFrame");

let container = document.createElement("div");
container.className = "partida-container";

let header = document.createElement("div");
header.className = "partida-header";

let icon = document.createElement("img");
icon.src = "/services/img/logosin.png";  
icon.alt = "Icono participante";

let titulo = document.createElement("h1");
titulo.textContent = "Participantes";

header.appendChild(icon);
header.appendChild(titulo);

let cuadro = document.createElement("div");
cuadro.className = "partida-cuadro";

let subtitulo = document.createElement("div");
subtitulo.className = "partida-subtitulo";
subtitulo.textContent = "Niveles de la partida";

let nivelesBox = document.createElement("div");
nivelesBox.className = "niveles-box";

let nivelesSeleccionados = [1, 2];

nivelesSeleccionados.forEach(nivel => {
  const botonNivel = document.createElement("button");
  botonNivel.className = `nivel-boton ${nivel % 2 === 0 ? "rojo" : "verde"}`;
  botonNivel.innerHTML = `
    <span class="nivel-indicador"></span>
    Nivel ${nivel}
  `;
  nivelesBox.appendChild(botonNivel);
});

let btnPodio = document.createElement("button");
btnPodio.textContent = "Podio";
btnPodio.className = "btn-secundario";

let btnCerrar = document.createElement("button");
btnCerrar.textContent = "Cerrar";
btnCerrar.className = "btn-secundario";
btnCerrar.addEventListener("click", () => {
  // ✅ Volver a la página de participantes
  window.location.href = "participante.html";
});

cuadro.appendChild(subtitulo);
cuadro.appendChild(nivelesBox);
cuadro.appendChild(btnPodio);
cuadro.appendChild(btnCerrar);

let verNivelesBtn = document.createElement("button");
verNivelesBtn.textContent = "⬇ Ver niveles";
verNivelesBtn.className = "btn-ver-niveles";

container.appendChild(header);
container.appendChild(cuadro);
container.appendChild(verNivelesBtn);
contenedor.appendChild(container);
