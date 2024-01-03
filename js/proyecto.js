const menu = document.getElementById("menu");

function menuMostrar() {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        main.classList.add("u-blur");
        menuActivo = true;
    } else{
     menuActivo = false;
     main.classList.remove("u-blur");
      
    }

    console.log("menu", menuActivo)
        
}
