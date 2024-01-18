//Declaración de variables

const menu = document.getElementById("menu");

//variables que guardan el identificador del proyecto seleccionado
const params = new URLSearchParams(window.location.search);
const identificador = params.get("id");


const presentacion = document.getElementById("presentacionProyecto");
const contenido = document.getElementById("contenidoProyecto");
const galeria = document.getElementById("galeria");
const videosSent = document.getElementById("videosSent");
const videosMent = document.getElementById("videosMent");
const videosMuvim = document.getElementById("videosMuvim");

let proyectoElegido;
let contador = 0;
let videos = [];
let interval;

//url para el fetch
var url = "./db/proyectos.json";

// fetch para recibir los datos de los proyectos presente en proyectos.json
fetch(url)
    .then(function (response) {
        //comprobar si hay error el la petición
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa: " + response.status);
        }
        return response.json();
    })
    .then(function (data) {
        //guardo el proyecto según el id que se manda por la url
        proyectoElegido = data.find((p) => p.id == Number(identificador));

        //llamada a la función que imprime todos los datpos por pantalla
        rellenar();
        //llamada a la función que carga la imagen del carrousel
        anaydirMultimedia();
        anyadirInsta(proyectoElegido.id);


    })

/**
 * 
 * Función que recorre los distintos campos del objeto guardado y añade los valores en las secciones correspondientes
 *
 */
function rellenar() {

    let detalles = "";


    // Recorro el array de detalles y los guardo como elementos de una lista
    proyectoElegido.detalles.forEach((d) => {

        detalles += `<li class="ContainerProyecto-datos-lista-elemento">` + d + "</li>";

    });

    // Añado la imagen del proyectoo como cabecera de la página
    presentacion.innerHTML = `<div>
            <img src="${proyectoElegido.imagen}" alt="imagenProyecto" class="ContainerProyecto-imagen" >
            
            </div>`

    // Añado la información
    contenido.innerHTML = `<div class="ContainerProyecto-datos" >
                    <span class="ContainerProyecto-datos-tit"> ${proyectoElegido.nombre}</span> <br><br>
            
                <div>
                    <span class="ContainerProyecto-datos-apartado" >Descripción</span><br><br>
                    <p class="ContainerProyecto-datos-descripcion">${proyectoElegido.descripcion}</p>
                </div>
                <br><br>
                <div>
                    <span class="ContainerProyecto-datos-apartado" >Detalles técnicos</span>
                    <ul class="ContainerProyecto-datos-lista">${detalles}</ul>
                </div>
            </div>`

    // Creo la sección donde después se añadirá el contenido multimedia (carrousel)
    galeria.innerHTML = `
        <div class="ContainerProyecto-datos" >
              <span class="ContainerProyecto-datos-apartado" >Multimedia</span> <br><br>
            <section id="multimedia">

            </section>  
     
            <div class="ContainerProyecto-datos-flechas">
                <img src="./imgs/arrow_inverse.png" alt="flecha1" class="ContainerProyecto-datos-flechas-flecha" onclick="pasarFoto('anterior')">
                <img src="./imgs/arrow.png" alt="flecha2"  class="ContainerProyecto-datos-flechas-flecha" onclick="pasarFoto('siguiente')">
            </div>
        </div>`;

}

/**
 * 
 * Función que añade la imagen inicial al carrousel de fotos creado anteriormente
 *
 */

function anaydirMultimedia() {

    const multi = document.getElementById("multimedia");

    // Almaceno las imágenes en un vector patra un manejo más fácil
    proyectoElegido.multimedia.forEach((m) => {
        videos.push(m);
    })

    // Añado la imagen 
    multi.innerHTML = `
        <img id="multiIMG" src="${videos[contador]}" alt="video" class="ContainerProyecto-imagen " >`

    // Configuro un temporizador que pasa las fotos de forma automática
    interval = setInterval(() => pasarFoto('siguiente'), 5000);
}


/**
 * 
 * Función que actualiza la imagen que se muestra 
 *  parámetro de entrada = string que indica la acción a realizar
 *
 */
function pasarFoto(accion) {

    const imagen = document.getElementById("multiIMG")

    //Carga la imagen siguiente
    if (accion == "siguiente") {

        contador++

        //Comprobación para reiniciar el vector si llegamos al último elemento
        if (contador < videos.length) {
            imagen.src = videos[contador];

        } else {
            contador = 0;
            imagen.src = videos[contador];

        }

        //Carga la imagen anterior
    } else {
        contador--

        //Comprobación para poner la última imagen  llegamos al primer elemento
        if (contador >= 0) {
            imagen.src = videos[contador];
        } else {
            contador = videos.length - 1;
            imagen.src = videos[contador];
        }

    }

    //Reinicia el contador que pasa la foto automáticamente
    clearInterval(interval);
    interval = setInterval(() => pasarFoto('siguiente'), 5000);

}

/**
 * 
 * Función que comprueba si se trata de un proyecto de la Falla Immaterial para mostrar contenido publicado en instagram
 *  parámetro de entrada = id del proyecto
 *
 */
function anyadirInsta(id) {

    if (id == 1) {
        videosSent.classList.remove("isnot_shown");
        videosSent.classList.add("insta");
    }
    if (id == 2) {
        videosMent.classList.remove("isnot_shown");
        videosMent.classList.add("insta");
    }
    if (id == 3) {
        videosMuvim.classList.remove("isnot_shown");
        videosMuvim.classList.add("insta");
    }

}


/**
 * 
 * Función simplificada del toggle del navegador de home.js
 *  
 */
function menuMostrar2() {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        main.classList.add("u-blur");

    } else {

        main.classList.remove("u-blur");

    }

}
