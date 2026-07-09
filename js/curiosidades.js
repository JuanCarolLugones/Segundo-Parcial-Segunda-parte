// Array con los datos curiosos que se van a mostrar en la página de inicio.
let curiosidades = [
    "Casey Reas es co-creador de Processing, un lenguaje de programación visual diseñado para artistas y estudiantes de diseño.",
    "Junto a Ben Fry desarrolló Processing como una herramienta educativa en el MIT Media Lab en 2001.",
    "Su obra artística se basa en la escritura de algoritmos que generan imágenes en constante cambio.",
    "Está influenciado por el arte conceptual y sistemático, especialmente por las instrucciones visuales de Sol LeWitt.",
    "Ha realizado exposiciones en museos como el MoMA, el Centre Pompidou y el ICA de Londres.",
    "Muchas de sus obras son generadas en tiempo real, por lo que nunca se ven exactamente igual dos veces.",
    "Publicó libros fundamentales sobre programación creativa como Processing: A Programming Handbook for Visual Designers and Artists.",
    "Ha trabajado como profesor en el Departamento de Diseño de Medios en la UCLA.",
    "Explora el arte generativo como un proceso basado en reglas simples que producen resultados complejos y emergentes.",
    "Además de visuales digitales, ha realizado impresiones generativas de gran formato como obras únicas o en series."
];

// Se capturan los elementos HTML que se modifican con JavaScript.
let parrafoDato = document.querySelector("#dato-curioso");
let botonDato = document.querySelector("#boton-dato");

// Esta función elige una posición al azar del array y muestra ese dato en pantalla.
function mostrarCuriosidad() {
    let posicion = Math.floor(Math.random() * curiosidades.length);
    parrafoDato.innerHTML = curiosidades[posicion];
}

// El evento click ejecuta la función cada vez que el usuario presiona el botón.
botonDato.addEventListener("click", mostrarCuriosidad);
