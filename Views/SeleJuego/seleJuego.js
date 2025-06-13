const contenedor = document.getElementById("seleJuegoFrame");

let section = document.createElement("div");
section.className = "seleJuego-container";

// Logo + Título
let logoTitulo = document.createElement("div");
logoTitulo.className = "logo-titulo";

let logo = document.createElement("img");
logo.src = "/services/img/logo.png";
logo.alt = "Logo";

let titulo = document.createElement("h2");
titulo.textContent = "¿Qué deseas jugar?";

logoTitulo.appendChild(logo);
logoTitulo.appendChild(titulo);
section.appendChild(logoTitulo);

// Contenedor de botones
let botonesContainer = document.createElement("div");
botonesContainer.className = "botones-juegos";

const juegos = ["Memoria", "Pregunta", "Conecta", "Selecciona"];
juegos.forEach(juego => {
  let btn = document.createElement("button");
  btn.textContent = juego;

  // Redirige a la pantalla de niveles al hacer clic
  btn.addEventListener("click", () => {
    window.location.href = "../Nivel/nivel.html";
  });

  botonesContainer.appendChild(btn);
});

section.appendChild(botonesContainer);

// Botón salir
let btnSalir = document.createElement("button");
btnSalir.className = "salir-btn";
btnSalir.textContent = "Salir";
btnSalir.addEventListener("click", () => {
  window.location.href = "../seleccionRol/seleccionRol.html";
});

section.appendChild(btnSalir);

// Insertar en el contenedor principal
contenedor.appendChild(section);

