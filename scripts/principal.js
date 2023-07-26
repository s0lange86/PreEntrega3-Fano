let textoResultado = document.querySelector('#texto-resultado');
let botonesCartasUsuario = document.querySelectorAll('.carta-usuario');
let resultadoUsuario = document.querySelectorAll ('.resultado-usuario');

//PARA MODIFICAR EL TABLERO DE PUNTAJES
let puntajeUsuario1 = document.querySelector('.puntaje-usuario-1');
let puntajeUsuario2 = document.querySelector('.puntaje-usuario-2');
let puntajeUsuario3 = document.querySelector('.puntaje-usuario-3');
let puntajePC1 = document.querySelector('.puntaje-pc-1');
let puntajePC2 = document.querySelector('.puntaje-pc-2');
let puntajePC3 = document.querySelector('.puntaje-pc-3');

//PARA PONERLE EFECTOS A LA CARTA SELECCIONADA
let piedraPc = document.querySelector('.piedra-pc');
let papelPc = document.querySelector('.papel-pc');
let tijeraPc = document.querySelector('.tijera-pc');
let piedraUsuario = document.querySelector('.piedra-usuario');
let papelUsuario = document.querySelector('.papel-usuario');
let tijeraUsuario = document.querySelector('.tijera-usuario');


//RECUPERO NOMBRE DE USUARIO DEL LOCAL STORAGE Y LO PARSEO PARA OBTENER EL OBJETO
const recuperadoLocalStorage = localStorage.getItem("usuario");
const usuarioParseado = JSON.parse(recuperadoLocalStorage);

//VALORES DEL JUEGO
class ValorJugada {
    constructor(id, nombre){
        this.id = id;
        this.nombre = nombre;
    }
}

let valorCarta = [
    new ValorJugada (1, "PIEDRA"),
    new ValorJugada (2, "PAPEL"),
    new ValorJugada (3, "TIJERA")
]

//JUGADAS:
let puntajeUsuario = 0;
let puntajePc = 0;

botonesCartasUsuario.forEach(boton =>{
    boton.addEventListener('click', eleccionDeCarta)
});

function eleccionDeCarta(evento){
    //ElECCION PC
    let rtaPc = Math.round(Math.random()*2+1);

    //ELECCION USUARIO
    let rtaUsuario = evento.currentTarget.innerText;

    //AGREGRO FONDO PARA DISTINGUIR EN EL HTML CUAL ES LA CARTA QUE SACO EL USUARIO
    if(rtaUsuario == "PIEDRA"){
        piedraUsuario.classList.add("cartaElegida");
        papelUsuario.classList.remove("cartaElegida");
        tijeraUsuario.classList.remove("cartaElegida");
    } else if (rtaUsuario == "PAPEL"){
        papelUsuario.classList.add("cartaElegida")
        piedraUsuario.classList.remove("cartaElegida");
        tijeraUsuario.classList.remove("cartaElegida");
    } else if (rtaUsuario == "TIJERA"){
        tijeraUsuario.classList.add("cartaElegida")
        piedraUsuario.classList.remove("cartaElegida");
        papelUsuario.classList.remove("cartaElegida");
    }

    //EN BASE AL NRO QUE HAYA SALIDO DEL MATH RANDOM ESE MISMO LO BUSCO EN EL OBJETO PARA OBTENER SU VALOR/NOMBRE
    let encontrado = valorCarta.find((i) => i.id === rtaPc)

    //AGREGRO FONDO PARA DISTINGUIR EN EL HTML CUAL ES LA CARTA QUE SACO LA PC
    if(encontrado.nombre == "PIEDRA"){
        piedraPc.classList.add("cartaElegida");
        papelPc.classList.remove("cartaElegida");
        tijeraPc.classList.remove("cartaElegida");
    } else if (encontrado.nombre == "PAPEL"){
        papelPc.classList.add("cartaElegida")
        piedraPc.classList.remove("cartaElegida");
        tijeraPc.classList.remove("cartaElegida");
    } else if (encontrado.nombre == "TIJERA"){
        tijeraPc.classList.add("cartaElegida")
        piedraPc.classList.remove("cartaElegida");
        papelPc.classList.remove("cartaElegida");
    }

    //COMPARAR ELECCIONES DEL USUARIO CON LA ELECCION ALEATORIA DE LA PC, SABER QUIEN GANA
    if (
        (rtaUsuario == "PIEDRA" && encontrado.nombre == "TIJERA")||
        (rtaUsuario == "PAPEL" && encontrado.nombre == "PIEDRA")||
        (rtaUsuario == "TIJERA" && encontrado.nombre == "PAPEL")
    ){
        ganaUsuario()
    } else if (
        (encontrado.nombre == "PIEDRA" && rtaUsuario == "TIJERA")||
        (encontrado.nombre == "PAPEL" && rtaUsuario == "PIEDRA")||
        (encontrado.nombre == "TIJERA" && rtaUsuario == "PAPEL")
    ){
        ganaPC()
    } else {
        empate()
    }
}

function ganaUsuario(){
    textoResultado.innerText = "GANASTE " + usuarioParseado.nombre.toUpperCase() + "!!!!";
}

function ganaPC(){
    textoResultado.innerText = "PERDISTE... Vos podés " + usuarioParseado.nombre.toUpperCase() + "!!!";
}

function empate(){
    textoResultado.innerText = "-> EMPATE <-";
}