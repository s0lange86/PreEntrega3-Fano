let textoResultado = document.querySelector('#texto-resultado');
let cartaUsuario = document.querySelectorAll('.carta-usuario');
let cartaPc = document.querySelectorAll('.carta-pc');

//PARA PONERLE EFECTOS A LA CARTA SELECCIONADA
let piedraPc = document.querySelector('.piedra-pc');
let papelPc = document.querySelector('.papel-pc');
let tijeraPc = document.querySelector('.tijera-pc');
let piedraUsuario = document.querySelector('.piedra-usuario');
let papelUsuario = document.querySelector('.papel-usuario');
let tijeraUsuario = document.querySelector('.tijera-usuario');

//PARA RESETAR LOS VALORES DEL TABLERO PUNTAJE
let celdaPuntaje = document.querySelectorAll('.celda-puntaje');


//RECUPERO NOMBRE DE USUARIO DEL LOCAL STORAGE Y LO PARSEO PARA OBTENER EL OBJETO
const recuperadoLocalStorage = localStorage.getItem("usuario");
const usuarioParseado = JSON.parse(recuperadoLocalStorage);

//VALORES DEL JUEGO
class ValorJugada {
    constructor(id, nombre) {
        this.id = id;
        this.nombre = nombre;
    }
}

let valorCarta = [
    new ValorJugada(1, "PIEDRA"),
    new ValorJugada(2, "PAPEL"),
    new ValorJugada(3, "TIJERA")
]

//JUGADAS:
let puntajeUsuarioTotal = [];
let puntajePcTotal = [];

cartaUsuario.forEach(boton => {
    boton.addEventListener('click', eleccionDeCarta)
});

function eleccionDeCarta(evento) {
    //ElECCION PC
    let rtaPc = Math.round(Math.random() * 2 + 1);

    //ELECCION USUARIO
    let rtaUsuario = evento.currentTarget.innerText;

    //AGREGRO FONDO PARA DISTINGUIR EN EL HTML CUAL ES LA CARTA QUE SACO EL USUARIO
    if (rtaUsuario == "PIEDRA") {
        piedraUsuario.classList.add("cartaElegida");
        papelUsuario.classList.remove("cartaElegida");
        tijeraUsuario.classList.remove("cartaElegida");
    } else if (rtaUsuario == "PAPEL") {
        papelUsuario.classList.add("cartaElegida")
        piedraUsuario.classList.remove("cartaElegida");
        tijeraUsuario.classList.remove("cartaElegida");
    } else if (rtaUsuario == "TIJERA") {
        tijeraUsuario.classList.add("cartaElegida")
        piedraUsuario.classList.remove("cartaElegida");
        papelUsuario.classList.remove("cartaElegida");
    }

    //EN BASE AL NRO QUE HAYA SALIDO DEL MATH RANDOM ESE MISMO LO BUSCO EN EL OBJETO PARA OBTENER SU VALOR/NOMBRE
    let encontrado = valorCarta.find((i) => i.id === rtaPc);

    //AGREGRO FONDO PARA DISTINGUIR EN EL HTML CUAL ES LA CARTA QUE SACO LA PC
    if (encontrado.nombre == "PIEDRA") {
        piedraPc.classList.add("cartaElegida");
        papelPc.classList.remove("cartaElegida");
        tijeraPc.classList.remove("cartaElegida");
    } else if (encontrado.nombre == "PAPEL") {
        papelPc.classList.add("cartaElegida")
        piedraPc.classList.remove("cartaElegida");
        tijeraPc.classList.remove("cartaElegida");
    } else if (encontrado.nombre == "TIJERA") {
        tijeraPc.classList.add("cartaElegida")
        piedraPc.classList.remove("cartaElegida");
        papelPc.classList.remove("cartaElegida");
    }

    //COMPARAR ELECCIONES DEL USUARIO CON LA ELECCION ALEATORIA DE LA PC, SABER QUIEN GANA
    if (
        (rtaUsuario == "PIEDRA" && encontrado.nombre == "TIJERA") ||
        (rtaUsuario == "PAPEL" && encontrado.nombre == "PIEDRA") ||
        (rtaUsuario == "TIJERA" && encontrado.nombre == "PAPEL")
    ) {
        ganaUsuario();
    } else if (
        (encontrado.nombre == "PIEDRA" && rtaUsuario == "TIJERA") ||
        (encontrado.nombre == "PAPEL" && rtaUsuario == "PIEDRA") ||
        (encontrado.nombre == "TIJERA" && rtaUsuario == "PAPEL")
    ) {
        ganaPC();
    } else {
        empate()
    }
}

let sumaTotalUsuario;
let sumaTotalPc;

function ganaUsuario() {
    textoResultado.innerText = "GANASTE " + usuarioParseado.nombre.toUpperCase() + "!!!!";

    if(puntajeUsuarioTotal.length < 3){
        //ESTO ES PARA CALCULAR RESULTADO FINAL Y SABER QUIEN GANO CON UN REDUCE QUE SALDRIA POR SWEET ALERT
        puntajeUsuarioTotal.push(1);
        puntajePcTotal.push(0);

        //ACA IMPRIME RESULTADO EN TABLA DE PUNTAJE
        for (let index = 1; index <= puntajeUsuarioTotal.length; index++) {
            document.querySelector('.puntaje-usuario-' + index).innerText = puntajeUsuarioTotal[index - 1];
            document.querySelector('.puntaje-pc-' + index).innerText = puntajePcTotal[index - 1];
        }
    } else {
        //MUESTRA RESULTADO POR SWEET ALERT
        mostrarResultado();
    }
}

function ganaPC() {
    textoResultado.innerText = "PERDISTE... Vos podés " + usuarioParseado.nombre.toUpperCase() + "!!!";

    if(puntajePcTotal.length < 3){
        puntajePcTotal.push(1);
        puntajeUsuarioTotal.push(0);

        for (let index = 1; index <= puntajePcTotal.length; index++) {
            document.querySelector('.puntaje-usuario-' + index).innerText = puntajeUsuarioTotal[index - 1];
            document.querySelector('.puntaje-pc-' + index).innerText = puntajePcTotal[index - 1];
        }
    } else {
        //MUESTRA RESULTADO POR SWEET ALERT
        mostrarResultado();
    }
}

function empate() {
    textoResultado.innerText = "-> EMPATE <-";
}

function sumarTotales(){
    sumaTotalUsuario = puntajeUsuarioTotal.reduce((acc, el) => acc + el , 0);
    sumaTotalPc = puntajePcTotal.reduce((acc, el) => acc + el , 0);
}

function mostrarResultado(){
    sumarTotales();
        if(sumaTotalUsuario > sumaTotalPc){
            Swal.fire({
                title: 'GANASTE!! 😀',
                text: 'Volver a jugar',
                icon: 'success',
                confirmButtonText: 'DALE!',
            }).then((result) =>{
                if(result.isConfirmed){
                    celdaPuntaje.forEach(element => element.innerText = "--");
                    textoResultado.innerText = ">> COMENCEMOS A JUGAR!! HACE CLICK EN ALGUNA TARJETA DE JUGADOR <<";
                    puntajeUsuarioTotal = [];
                    puntajePcTotal = [];
                    cartaUsuario.forEach(elemento => elemento.classList.remove("cartaElegida"));
                    cartaPc.forEach(elemento => elemento.classList.remove("cartaElegida"));
                }
            })
        } else {
            Swal.fire({
                title: 'PERDISTE!! 😣',
                text: 'Volver a jugar',
                icon: 'error',
                confirmButtonText: 'DALE!',                
            }).then((result) =>{
                if(result.isConfirmed){
                    celdaPuntaje.forEach(element => element.innerText = "--");
                    textoResultado.innerText = ">> COMENCEMOS A JUGAR!! HACE CLICK EN ALGUNA TARJETA DE JUGADOR <<";
                    puntajeUsuarioTotal = [];
                    puntajePcTotal = [];
                    cartaUsuario.forEach(elemento => elemento.classList.remove("cartaElegida"));
                    cartaPc.forEach(elemento => elemento.classList.remove("cartaElegida"));
                }
            })
        }
}