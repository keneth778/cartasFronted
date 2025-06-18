const contenedor = document.getElementById("clasiUsuarioFrame");

let container = document.createElement('div');
container.className = 'clasi-container';

let logoArea = document.createElement('div');
logoArea.className = 'logo-area';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.alt = "Logo";
logo.className = "logo-clasi";

let regresarBtn = document.createElement('button');
regresarBtn.textContent = "Regresar";
regresarBtn.className = "regresar-btn";
regresarBtn.addEventListener('click', () => {
  window.location.href = "../SeleJuego/seleJuego.html";
});

logoArea.appendChild(logo);
logoArea.appendChild(regresarBtn);

let contentArea = document.createElement('div');
contentArea.className = 'content-area';

let titulo = document.createElement('h1');
titulo.textContent = "Tabla de clasificación";
titulo.className = "titulo-clasi";

let listaUsuarios = document.createElement('div');
listaUsuarios.className = 'lista-usuarios';

const usuariosEjemplo = [
  { nombre: "Usuario1", puntos: 100, avatar: "koalapt.png" },
  { nombre: "Usuario2", puntos: 80, avatar: "lobopt.png" },
  { nombre: "Usuario3", puntos: 60, avatar: "pandapt.png" }
];

function crearItemUsuario(usuario, index) {
  let item = document.createElement('div');
  item.className = 'usuario-item';
  
  let posicion = document.createElement('span');
  posicion.className = 'posicion-usuario';
  posicion.textContent = `#${index + 1}`;
  
  let avatar = document.createElement('img');
  avatar.src = `/services/img-clasificacionUsuario/${usuario.avatar}`;
  avatar.alt = `Avatar ${usuario.nombre}`;
  avatar.className = 'avatar-usuario';
  
  let nombre = document.createElement('span');
  nombre.className = 'nombre-usuario';
  nombre.textContent = usuario.nombre;
  
  let puntos = document.createElement('span');
  puntos.className = 'puntos-usuario';
  puntos.textContent = `${usuario.puntos}pts`;
  
  item.appendChild(posicion);
  item.appendChild(avatar);
  item.appendChild(nombre);
  item.appendChild(puntos);
  
  return item;
}

usuariosEjemplo.forEach((usuario, index) => {
  listaUsuarios.appendChild(crearItemUsuario(usuario, index));
});

contentArea.appendChild(titulo);
contentArea.appendChild(listaUsuarios);

let botonesArea = document.createElement('div');
botonesArea.className = 'botones-area';

let btnSalir = document.createElement('button');
btnSalir.textContent = "Salir";
btnSalir.className = "btn-salir";
btnSalir.addEventListener('click', () => {
  window.location.href = "../SeleJuego/seleJuego.html";
});

let btnRanking = document.createElement('button');
btnRanking.textContent = "Ranking final";
btnRanking.className = "btn-ranking";
btnRanking.addEventListener('click', () => {
  alert("Mostrando ranking final");
});

let btnDescargar = document.createElement('button');
btnDescargar.textContent = "Descargar tarjeta";
btnDescargar.className = "btn-descargar";
btnDescargar.addEventListener('click', () => {
  alert("Descargando tarjeta de resultados");
});

botonesArea.appendChild(btnSalir);
botonesArea.appendChild(btnRanking);
botonesArea.appendChild(btnDescargar);

contentArea.appendChild(botonesArea);

container.appendChild(logoArea);
container.appendChild(contentArea);
contenedor.appendChild(container);

function actualizarListaUsuarios(usuarios) {
  listaUsuarios.innerHTML = '';
  usuarios.forEach((usuario, index) => {
    listaUsuarios.appendChild(crearItemUsuario(usuario, index));
  });
}

window.actualizarListaUsuarios = actualizarListaUsuarios;