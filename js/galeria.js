// Array de objetos con las obras elegidas para la galería.
// Cada objeto guarda el nombre, el año y la ruta de la imagen.
let obras = [
    {
        nombre: "detail of process 13 from Process Compendium",
        anio: 2010,
        imagen: "img/process-13.png"
    },
    {
        nombre: "detail of process 6 (image 4)",
        anio: 2005,
        imagen: "img/process-6.png"
    },
    {
        nombre: "detail of Technical Image #1",
        anio: 2024,
        imagen: "img/technical-image-1.png"
    },
    {
        nombre: "detail of process 5 from Process Compendium",
        anio: 2010,
        imagen: "img/process-5.png"
    },
    {
        nombre: "Microimage A-06",
        anio: 2002,
        imagen: "img/microimage-a-06.png"
    }
];

// Se capturan el contenedor de la galería y el botón de cambio de diseño.
let galeria = document.querySelector("#galeria");
let botonDiseno = document.querySelector("#boton-diseno");

// Esta variable controla si las imágenes están en tamaño normal o grande.
let imagenesGrandes = false;

// Genera la galería recorriendo el array de obras con un ciclo for.
function mostrarGaleria() {
    let contenido = "";

    for (let i = 0; i < obras.length; i++) {
        contenido += "<article>";
        contenido += "<img src='" + obras[i].imagen + "' alt='" + obras[i].nombre + "'>";
        contenido += "<h3>" + obras[i].nombre + "</h3>";
        contenido += "<p>Año: " + obras[i].anio + "</p>";
        contenido += "</article>";
    }

    galeria.innerHTML = contenido;
}

// Cambia el diseño agregando o sacando una clase del contenedor.
function cambiarDisenio() {
    if (imagenesGrandes == false) {
        galeria.className = "galeria galeria-grande";
        botonDiseno.innerHTML = "Achicar imágenes";
        imagenesGrandes = true;
    } else {
        galeria.className = "galeria";
        botonDiseno.innerHTML = "Agrandar imágenes";
        imagenesGrandes = false;
    }
}

// Primero se muestra la galería y después se activa el botón.
mostrarGaleria();
botonDiseno.addEventListener("click", cambiarDisenio);
