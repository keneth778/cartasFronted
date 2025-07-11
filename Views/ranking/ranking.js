export function rankingView() {
  const contenedor = document.createElement('div');
  contenedor.className = 'ranking-container';

  // Logo
  const logo = document.createElement('img');
  logo.src = '../../services/img/logo2.png';
  logo.alt = 'logo';
  logo.className = 'logo';
  contenedor.appendChild(logo);

  // Título
  const titulo = document.createElement('h1');
  titulo.textContent = 'Ranking #1';
  titulo.className = 'titulo';
  contenedor.appendChild(titulo);

  // Contenedor de lista
  const lista = document.createElement('div');
  lista.id = 'ranking-list';
  contenedor.appendChild(lista);

  // Datos de ejemplo
  const usuarios = [
    {
      nombre: 'Usuario',
      puntos: 100,
      avatar: '../../services/img/zorro.png',
      claseBarra: 'green'
    },
    {
      nombre: 'Usuario',
      puntos: 80,
      avatar: '../../services/img/mapache.png',
      claseBarra: 'yellow'
    },
    {
      nombre: 'Usuario',
      puntos: 60,
      avatar: '../../services/img/ran.png',
      claseBarra: 'orange'
    },
    {
      nombre: 'Usuario',
      puntos: 30,
      avatar: '../../services/img/koala.png',
      claseBarra: 'red'
    }
  ];

  usuarios.forEach(usuario => {
    const item = document.createElement('div');
    item.className = 'ranking-item';

    const avatar = document.createElement('img');
    avatar.src = usuario.avatar;
    avatar.alt = 'avatar';
    avatar.className = 'avatar';

    const userInfo = document.createElement('div');
    userInfo.className = 'user-info';

    const nombre = document.createElement('div');
    nombre.className = 'user-name';
    nombre.textContent = usuario.nombre;

    const barContainer = document.createElement('div');
    barContainer.className = 'bar-container';

    const bar = document.createElement('div');
    bar.className = `bar ${usuario.claseBarra}`;
    bar.textContent = `${usuario.puntos} pts`;

    barContainer.appendChild(bar);
    userInfo.appendChild(nombre);
    userInfo.appendChild(barContainer);

    item.appendChild(avatar);
    item.appendChild(userInfo);
    lista.appendChild(item);
  });

  // Botón regresar
  const btnRegresar = document.createElement('button');
  btnRegresar.textContent = 'Regresar';
  btnRegresar.className = 'btn-regresar';
  btnRegresar.addEventListener('click', () => {
    const evento = new CustomEvent('volverNiveles');
    contenedor.dispatchEvent(evento);
  });
  contenedor.appendChild(btnRegresar);

  return contenedor;
}
