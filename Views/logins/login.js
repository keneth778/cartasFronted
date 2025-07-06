function cargarLogin() {
    let login = document.createElement('div');
    login.className = "login-container";
    
    let logo = document.createElement('img');
    logo.src = "services/img/logo.png";
    logo.className = "logo";
    login.appendChild(logo);
    
    let titulo = document.createElement('h2');
    titulo.textContent = "Iniciar sesión";
    login.appendChild(titulo);
    
    // Crear contenedor para mensajes de error
    let errorContainer = document.createElement('div');
    errorContainer.id = "errorContainer";
    errorContainer.style.color = "red";
    errorContainer.style.marginTop = "10px";
    errorContainer.style.minHeight = "20px";
    login.appendChild(errorContainer);
    
    let form = document.createElement('form');
    form.id = "loginForm";
    
    let labelEmail = document.createElement('label');
    labelEmail.textContent = "Correo Gmail:";
    labelEmail.className = "subtitle";
    form.appendChild(labelEmail);
    
    let inputEmail = document.createElement('input');
    inputEmail.type = "email";
    inputEmail.placeholder = "Ingresa tu correo";
    inputEmail.name = "email";
    inputEmail.required = true;
    form.appendChild(inputEmail);
    
    let labelPass = document.createElement('label');
    labelPass.setAttribute('for', 'password');
    labelPass.textContent = "Contraseña:";
    labelPass.className = "subtitle2";
    form.appendChild(labelPass);
    
    let inputPass = document.createElement('input');
    inputPass.type = "password";
    inputPass.name = "password";
    inputPass.placeholder = "Ingresa tu contraseña";
    inputPass.required = true;
    form.appendChild(inputPass);
    
    let btn = document.createElement('button');
    btn.type = "submit";
    btn.textContent = "Ingresar";
    btn.className = "Ingreso";
    form.appendChild(btn);
    
    // Event listener corregido para login
// Corregir la parte del fetch en el event listener
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    errorContainer.textContent = '';
    
    const correo = inputEmail.value.trim();
    const contraseña = inputPass.value.trim();
    
    if (!correo || !contraseña) {
        errorContainer.textContent = 'Por favor, completa todos los campos';
        return;
    }
    
    btn.disabled = true;
    btn.textContent = "Ingresando...";
    
    try {
        const response = await fetch('https://cartasbackend.onrender.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contraseña }), // Corregido aquí
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = "Views/seleccionRol/seleccionRol.html";
        } else {
            errorContainer.textContent = data.error || 'Error al iniciar sesión';
        }
    } catch (error) {
        console.error('Error:', error);
        errorContainer.textContent = 'Error de conexión con el servidor';
    } finally {
        btn.disabled = false;
        btn.textContent = "Ingresar";
    }
});
    login.appendChild(form);
    
    let registro = document.createElement('button');
    registro.textContent = "¿no tienes cuenta? REGISTRATE";
    registro.className = "btnRegistro";
    registro.addEventListener('click', () => {
        window.location.href = "Views/registro/registro.html";
    });
    login.appendChild(registro);
    
    return login;
}

export { cargarLogin };