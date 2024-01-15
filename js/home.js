
const fallaSection = document.getElementById("FallaSection");
const ceiSection = document.getElementById("CeiSection");
const menu = document.getElementById("menu");
const header = document.getElementById("header");
const main = document.getElementById("main");
const filtrado = document.getElementById("filtrado");
const filtros = document.getElementById("filtros");

let menuActivo = false;
let filtrosActivo = false;



let proyectosFalla = [];
let proyectosCEI = [];
let etiquetas = [];
let vectorActivos = [];

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
        proyectosFalla = data.filter((proyecto) => proyecto.categoria == "Falla");
        proyectosCEI = data.filter((proyecto) => proyecto.categoria == "CEI");
        mostrarProyecto();
        etiquetas = getEtiquetasTotales(data);
        mostrarEtiquetas(etiquetas);

    })


function mostrarProyecto() {

    proyectosFalla.forEach((p) => {

        let tags = "";

        p.etiquetas.forEach((e) => {

            tags += `<span class="ChipsFiltro-chip ${e}">${e}</span>`

        })

        nuevoHTML(fallaSection, p, tags);

    })

    proyectosCEI.forEach((p) => {

        let tags = "";

        p.etiquetas.forEach((e) => {

            tags += `<span class="ChipsFiltro-chip ${e}">${e}</span>`

        })

        nuevoHTML(ceiSection, p, tags);
    })

}

function menuMostrar() {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        main.classList.add("u-blur");
        menuActivo = true;
    } else{

       if(!filtrosActivo){
        main.classList.remove("u-blur");
       } 
       menuActivo = false;
    }

    console.log("menu", menuActivo)
        
}

function filtroMostrar() {
    filtros.classList.toggle("active");

    if (filtros.classList.contains("active")) {

        main.classList.add("u-blur");
        filtrosActivo = true;
    }
    else{

        if(!menuActivo){
            main.classList.remove("u-blur");
        }
        filtrosActivo = false;
    }

    console.log("filtro",filtrosActivo)
  
}

function getEtiquetasTotales(json) {

    let categoriasTotales = [];
    let encontrado = false;

    json.forEach((elemento) => {

        elemento.etiquetas.forEach((c) => {

            if (categoriasTotales.length == 0) {
                categoriasTotales.push(c);
            }
            else {
                for (i = 0; i < categoriasTotales.length; i++) {
                    if (c == categoriasTotales[i])
                        encontrado = true;
                }

                if (!encontrado)
                    categoriasTotales.push(c);
            }

            encontrado = false;

        })

    });

    return categoriasTotales;

}

function mostrarEtiquetas(etiquetas) {

    etiquetas.forEach((e) => {

        filtrado.innerHTML += `<span class="Filtro" id="${e}" onclick="activarBoton('${e}')"> ${e}</span>`;

    })
}

function activarBoton(e) {

    let boton = document.getElementById(`${e}`);
    boton.classList.toggle("button_active");

}

function filtradoTags() {

    fallaSection.innerHTML = `<h3 class="ContenedorProyectos-apartado">Falla Immaterial 2022/2023</h3>`;
    ceiSection.innerHTML = `<h3 class="ContenedorProyectos-apartado">Proyectos Máster</h3>`;

    vectorActivos = [];

    let activos = document.querySelectorAll(".button_active");

    activos.forEach((a) => {
        vectorActivos.push(a.id);
    })

    console.log(vectorActivos);

    if (vectorActivos.length > 0) {
        comparativa(proyectosFalla, fallaSection);
        comparativa(proyectosCEI, ceiSection);
    } else {
        mostrarProyecto();
    }
}

function comparativa(proyectos, seccion) {

    let encontrado = false;


    proyectos.forEach((p) => {

        let cont = 0;

        encontrado = false;
        let tags = "";

        p.etiquetas.forEach((e,i) => {

            tags += `<span class="ChipsFiltro-chip ${e}">${e}</span>`

            for (i = 0; i < vectorActivos.length; i++) {
                if (e == vectorActivos[i]){
                    encontrado = true;
                    //console.log(e + " en " + p.id   + "  encontrado")
                    cont++;
                }
                  
                
            }

        })

        if (cont == vectorActivos.length)
            nuevoHTML(seccion, p, tags);
    })

}


function nuevoHTML(seccion, p, tags) {

    seccion.innerHTML += `<article>
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