const contenedor = document.getElementById('registroFrame');
let registro = document.createElement('div');
registro.className = 'registro-container';

let logo = document.createElement('img');
logo.src = "/services/img/logo.png";
logo.className = "logo2";
registro.appendChild(logo);

let titulo = document.createElement('h2');
titulo.textContent = "Registrarse";
registro.appendChild(titulo);

// Contenedor para mensajes
let mensajeContainer = document.createElement('div');
mensajeContainer.id = "mensajeContainer";
mensajeContainer.style.minHeight = "20px";
mensajeContainer.style.marginTop = "10px";
registro.appendChild(mensajeContainer);

// Campo de email
let emailGroup = document.createElement('div');
emailGroup.className = "input-group";

let Email = document.createElement('label');
Email.textContent = "Correo Gmail:";
Email.className = "Email";
emailGroup.appendChild(Email);

let emailContainer = document.createElement('div');
emailContainer.className = "input-container";

let inputCorreo = document.createElement('input');
inputCorreo.type = "email";
inputCorreo.placeholder = "Correo electrónico";
inputCorreo.required = true;
emailContainer.appendChild(inputCorreo);

let usuarioIcon = document.createElement('img');
usuarioIcon.src = "/services/img/usuario.png";
usuarioIcon.className = "input-icon right-icon";
emailContainer.appendChild(usuarioIcon);

emailGroup.appendChild(emailContainer);
registro.appendChild(emailGroup);

// Campo de contraseña
let passGroup = document.createElement('div');
passGroup.className = "input-group";

let contra = document.createElement('label');
contra.textContent = "Contraseña:";
contra.className = "contra";
passGroup.appendChild(contra);

let passContainer = document.createElement('div');
passContainer.className = "input-container";

let inputPass = document.createElement('input');
inputPass.type = "password";
inputPass.placeholder = "Contraseña";
inputPass.required = true;
passContainer.appendChild(inputPass);

let candadoIcon = document.createElement('img');
candadoIcon.src = "/services/img/candado.png";
candadoIcon.className = "input-icon right-icon";
passContainer.appendChild(candadoIcon);

passGroup.appendChild(passContainer);
registro.appendChild(passGroup);

// Botón de registro
let botonRegistrar = document.createElement('button');
botonRegistrar.type = "button";
botonRegistrar.textContent = "Registrarse";
botonRegistrar.className = "btn-registrar";
registro.appendChild(botonRegistrar);

// Event listener corregido
// Modifica la parte del fetch en el event listener del botón de registro
botonRegistrar.addEventListener('click', async () => {
    const correo = inputCorreo.value.trim();  // Cambiado de email a correo
    const contraseña = inputPass.value.trim(); // Cambiado de password a contraseña
    
    // Limpiar mensajes anteriores
    limpiarMensajes();
    
    // Validaciones
    if (!correo || !contraseña) {
        mostrarError('Por favor, completa todos los campos');
        return;
    }
    
    if (contraseña.length < 6) {
        mostrarError('La contraseña debe tener al menos 6 caracteres');
        return;
    }
    
    // Deshabilitar botón durante la petición
    botonRegistrar.disabled = true;
    botonRegistrar.textContent = "Registrando...";
    
    try {
        const response = await fetch('https://cartasbackend.onrender.com/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                correo: correo,      // Cambiado a correo
                contraseña: contraseña // Cambiado a contraseña
            }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            mostrarExito('Usuario registrado exitosamente. Redirigiendo...');
            setTimeout(() => {
                window.location.href = "/index.html";
            }, 2000);
        } else {
            mostrarError(data.error || 'Error al registrar usuario');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarError('Error de conexión con el servidor. Verifica que el servidor esté ejecutándose.');
    } finally {
        // Rehabilitar botón
        botonRegistrar.disabled = false;
        botonRegistrar.textContent = "Registrarse";
    }
});

// Funciones auxiliares
function mostrarError(mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.textContent = mensaje;
    errorDiv.style.color = 'red';
    errorDiv.style.padding = '10px';
    errorDiv.style.backgroundColor = '#ffebee';
    errorDiv.style.border = '1px solid #f44336';
    errorDiv.style.borderRadius = '4px';
    errorDiv.className = 'mensaje';
    mensajeContainer.appendChild(errorDiv);
}

function mostrarExito(mensaje) {
    const exitoDiv = document.createElement('div');
    exitoDiv.textContent = mensaje;
    exitoDiv.style.color = 'green';
    exitoDiv.style.padding = '10px';
    exitoDiv.style.backgroundColor = '#e8f5e8';
    exitoDiv.style.border = '1px solid #4caf50';
    exitoDiv.style.borderRadius = '4px';
    exitoDiv.className = 'mensaje';
    mensajeContainer.appendChild(exitoDiv);
}

function limpiarMensajes() {
    const mensajes = mensajeContainer.querySelectorAll('.mensaje');
    mensajes.forEach(msg => msg.remove());
}

contenedor.appendChild(registro);