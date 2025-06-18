export function rankingView() {
  const contenedor = document.createElement('div');
  contenedor.className = 'rkf-container';

  const logo = document.createElement('img');
  logo.src = '../../services/img/logo2.png';
  logo.alt = 'logo';
  logo.className = 'rkf-logo';
  contenedor.appendChild(logo);

  const titulo = document.createElement('h1');
  titulo.textContent = 'Ranking Final';
  titulo.className = 'rkf-title';
  contenedor.appendChild(titulo);

  const lista = document.createElement('div');
  lista.id = 'rkf-list';
  contenedor.appendChild(lista);

  const usuarios = [
    {
      nombre: 'Usuario 1',
      puntos: 100,
      avatar: '../../services/img/zorro.png',
      claseBarra: 'rkf-bar-green'
    },
    {
      nombre: 'Usuario 2',
      puntos: 80,
      avatar: '../../services/img/mapache.png',
      claseBarra: 'rkf-bar-yellow'
    },
    {
      nombre: 'Usuario 3',
      puntos: 60,
      avatar: '../../services/img/ran.png',
      claseBarra: 'rkf-bar-orange'
    },
    {
      nombre: 'Usuario 4',
      puntos: 30,
      avatar: '../../services/img/koala.png',
      claseBarra: 'rkf-bar-red'
    }
  ];

  usuarios.forEach(usuario => {
    const item = document.createElement('div');
    item.className = 'rkf-item';

    const avatar = document.createElement('img');
    avatar.src = usuario.avatar;
    avatar.alt = 'avatar';
    avatar.className = 'rkf-avatar';

    const userInfo = document.createElement('div');
    userInfo.className = 'rkf-userinfo';

    const nombre = document.createElement('div');
    nombre.className = 'rkf-username';
    nombre.textContent = usuario.nombre;

    const barContainer = document.createElement('div');
    barContainer.className = 'rkf-bar-container';

    const bar = document.createElement('div');
    bar.className = `rkf-bar ${usuario.claseBarra}`;
    bar.textContent = `${usuario.puntos} pts`;

    barContainer.appendChild(bar);
    userInfo.appendChild(nombre);
    userInfo.appendChild(barContainer);

    item.appendChild(avatar);
    item.appendChild(userInfo);
    lista.appendChild(item);
  });

  const btnRegresar = document.createElement('button');
  btnRegresar.textContent = 'Regresar';
  btnRegresar.className = 'rkf-btn-back';
  btnRegresar.addEventListener('click', () => {
    const evento = new CustomEvent('volverNiveles');
    contenedor.dispatchEvent(evento);
  });
  contenedor.appendChild(btnRegresar);

  return contenedor;
}
