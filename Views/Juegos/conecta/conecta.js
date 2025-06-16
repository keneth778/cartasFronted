document.addEventListener('DOMContentLoaded', () => {
    const config = {
        niveles: 5,
        tiempoPorNivel: [15, 15, 20, 25, 30], 
        paresPorNivel: [3, 4, 5, 6, 7], 
        imagenesBasePath: '../../../services/img-conecta' 
    };

    let estado = {
        nivelActual: 1,
        tiempoRestante: 0,
        temporizador: null,
        errores: 0,
        seleccionInicial: null,
        conexiones: [],
        paresCompletados: 0,
        dibujandoLinea: false,
        lineaTemporal: null
    };

    const elementos = {
        nivelActual: document.getElementById('nivel-actual'),
        tiempo: document.getElementById('tiempo'),
        errores: document.getElementById('errores'),
        botonFinalizar: document.getElementById('finalizar'),
        columnaImagenes: document.getElementById('columna-imagenes'),
        columnaDestinos: document.getElementById('columna-destinos'),
        contenedorConexiones: document.getElementById('conexiones'),
        areaJuego: document.querySelector('.area-juego')
    };

    function iniciarJuego() {
        estado.nivelActual = 1;
        estado.errores = 0;
        actualizarUI();
        cargarNivel(estado.nivelActual);
    }

    function cargarNivel(nivel) {
        elementos.columnaImagenes.innerHTML = '';
        elementos.columnaDestinos.innerHTML = '';
        elementos.contenedorConexiones.innerHTML = '';
        estado.conexiones = [];
        estado.paresCompletados = 0;
        estado.seleccionInicial = null;

        const indiceNivel = nivel - 1;
        estado.tiempoRestante = config.tiempoPorNivel[indiceNivel];
        const numPares = config.paresPorNivel[indiceNivel];

        const imagenesNivel = obtenerImagenesParaNivel(nivel);
        
        const imagenesBarajadas = barajarArray([...imagenesNivel]);
        const destinosBarajados = barajarArray([...imagenesNivel]);

        imagenesBarajadas.forEach((imagen, index) => {
            crearElementoImagen(imagen, index, nivel, elementos.columnaImagenes);
        });

        destinosBarajados.forEach((imagen, index) => {
            crearElementoDestino(imagen, index, nivel, elementos.columnaDestinos);
        });

        if (estado.temporizador) {
            clearInterval(estado.temporizador);
        }
        estado.temporizador = setInterval(actualizarTemporizador, 1000);
        actualizarTemporizador();
    }

    function crearElementoImagen(imagen, index, nivel, contenedor) {
        const elementoImagen = document.createElement('div');
        elementoImagen.className = 'imagen-conecta';
        elementoImagen.dataset.imagen = imagen;
        elementoImagen.dataset.indice = index;
        elementoImagen.dataset.tipo = 'origen';
        
        const img = document.createElement('img');
        img.src = `${config.imagenesBasePath}/nivel${nivel}-img/${imagen}`;
        img.alt = `Imagen ${index + 1}`;
        
        elementoImagen.appendChild(img);
        
        elementoImagen.addEventListener('mousedown', iniciarDibujoLinea);
        elementoImagen.addEventListener('mouseup', finalizarDibujoLinea);
        
        contenedor.appendChild(elementoImagen);
    }

    function crearElementoDestino(imagen, index, nivel, contenedor) {
        const elementoDestino = document.createElement('div');
        elementoDestino.className = 'destino-conecta';
        elementoDestino.dataset.imagen = imagen;
        elementoDestino.dataset.indice = index;
        elementoDestino.dataset.tipo = 'destino';
        
        const img = document.createElement('img');
        img.src = `${config.imagenesBasePath}/nivel${nivel}-img/${imagen}`;
        img.alt = `Destino ${index + 1}`;
        
        elementoDestino.appendChild(img);
        
        elementoDestino.addEventListener('mouseup', finalizarDibujoLinea);
        
        contenedor.appendChild(elementoDestino);
    }

    function iniciarDibujoLinea(e) {
        if (estado.dibujandoLinea) return;
        
        estado.dibujandoLinea = true;
        estado.seleccionInicial = e.currentTarget;
        estado.seleccionInicial.classList.add('seleccionado');
        
        estado.lineaTemporal = document.createElement('div');
        estado.lineaTemporal.className = 'conexion-temporal';
        elementos.contenedorConexiones.appendChild(estado.lineaTemporal);
        
        elementos.areaJuego.addEventListener('mousemove', actualizarLineaTemporal);
    }

    function actualizarLineaTemporal(e) {
        if (!estado.dibujandoLinea || !estado.seleccionInicial) return;
        
        const rectInicial = estado.seleccionInicial.getBoundingClientRect();
        const x1 = rectInicial.right - elementos.contenedorConexiones.getBoundingClientRect().left;
        const y1 = rectInicial.top + rectInicial.height / 2 - elementos.contenedorConexiones.getBoundingClientRect().top;
        
        const x2 = e.clientX - elementos.contenedorConexiones.getBoundingClientRect().left;
        const y2 = e.clientY - elementos.contenedorConexiones.getBoundingClientRect().top;
        
        const longitud = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angulo = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        
        estado.lineaTemporal.style.width = `${longitud}px`;
        estado.lineaTemporal.style.left = `${x1}px`;
        estado.lineaTemporal.style.top = `${y1}px`;
        estado.lineaTemporal.style.transform = `rotate(${angulo}deg)`;
    }

    function finalizarDibujoLinea(e) {
        if (!estado.dibujandoLinea || !estado.seleccionInicial) return;
        
        elementos.areaJuego.removeEventListener('mousemove', actualizarLineaTemporal);
        
        if (estado.lineaTemporal) {
            elementos.contenedorConexiones.removeChild(estado.lineaTemporal);
            estado.lineaTemporal = null;
        }
        
        const elementoFinal = e.currentTarget;
        
          if (estado.seleccionInicial.dataset.tipo === 'origen' && 
        elementoFinal.dataset.tipo === 'destino' &&
        estado.seleccionInicial.dataset.imagen === elementoFinal.dataset.imagen) {
        
        dibujarConexion(estado.seleccionInicial, elementoFinal);
        
        estado.seleccionInicial.classList.add('conectado');
        elementoFinal.classList.add('correcto');
        
        estado.seleccionInicial.style.pointerEvents = 'none';
        elementoFinal.style.pointerEvents = 'none';
        
        estado.paresCompletados++;
        
        if (estado.paresCompletados === config.paresPorNivel[estado.nivelActual - 1]) {
            setTimeout(completarNivel, 1000);
        }
    }  else if (estado.seleccionInicial !== elementoFinal) {
            estado.errores++;
            elementos.errores.textContent = estado.errores;
            
            // Efecto de error
            if (elementoFinal.dataset.tipo === 'destino') {
                elementoFinal.classList.add('error-temporario');
                setTimeout(() => {
                    elementoFinal.classList.remove('error-temporario');
                }, 500);
            }
        }
        
        
        estado.seleccionInicial.classList.remove('seleccionado');
        estado.seleccionInicial = null;
        estado.dibujandoLinea = false;
    }


    function dibujarConexion(origen, destino) {
    const rectOrigen = origen.getBoundingClientRect();
    const rectDestino = destino.getBoundingClientRect();
    const rectContenedor = elementos.contenedorConexiones.getBoundingClientRect();
    
  
    const x1 = rectOrigen.right - rectContenedor.left;
    const y1 = rectOrigen.top + rectOrigen.height / 2 - rectContenedor.top;
    
   
    const x2 = rectDestino.left - rectContenedor.left;
    const y2 = rectDestino.top + rectDestino.height / 2 - rectContenedor.top;
    
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const longitud = Math.sqrt(dx * dx + dy * dy);
    const angulo = Math.atan2(dy, dx) * 180 / Math.PI;
 
    const conexion = document.createElement('div');
    conexion.className = 'conexion';
    conexion.style.width = `${longitud}px`;
    conexion.style.left = `${x1}px`;
    conexion.style.top = `${y1}px`;
    conexion.style.transform = `rotate(${angulo}deg)`;
    conexion.style.transformOrigin = '0 0';
   
    elementos.contenedorConexiones.appendChild(conexion);
    estado.conexiones.push(conexion);
}
    function obtenerImagenesParaNivel(nivel) {
        const imagenesPorNivel = {
            1: ['arbol.png', 'ballenapurple.png', 'midrofonobs.png'],
            2: ['chimmys.png', 'chocolate.png', 'libro.png', 'Ponyboy.png'],
            3: ['Hollyss.png', 'JInn.png', 'Mickey.png', 'namu.png', 'Tanyy.png'],
            4: ['guitarrayonngo.png', 'hobiStraw.png', 'masetapl.png', 'pezzidos.png', 'pezzi.png', 'plantatress.png'],
            5: ['Chimmy.png', 'Chocky.png', 'Kook.png', 'koya.png', 'mangg.png', 'RJ.png', 'tata.png']
        };
        return imagenesPorNivel[nivel] || [];
    }

    function barajarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function actualizarTemporizador() {
        estado.tiempoRestante--;
        const minutos = Math.floor(estado.tiempoRestante / 60);
        const segundos = estado.tiempoRestante % 60;
        elementos.tiempo.textContent = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        if (estado.tiempoRestante <= 0) {
            clearInterval(estado.temporizador);
            alert(`¡Tiempo agotado! Has llegado al nivel ${estado.nivelActual}`);
        }
    }

    function completarNivel() {
        clearInterval(estado.temporizador);
        
        if (estado.nivelActual < config.niveles) {
            estado.nivelActual++;
            actualizarUI();
            setTimeout(() => {
                alert(`¡Nivel ${estado.nivelActual - 1} completado! Pasando al nivel ${estado.nivelActual}`);
                cargarNivel(estado.nivelActual);
            }, 500);
        } else {
            alert('¡Felicidades! Has completado todos los niveles del juego.');
        }
    }

    function actualizarUI() {
        elementos.nivelActual.textContent = estado.nivelActual;
        elementos.errores.textContent = estado.errores;
    }

    elementos.botonFinalizar.addEventListener('click', () => {
        if (confirm('¿Estás seguro de que quieres finalizar el juego?')) {
            clearInterval(estado.temporizador);
            alert(`Juego finalizado. Alcanzaste el nivel ${estado.nivelActual} con ${estado.errores} errores.`);
        }
    });

    iniciarJuego();
});