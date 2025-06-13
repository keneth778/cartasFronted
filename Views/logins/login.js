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
    form.appendChild(inputEmail);

    let labelPass = document.createElement('label');
    labelPass.setAttribute('for', 'password');
    labelPass.textContent = "Contraseña:";
    labelEmail.className = "subtitle2";
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
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Previene que se recargue la página
      window.location.href = "Views/seleccionRol/seleccionRol.html";
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
