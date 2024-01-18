var i = 0;
const txt = 'Bienvenido a mi portfolio :)';
const velocidad = 250;
const alerta = document.getElementById("alert");

window.onload = function () {
    maquinaEscribir();
};

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


setTimeout(bajar, 100);
setTimeout(bajar, 4000);

function bajar() {

    alerta.classList.toggle("active");



}
