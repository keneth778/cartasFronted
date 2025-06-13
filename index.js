import { cargarLogin } from "./Views/logins/login.js";


let DOM = document.querySelector("#root");

function cargarDom(){

let contenedor = document.createElement('div');
contenedor.className = "div-contenedor"

contenedor.appendChild(cargarLogin());

return contenedor;
}


DOM.appendChild(cargarDom());