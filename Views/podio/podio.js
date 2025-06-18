import { rankingView } from "../rankingFinal/rankingFinal.js";

const imgPath = "../services/imgpodio3lugares/";
const data = [
  { lugar: 1, img: "zorropt.png" },
  { lugar: 2, img: "lobopt.png" },
  { lugar: 3, img: "ranapt.png" }
];

// Función para crear elementos
const crearElemento = (tag, className = "", contenido = "") => {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (contenido) el.textContent = contenido;
  return el;
};

// Función para descargar el podio como imagen
const descargarPodio = () => {
  const podioElemento = document.getElementById("root");
  html2canvas(podioElemento).then((canvas) => {
    const link = document.createElement("a");
    link.download = "podio.png";
    link.href = canvas.toDataURL();
    link.click();
  });
};

// Función principal que crea toda la vista del podio
const crearPodio = () => {
  const contenedor = document.getElementById("root");
  contenedor.innerHTML = "";

  const logo = crearElemento("img", "logo");
  logo.src = "../services/img/logo2.png";
  logo.alt = "Logo";
  contenedor.appendChild(logo);

  const podio = crearElemento("div", "podium");
  [2, 1, 3].forEach((lugar) => {
    const info = data.find((d) => d.lugar === lugar);
    const placeClass = lugar === 1 ? "first" : lugar === 2 ? "second" : "third";
    const box = crearElemento("div", `place ${placeClass}`);
    const img = crearElemento("img", "avatar");
    img.src = `${imgPath}${info.img}`;
    img.alt = `Lugar ${lugar}`;
    const span = crearElemento("span", "", lugar);
    box.appendChild(img);
    box.appendChild(span);
    podio.appendChild(box);
  });
  contenedor.appendChild(podio);

  // Botones
  const botones = crearElemento("div", "buttons");

  const rankingBtn = crearElemento("button", "", "Ranking Final");
  rankingBtn.addEventListener("click", () => {
    contenedor.innerHTML = ""; // Limpia el área
    const view = rankingView();
    view.addEventListener("volverNiveles", crearPodio);
    contenedor.appendChild(view);
  });

  const regresarBtn = crearElemento("button", "", "Regresar");
  regresarBtn.addEventListener("click", () => window.history.back());

  botones.appendChild(rankingBtn);
  botones.appendChild(regresarBtn);
  contenedor.appendChild(botones);

  // Botón de descarga
  const botonDescarga = crearElemento("img", "download");
  botonDescarga.src = "../services/img/candado.png";
  botonDescarga.title = "Descargar podio";
  botonDescarga.addEventListener("click", descargarPodio);
  contenedor.appendChild(botonDescarga);
};

crearPodio();
