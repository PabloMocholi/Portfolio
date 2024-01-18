const menu = document.getElementById("menu");
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

var url = "./db/proyectos.json";

// Uso de la función fetch
fetch(url)
    .then(function (response) {
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa: " + response.status);
        }
        return response.json();
    })
    .then(function (data) {
        proyectoElegido = data.find((p) => p.id == Number(identificador));


        rellenar();
        anaydirMultimedia();
        anyadirInsta(proyectoElegido.id);


    })

function rellenar() {


    let detalles = "";

    proyectoElegido.detalles.forEach((d) => {

        detalles += `<li class="ContainerProyecto-datos-lista-elemento">` + d + "</li>";

    });


    presentacion.innerHTML = `<div>
            <img src="${proyectoElegido.imagen}" alt="imagenProyecto" class="ContainerProyecto-imagen" >
            
            </div>`

    contenido.innerHTML = `<div class="ContainerProyecto-datos" >
                    <span class="ContainerProyecto-datos-tit"> ${proyectoElegido.nombre}</span> <br><br>
            
                <div>
                    <span class="ContainerProyecto-datos-apartado" >Descripción</span><br><br>
                    <span class="ContainerProyecto-datos-descripcion">${proyectoElegido.descripcion}</span>
                </div>
                <br><br>
                <div>
                    <span class="ContainerProyecto-datos-apartado" >Detalles técnicos</span>
                    <ul class="ContainerProyecto-datos-lista">${detalles}</ul>
                </div>
            </div>`

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


function anaydirMultimedia() {




    const multi = document.getElementById("multimedia");

    proyectoElegido.multimedia.forEach((m) => {
        videos.push(m);
    })

    console.log(videos)

    multi.innerHTML = `
        <img id="multiIMG" src="${videos[contador]}" alt="video" class="ContainerProyecto-imagen " >`

    interval = setInterval(() => pasarFoto('siguiente'), 5000);
}

function pasarFoto(accion) {

    const imagen = document.getElementById("multiIMG");
    if (accion == "siguiente") {

        contador++

        if (contador < videos.length) {
            imagen.src = videos[contador];

        } else {
            contador = 0;
            imagen.src = videos[contador];

        }


    } else {
        contador--

        if (contador >= 0) {
            imagen.src = videos[contador];
        } else {
            contador = videos.length - 1;
            imagen.src = videos[contador];
        }

    }

    clearInterval(interval);
    interval = setInterval(() => pasarFoto('siguiente'), 5000);

}

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






function menuMostrar2() {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        main.classList.add("u-blur");

    } else {

        main.classList.remove("u-blur");

    }

}
