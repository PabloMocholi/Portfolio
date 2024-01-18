//Declaración de variables
const fallaSection = document.getElementById("FallaSection");
const ceiSection = document.getElementById("CeiSection");
const menu = document.getElementById("menu");
const header = document.getElementById("header");
const main = document.getElementById("main");
const filtrado = document.getElementById("filtrado");
const filtros = document.getElementById("filtros");
const laflecha = document.querySelector(".Filtros-tit-flecha")

let menuActivo = false;
let filtrosActivo = false;
let proyectosFalla = [];
let proyectosCEI = [];
let etiquetas = [];
let vectorActivos = [];



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
        //Almaceno los proyectos en dos variables separadas según la categoría del proyecto
        proyectosFalla = data.filter((proyecto) => proyecto.categoria == "Falla");
        proyectosCEI = data.filter((proyecto) => proyecto.categoria == "CEI");

        //LLamada a la función que mostrará la información de todos los proyectos
        mostrarProyecto();

        //Llamada a la función que guarda las etiquetas presentes en el proyecto
        etiquetas = getEtiquetasTotales(data);

        //Llamada a la función que muestra las etiquetas por pantalla
        mostrarEtiquetas(etiquetas);

    })

/**
 * Función que recorre cada uno de los proyectos separados por categoría y llama a la función que los añade por pantalla
 */
function mostrarProyecto() {

    //Recorro los proyectos de la Falla Immaterial
    proyectosFalla.forEach((p) => {

        let tags = "";

        //Almaceno las etiquetas del proyecto 
        p.etiquetas.forEach((e) => {

            tags += `<span class="ChipsFiltro-chip ${e}">${e}</span>`

        })

        //Llamada a la función que crea el elemento HTML con la información
        nuevoHTML(fallaSection, p, tags);

    })

    //Recorro los proyectos del CEI
    proyectosCEI.forEach((p) => {

        let tags = "";

        //Almaceno las etiquetas del proyecto 
        p.etiquetas.forEach((e) => {

            tags += `<span class="ChipsFiltro-chip ${e}">${e}</span>`

        })

        nuevoHTML(ceiSection, p, tags);
    })

}

/**
 * Función que crea el elmento HTML de cada proyecto con sus datos correspondientes y lo añade a su sección 
 * parámetro de entrada = contenedor HTML de la sección
 * parámetro de entrada = obejeto del proyecto a insertar
 * parámetro de entrada = array de etiquetas
 */
function nuevoHTML(seccion, p, tags) {

    seccion.innerHTML += `<article class="u-marginBottom5">
    <a href="proyecto.html?id=${p.id}" style="text-decoration:none">
        <div class="ContenedorProyectos-proyecto">
    
            <div class="ContenedorProyectos-proyecto-fondo">
            </div>
            <h3 class="ContenedorProyectos-proyecto-titulo" >
            ${p.nombre}</h3>
    
            <img class="ContenedorProyectos-proyecto-imagen" src=" ${p.imagen}" alt="${p.nombre}">
        </div>
    </a>
    <div class="ChipsFiltro">
    ${tags}
    </div>
    </article>`;

}

/**
 * Función que muestra y oculta el nav 
 * Esta función contempla si el menú de filtrado está activo o no para saber si debe mantener el efecto de difuminado en el fondo
 */
function menuMostrar() {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        //Añade al contenedor principal el efecto de desenfoque
        main.classList.add("u-blur");
        //marca el menú como activo
        menuActivo = true;
    } else {

        //Comprueba si el filtrado está activo
        if (!filtrosActivo) {
            main.classList.remove("u-blur");
        }
        //desmarca el menú como activo
        menuActivo = false;
    }

}

/**
 * Función que muestra y oculta el menú de filtrado
 * Esta función contempla si el nav está activo o no para saber si debe mantener el efecto de difuminado en el fondo
 */
function filtroMostrar() {
    filtros.classList.toggle("active");

    //Analiza el estado del menú para cambiar la dirección de la flecha que despliega y cierra el menú de filtrado
    if (filtrosActivo != true) {
        laflecha.src = "imgs/arrowleft.jpg"
    }
    else {
        laflecha.src = "imgs/arrowright.jpg"
    }


    if (filtros.classList.contains("active")) {
        //Añade al contenedor principal el efecto de desenfoque
        main.classList.add("u-blur");
        //marca el filtrado como activo
        filtrosActivo = true;
    }
    else {

        //Comprueba si el menú está activo
        if (!menuActivo) {
            main.classList.remove("u-blur");
        }
        //desmarca el filtrado como activo
        filtrosActivo = false;
    }

}

/**
 * Función que almacena el conjunto de etiquetas presentes en todos los proyectos
 * parámetro de entrada = json con los proyectos
 * return = array con las etiquetas, pero SIN REPETIRSE
 * 
 */
function getEtiquetasTotales(json) {

    let categoriasTotales = [];
    let encontrado = false;

    //Recorro todos los proyectos
    json.forEach((elemento) => {

        //Recorro las etiquetas de cada proyecto
        elemento.etiquetas.forEach((c) => {

            //Comprobación inicial para la 1ª iteración (cuando el array está vacío)
            if (categoriasTotales.length == 0) {
                categoriasTotales.push(c);
            }
            else {
                //Comprueba la etiqueta del proyecto analizada ya está presente en el array
                for (i = 0; i < categoriasTotales.length; i++) {
                    if (c == categoriasTotales[i])
                        encontrado = true;
                }

                // Si la etiqueta no coincide con ninguna guardada la añdo
                if (!encontrado)
                    categoriasTotales.push(c);
            }

            //Reiniciamos el valor de la variable para volver a analizar
            encontrado = false;

        })

    });

    return categoriasTotales;

}

/**
 * Función que muestra las etiquetas en la pantalla de filtrado
 * parámetro de entrada = array con las etiquetas SIN REPETIRSE
 */
function mostrarEtiquetas(etiquetas) {

    etiquetas.forEach((e) => {

        filtrado.innerHTML += `<span class="Filtro" id="${e}" onclick="activarBoton('${e}')"> ${e}</span>`;

    })
}

/**
 * Función que se llama cuando se selecciona una etiqueta de filtrado y cambia sus propiedades css (activa y desactiva el botón)
 * parámetro de entrada = string que indica el id del botón a cambiar
 */
function activarBoton(e) {

    let boton = document.getElementById(`${e}`);
    boton.classList.toggle("button_active");

}

/**
 * Función que se encarga de preparar el sistema para el filrado según los botones activos
 */
function filtradoTags() {

    //Vacía las secciones
    fallaSection.innerHTML = `<h3 class="ContenedorProyectos-apartado">Falla Immaterial 2022/2023</h3>`;
    ceiSection.innerHTML = `<h3 class="ContenedorProyectos-apartado">Proyectos Máster</h3>`;

    vectorActivos = [];

    //Se guarda todos los botones activos
    let activos = document.querySelectorAll(".button_active");

    //Almaceno el id de los botones en un array para un manejo más sencillo
    activos.forEach((a) => {
        vectorActivos.push(a.id);
    })

    //Si hay botones activos llamo a la función encargada de mostrar los elementos deseados
    if (vectorActivos.length > 0) {
        comparativa(proyectosFalla, fallaSection);
        comparativa(proyectosCEI, ceiSection);
    } else {
        // No hay botones activos por lo que volvemos al estado inicial
        mostrarProyecto();
    }
}

/**
 * Función que se encarga de mostrar por pantalla los proyectos que cumplen TODAS las reglas del filtrado
 *  parámetro de entrada = lista con los objetos del json según la sección
 *  parámetro de entrada = HTML de la sección 
 */
function comparativa(proyectos, seccion) {

    let encontrado = false;

    //Recorro los objetos 
    proyectos.forEach((p) => {

        let cont = 0;
        //Reinicio la variable
        encontrado = false;
        let tags = "";

        //Para cada proyecto recorro sus etiquetas
        p.etiquetas.forEach((e, i) => {

            //Guardo el HTML de las etiquetas por si despúes se deb mostrar
            tags += `<span class="ChipsFiltro-chip ${e}">${e}</span>`

            //Comprueba si la etiqueta se encuentra en dentro de las que se quieren filtrar
            for (i = 0; i < vectorActivos.length; i++) {
                if (e == vectorActivos[i]) {
                    encontrado = true;
                    //Contador para contabilizar si detecta todas las etiquetas seleccionadas para filtrar
                    cont++;
                }


            }

        })

        // Si se han detectado todas las etiquetas se llama a la función que añade el elemento HTML del proyecto
        if (cont == vectorActivos.length)
            nuevoHTML(seccion, p, tags);
    })

}


