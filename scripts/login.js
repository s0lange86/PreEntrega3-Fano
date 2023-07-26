let nombreUsuario = document.querySelector('#nombre-usuario');
let emailUsuario = document.querySelector('#email-usuario');
let contraseñaUsuario = document.querySelector('#contraseña-usuario');
let loginUsuario = document.querySelector('#login-usuario');
let formularioLogin = document.querySelector('.form-login');



//CREO UN OBJETO CON LOS DATOS DEL USUARIO
class Usuario{
    constructor(nombre, email, contraseña){
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
    }
}

let usuario;
loginUsuario.addEventListener("click", guardarUsuario);

function guardarUsuario(){
    usuario = new Usuario (nombreUsuario.value, emailUsuario.value, contraseñaUsuario.value);

    //ALMACENAMOS EL OBJETO EN EL LOCALSTORAGE
    const usuarioJSON = JSON.stringify(usuario);
    localStorage.setItem("usuario", usuarioJSON);
    
    //LIMPIAMOS EL INPUT
    formularioLogin.reset();    
}
