const menu = document.getElementById("menu");

function menuMostrar2() {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
        main.classList.add("u-blur");
     
    } else {

        main.classList.remove("u-blur");

    }

}
