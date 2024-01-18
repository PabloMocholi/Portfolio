//Declaración de variables
var i = 0;
const txt = 'Bienvenido a mi portfolio :)';
const velocidad = 250;
const alerta = document.getElementById("alert");

//Detecta cuando la página está completamente cargada y llama a la función que genera el texto del efecto
window.onload = function () {
    maquinaEscribir();
};

/**
 *   Función recursiva para el efecto de teclear el texto
 * 
 *      Mientras siguen quedando caracteres en el string "tt" se va añadiendo 1 a 1. 
 *      Cuando se ha añadido se utiliza el setTimeout y se vuelve a llamar a la función.
 *      Si detecta que es el último caracter se reinicia el contador, se vacía el contenedor, se espera un tiempo y se reinicia.
 * 
 *      La velocidad de reproducción se establece en la variable "velocidad"
 *      La velocidad de reinicio del efecto queda definido a 1 segundo
 * 
*/

function maquinaEscribir() {
    if (i < txt.length) {
        document.getElementById("titIndex").innerHTML += txt.charAt(i);
        i++;
        setTimeout(maquinaEscribir, velocidad);
    } else {

        setTimeout(function () {
            i = 0;
            document.getElementById("titIndex").innerHTML = '';
            setTimeout(maquinaEscribir, 1000);
        }, 1000);
    }


}

/**
 * 
 *  Comportamiento del alert: creo una transition que me cambia el top del elemento al quitar y añadir ".active"
 *  Se utiliza del archivo css ".u-posTop" y ".u-posTop.active" 
 * 
 */

setTimeout(bajar, 100);
setTimeout(bajar, 4000);

function bajar() {

    alerta.classList.toggle("active");



}
