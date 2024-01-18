//Declaración de variables
const menu = document.getElementById("menu");
let datosEstudios;
let datosLaboral;
let datosCompetencia;
const sectionPrincipal = document.getElementById("sectionPrincipal");
const formContacto = document.getElementById("formContacto");

//url para el fetch
var url = "./db/profile.json";

// fetch para recibir los datos de los proyectos presente en profile.json
fetch(url)
    .then(function (response) {
        //comprobar si hay error el la petición
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa: " + response.status);
        }
        return response.json();
    })
    .then(function (data) {
        //Llamada a la función que crea todos los elementos HTML y los muestra
        anaydirDatos(data);
        setVariables();

    })

/**
 * Función que se encarga que mostrar toda la información de contacto presente en profile.json
 * parámetro de entrada = objeto json
 */
function anaydirDatos(objeto) {

    //variables que después se añadirán al documento
    let stringEstudios = "";
    let stringTrabajo = "";
    let hardSkills = "";
    let softSkills = "";

    //Recorro el array de estudios y almaceno su HTML en una variable
    objeto.estudios.forEach(e => {

        stringEstudios += `<div class="u-marginLeft5">
        <span>${e.estudio}</span>
        <br>
        <span
            class="u-marginLeft5 ContainerContacto-datos-dato-subTit ContainerContacto-datos-dato-subTit--small">${e.institucion}</span>
    </div>`

    });


    //Recorro el array de experiencia y almaceno su HTML en una variable
    objeto.experiencia.forEach(t => {

        stringTrabajo += ` <div class="u-marginTop5 u-marginLeft5">
        <span>${t.trabajo} </span>
        <br>
        <div style="display: flex; flex-direction: column;">
            <span class="u-marginLeft5 ContainerContacto-datos-dato-subTit">${t.tiempo} </span>
            <span
                class="u-marginLeft5 ContainerContacto-datos-dato-subTit ContainerContacto-datos-dato-subTit--small">${t.lugar} </span>
        </div>

    </div>`

    });

    //Recorro el array de Softskills y almaceno su HTML en una variable
    objeto.softskills.forEach(s => {

        softSkills += `  <span class="u-marginLeft5 ContainerContacto-datos-dato-subTit"> ${s}
        </span>`

    });
    //Recorro el array de hardskills y almaceno su HTML en una variable
    objeto.hardskills.forEach(s => {

        hardSkills += `  <span class="u-marginLeft5 ContainerContacto-datos-dato-subTit"> ${s}
        </span>`

    });

    //Añado TODOS los elementos HTML en la sección principal. Como quería tratarlo como un único bloque todo se añade desde JS
    sectionPrincipal.innerHTML += `
    <div class="ContainerContacto-datos-dato">
        <h3 class="u-margin0">Nombre</h3>
        <span class="u-marginLeft5">${objeto.nombre}</span>
    </div>
    <div class="ContainerContacto-datos-dato">
        <h3 class="u-margin0">Edad</h3>
        <span class="u-marginLeft5">${objeto.edad} años</span>
    </div>
    <div class="ContainerContacto-datos-dato">
        <h3 class="u-margin0">Correo</h3>
        <span class="u-marginLeft5">${objeto.correo}</span>
    </div>
    <div class="ContainerContacto-datos-dato">
        <h3 class="u-margin0">Teléfono</h3>
        <span class="u-marginLeft5">${objeto.telefono}</span>
    </div>
    <div class="ContainerContacto-datos-dato--sinLimite">
        <div class="ContainerContacto-datos-dato-desplegable" onclick="cerrar('estudios')">
            <h3 class="u-margin0">Estudios</h3>
            <img src="./imgs/arrowdown.png" alt="flecha down"
                class="ContainerContacto-datos-dato-desplegable-icono">
        </div>
        <div id="datosEstudios" class="showI activeE u-paddingTop5">
            ${stringEstudios}

        </div>
    </div>

    <div class="ContainerContacto-datos-dato--sinLimite">
        <div class="ContainerContacto-datos-dato-desplegable" onclick="cerrar('trabajo')">
            <h3 class="u-margin0">Experiencia Laboral
            </h3>
            <img src="./imgs/arrowdown.png" alt="flecha down"
                class="ContainerContacto-datos-dato-desplegable-icono">
        </div>
        <div id="datosLaboral" class="showI activeL u-paddingTop5">
        ${stringTrabajo}
        </div>
    </div>

    <div class="ContainerContacto-datos-dato--sinLimite">
    <div class="ContainerContacto-datos-dato-desplegable" onclick="cerrar('competencia')">
        <h3 class="u-margin0">Competencias
        </h3>
        <img src="./imgs/arrowdown.png" alt="flecha down"
            class="ContainerContacto-datos-dato-desplegable-icono">
    </div>
    <div id="datosCompetecia" class="showI activeC u-paddingTop5">
        <div class="u-marginLeft5 u-marginTop5">
            <span>Hard Skills </span>
            <br>
            <div class="u-flexColumn">
                ${hardSkills}
            </div>
        </div>

        <div class="u-marginTop5 u-marginLeft5">
            <span>Soft Skills </span>
            <br>
            <div class="u-flexColumn">
                ${softSkills}
            </div>

        </div>
    </div>
    <div class="ContainerContacto-datos-contacto">

        <button onclick="abrecierraForm()" class="ContainerContacto-datos-contacto-boton">Contacta conmigo</button>
        <div class="ContainerContacto-datos-contacto-buscar">
            <div class="ContainerContacto-datos-contacto-buscar-linea"></div>
            <span>Búscame en RRSS</span>
            <div class="ContainerContacto-datos-contacto-buscar-linea"></div>
        </div>
        <div>
            <a target="_blank" href="https://www.instagram.com/pxblo_mocholi/"><img
                    src="./imgs/instaIcon.webp" alt="instagram" class="ContainerContacto-datos-contacto-icon"></a>
            <a target="_blank"
                href="https://www.linkedin.com/in/pablo-mochol%C3%AD-gonz%C3%A1lez-b07125245/"> <img
                    src="./imgs/linkedinIcon.png" alt="instagram" class="ContainerContacto-datos-contacto-icon"></a>
        </div>


    </div>
    `
}

/**
 * Función que gestiona la visibilad del formulario de contacto
 */
function abrecierraForm() {

    formContacto.classList.toggle("isnot_shown");
    sectionPrincipal.classList.toggle("isnot_shown");

}

//Función que almacena las secciones desplegables en una variable
function setVariables() {
    datosEstudios = document.getElementById("datosEstudios")
    datosLaboral = document.getElementById("datosLaboral")
    datosCompetencia = document.getElementById("datosCompetecia");

}


/**
 * 
 * Función simplificada del toggle del navegador de home.js (reciclada de proyecto.js)
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

/**
 * 
 * Funciín que se encarga de gestiona si el apartado seleccionada se muestra o se oculta
 * Se utiliza del archivo css .activeE activeL activeC ya que son la altura difiere según el apartado
 * parámatro de entrada = bloque HTML a mostrar u ocultar
 * 
 */

function cerrar(seccion) {

    if (seccion == "estudios") {
        datosEstudios.classList.toggle("activeE");
    } else if (seccion == "trabajo") {
        datosLaboral.classList.toggle("activeL");
    }
    else if (seccion == "competencia") {
        datosCompetencia.classList.toggle("activeC");
    }
}