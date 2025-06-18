const contenedor = document.getElementById('participantesFrame');

let section = document.createElement('div');
section.className = 'participantes-container';

let logo = document.createElement('img');
logo.src = "/services/img/logo2.png";
logo.alt = "Logo";
logo.className = "logo-participantes";
section.appendChild(logo);

let titulo = document.createElement('h1');
titulo.textContent = "Participantes";
titulo.className = "titulo-participantes";
section.appendChild(titulo);

let listaParticipantes = document.createElement('ul');
listaParticipantes.className = "lista-participantes";

const avataresDisponibles = [
  "koalapt.png",
  "lobopt.png", 
  "pandapt.png"
];

function crearItemParticipante(nombre, avatar) {
  let item = document.createElement('li');
  
  let imgAvatar = document.createElement('img');
  imgAvatar.src = `/services/img-ver-participantes/${avatar}`;
  imgAvatar.alt = "Avatar participante";
  imgAvatar.className = "avatar-participante";
  
  let spanNombre = document.createElement('span');
  spanNombre.textContent = nombre;
  
  item.appendChild(imgAvatar);
  item.appendChild(spanNombre);
  
  return item;
}

listaParticipantes.appendChild(crearItemParticipante("Usuario1", avataresDisponibles[0]));
listaParticipantes.appendChild(crearItemParticipante("Usuario2", avataresDisponibles[1]));
listaParticipantes.appendChild(crearItemParticipante("Usuario3", avataresDisponibles[2]));

section.appendChild(listaParticipantes);

let btnComenzar = document.createElement('button');
btnComenzar.textContent = "Comenzar partida";
btnComenzar.className = "btn-comenzar";
btnComenzar.addEventListener('click', () => {
  alert("Partida comenzada!");
});
section.appendChild(btnComenzar);

let btnVerNiveles = document.createElement('button');
btnVerNiveles.innerHTML = '<span class="check-icon">✔</span> Ver niveles';
btnVerNiveles.className = "btn-ver-niveles";
btnVerNiveles.addEventListener('click', () => {
  // Aquí la ruta corregida:
  window.location.href = "../vernivelesdePartida/verniveles.html";
});
section.appendChild(btnVerNiveles);

contenedor.appendChild(section);

function agregarParticipante(nombre, avatarIndex) {
  const nuevoItem = crearItemParticipante(
    nombre, 
    avataresDisponibles[avatarIndex % avataresDisponibles.length]
  );
  listaParticipantes.appendChild(nuevoItem);
}

function eliminarParticipante(index) {
  if (listaParticipantes.children[index]) {
    listaParticipantes.removeChild(listaParticipantes.children[index]);
  }
}

window.agregarParticipante = agregarParticipante;
window.eliminarParticipante = eliminarParticipante;
