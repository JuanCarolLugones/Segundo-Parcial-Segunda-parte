// Variables generales del ejercicio.
let cantidadTotalInstalaciones = 0;
let horasPorDia = 0;
let honorarioPorHora = 0;
let instalacionesCargadas = [];

// Elementos del formulario de datos generales.
let formDatos = document.querySelector("#form-datos");
let inputCantidad = document.querySelector("#cantidad-instalaciones");
let inputHoras = document.querySelector("#horas-dia");
let inputHonorario = document.querySelector("#honorario-hora");
let botonIniciar = document.querySelector("#boton-iniciar");

// Elementos del formulario para cargar cada instalación.
let formInstalacion = document.querySelector("#form-instalacion");
let inputNombre = document.querySelector("#nombre-instalacion");
let inputPersonas = document.querySelector("#personas-instalacion");
let inputDias = document.querySelector("#dias-instalacion");
let botonAgregar = document.querySelector("#boton-agregar");
let estadoCarga = document.querySelector("#estado-carga");

// Elementos para calcular, reiniciar y mostrar los resultados.
let botonCalcular = document.querySelector("#boton-calcular");
let botonReiniciar = document.querySelector("#boton-reiniciar");
let salidaResultados = document.querySelector("#salida-resultados");

// Activa o desactiva el formulario de carga de instalaciones.
function habilitarFormularioInstalacion(estado) {
    inputNombre.disabled = !estado;
    inputPersonas.disabled = !estado;
    inputDias.disabled = !estado;
    botonAgregar.disabled = !estado;
}

// Guarda los datos generales y habilita la carga de instalaciones.
function iniciarCarga(evento) {
    evento.preventDefault();

    // Los valores del formulario llegan como texto, por eso se convierten a número.
    let cantidadIngresada = parseInt(inputCantidad.value);
    let horasIngresadas = parseFloat(inputHoras.value);
    let honorarioIngresado = parseFloat(inputHonorario.value);

    // Se validan los datos generales antes de continuar.
    if (cantidadIngresada > 0 && horasIngresadas > 0 && honorarioIngresado > 0) {
        cantidadTotalInstalaciones = cantidadIngresada;
        horasPorDia = horasIngresadas;
        honorarioPorHora = honorarioIngresado;

        // Se deshabilita el primer formulario para que no se cambien los datos base.
        inputCantidad.disabled = true;
        inputHoras.disabled = true;
        inputHonorario.disabled = true;
        botonIniciar.disabled = true;

        // Se habilita el segundo formulario para cargar las instalaciones una por una.
        habilitarFormularioInstalacion(true);
        estadoCarga.innerHTML = "Cargá la instalación 1 de " + cantidadTotalInstalaciones + ".";
    } else {
        estadoCarga.innerHTML = "Revisá los datos generales. Todos los valores deben ser mayores a cero.";
    }
}

// Carga cada instalación como un objeto dentro del array.
function agregarInstalacion(evento) {
    evento.preventDefault();

    let nombre = inputNombre.value;
    let personas = parseInt(inputPersonas.value);
    let dias = parseInt(inputDias.value);

    // Se valida que el nombre no esté vacío y que los números sean mayores a cero.
    if (nombre != "" && personas > 0 && dias > 0) {
        let instalacion = {
            nombre: nombre,
            personas: personas,
            dias: dias
        };

        // Se agrega la nueva instalación al array.
        instalacionesCargadas.push(instalacion);

        // Se limpian los campos para poder cargar la siguiente instalación.
        inputNombre.value = "";
        inputPersonas.value = "";
        inputDias.value = "";

        // Cuando todavía faltan instalaciones, se informa cuál se debe cargar.
        if (instalacionesCargadas.length < cantidadTotalInstalaciones) {
            estadoCarga.innerHTML = "Cargá la instalación " + (instalacionesCargadas.length + 1) + " de " + cantidadTotalInstalaciones + ".";
        } else {
            // Al llegar a la cantidad pedida, se deshabilita la carga y se habilita el cálculo.
            estadoCarga.innerHTML = "Ya se cargaron todas las instalaciones. Ahora podés calcular los resultados.";
            habilitarFormularioInstalacion(false);
            botonCalcular.disabled = false;
        }
    } else {
        estadoCarga.innerHTML = "Revisá los datos de la instalación. El nombre no puede estar vacío y los números deben ser mayores a cero.";
    }
}

// Calcula el costo diario del estudio, la instalación de más días y su porcentaje.
function calcularResultados() {
    let totalPersonas = 0;
    let costoTotalEstudio = 0;
    let instalacionMayorDias = instalacionesCargadas[0];
    let costoInstalacionMayor = 0;

    // Se recorren todas las instalaciones cargadas para hacer los cálculos.
    for (let i = 0; i < instalacionesCargadas.length; i++) {
        let costoInstalacion = instalacionesCargadas[i].personas * instalacionesCargadas[i].dias * horasPorDia * honorarioPorHora;

        totalPersonas += instalacionesCargadas[i].personas;
        costoTotalEstudio += costoInstalacion;

        if (instalacionesCargadas[i].dias > instalacionMayorDias.dias) {
            instalacionMayorDias = instalacionesCargadas[i];
            costoInstalacionMayor = costoInstalacion;
        }
    }

    // Si la instalación con más días fue la primera, se calcula su costo al terminar el recorrido.
    if (costoInstalacionMayor == 0) {
        costoInstalacionMayor = instalacionMayorDias.personas * instalacionMayorDias.dias * horasPorDia * honorarioPorHora;
    }

    let costoDiaTrabajo = totalPersonas * horasPorDia * honorarioPorHora;
    let porcentaje = (costoInstalacionMayor * 100) / costoTotalEstudio;

    // Se muestran los resultados en la página.
    salidaResultados.innerHTML = "<ul>" +
        "<li>Costo total de un día de trabajo: $" + costoDiaTrabajo.toFixed(2) + "</li>" +
        "<li>Instalación con más días de producción: " + instalacionMayorDias.nombre + "</li>" +
        "<li>Costo total de esa instalación: $" + costoInstalacionMayor.toFixed(2) + "</li>" +
        "<li>Porcentaje que representa sobre el costo total del estudio: " + porcentaje.toFixed(2) + "%</li>" +
        "</ul>";

    botonCalcular.disabled = true;
    botonReiniciar.disabled = false;
}

// Reinicia la página para volver a empezar la carga de datos.
function reiniciar() {
    location.reload();
}

// Eventos que conectan los formularios y botones con sus funciones.
formDatos.addEventListener("submit", iniciarCarga);
formInstalacion.addEventListener("submit", agregarInstalacion);
botonCalcular.addEventListener("click", calcularResultados);
botonReiniciar.addEventListener("click", reiniciar);
