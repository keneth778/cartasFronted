export function crearVistaDarCodigo() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/Views/darcodigo/darcodigo.css'; 
  document.head.appendChild(link);

  const contenedor = document.createElement('div');
  contenedor.classList.add('contenedor-darcodigo');

  contenedor.innerHTML = `
    <img src="/services/img/logo2.png" alt="Logo" class="logo">
    <h2>Código de la partida</h2>
    <div class="codigo">${Math.random().toString(36).substring(2, 8).toUpperCase()}</div>
    <h3>Visualizaciones</h3>
    <button class="btn-ver">Ver participantes</button>
    <button class="btn-siguiente">Siguiente</button>
  `;

  // Redirección simple al hacer clic en "Ver participantes"
  const btnVer = contenedor.querySelector('.btn-ver');
  btnVer.addEventListener('click', () => {
    window.location.href = '../participantes/participante.html';
  });

  return contenedor;
}