const menu = document.getElementById("menu");
const datosEstudios = document.getElementById("datosEstudios")
const datosLaboral = document.getElementById("datosLaboral")
const datosCompetencia = document.getElementById("datosCompetecia");

function menuMostrar2() {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        main.classList.add("u-blur");
     
    } else {

        main.classList.remove("u-blur");

    }

}


function cerrar(seccion){

    if(seccion == "estudios"){
        datosEstudios.classList.toggle("activeE");
    }else if(seccion == "trabajo"){
        datosLaboral.classList.toggle("activeL");
    }
    else if(seccion == "competencia"){
        datosCompetencia.classList.toggle("activeC");
    }
}