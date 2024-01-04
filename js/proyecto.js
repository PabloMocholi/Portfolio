const menu = document.getElementById("menu");
const params = new URLSearchParams(window.location.search);
const identificador = params.get("id");
const presentacion = document.getElementById("presentacionProyecto");
const contenido = document.getElementById("contenidoProyecto");
const galeria = document.getElementById("galeria");

const videosSent = document.getElementById("videosSent");
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
        console.log(proyectoElegido.multimedia)

        rellenar();
        anaydirMultimedia();
        anyadirInsta(proyectoElegido.id);


    })

function rellenar() {


    let detalles = "";

    proyectoElegido.detalles.forEach((d) => {

        detalles += `<li style="margin-bottom: 10px">` + d + "</li>";

    });


    presentacion.innerHTML = `<div>
            <img src="${proyectoElegido.imagen}" alt="imagenProyecto" style="width:100%" >
            
            </div>`

    contenido.innerHTML = `<div style="padding:20px; text-align: justify; ">
            <span style="font-size:200%; font-weight:600"> ${proyectoElegido.nombre}</span> <br><br>
            
            <div>
            <span style="font-size:140%; font-weight:300">Descripción</span><br><br>
            <span style="margin-top:12px">${proyectoElegido.descripcion}</span>
            </div>
            <br><br>
            <div>
            <span style="font-size:140%; font-weight:300">Detalles técnicos</span>
            <ul style="padding:12px; margin:0">${detalles}</ul>
            </div>
            </div>`

    galeria.innerHTML = `
        <div style="padding:20px; text-align: justify; ">
              <span style="font-size:140%; font-weight:300">Multimedia</span> <br><br>
            <section id="multimedia">

            </section>    
            <div style="display:flex; justify-content:space-around">
                <button onclick="pasarFoto('anterior')" style="background-color: black; color: white; border: 1px solid white; padding:10px; border-radius: 10px">Anterior</button>
                <button onclick="pasarFoto('siguiente')" style="background-color: black; color: white; border: 1px solid white; padding:10px; border-radius: 10px">Siguiente</button>
            </div>
        </div>`;

}

function anaydirMultimedia() {

    const multi = document.getElementById("multimedia");

    proyectoElegido.multimedia.forEach((m) => {
        videos.push(m);
    })

    multi.innerHTML = `
        <img src="${videos[contador]}" alt="video" style="width:100%">`

    interval = setInterval(() => pasarFoto('siguiente'), 3000);
}

function pasarFoto(accion) {
    console.log("boton")

    if (accion == "siguiente") {

        contador++

        if (contador < videos.length) {
            multimedia.innerHTML = `
                <img src="${videos[contador]}" alt="video" style="width:100%;">
                <div style="display:flex; justify-content:space-around"> `
        } else {
            contador = 0;
            multimedia.innerHTML = `
                <img src="${videos[contador]}" alt="video" style="width:100%">
                <div style="display:flex; justify-content:space-around">
            `

        }


    } else {
        contador--

        if (contador >= 0) {
            multimedia.innerHTML = `
                <img src="${videos[contador]}" alt="video" style="width:100%;">
                <div style="display:flex; justify-content:space-around"> `
        } else {
            contador = videos.length - 1;
            multimedia.innerHTML = `
                <img src="${videos[contador]}" alt="video" style="width:100%">
                <div style="display:flex; justify-content:space-around">
                `

        }

    }

}

function anyadirInsta(id) {

    if (id == 1) {
        videosSent.classList.remove("isnot_shown");
        videosSent.classList.add("insta");
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
