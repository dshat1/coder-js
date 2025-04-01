// Inicialización de variables
let consultas = JSON.parse(localStorage.getItem('consultas')) || [];

// Función para actualizar el historial en el DOM
function actualizarHistorial() {
    const historial = document.getElementById("historial");
    historial.innerHTML = "";

    consultas.forEach((consulta, index) => {
        const li = document.createElement("li");
        li.textContent = `${consulta.nombre} consultó sobre ${consulta.servicio}`;

        // Botón para editar consulta
        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.onclick = () => editarConsulta(index);

        // Botón para eliminar consulta
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarConsulta(index);

        li.appendChild(editarBtn);
        li.appendChild(eliminarBtn);
        historial.appendChild(li);
    });
}

// Función para manejar el envío del formulario
function manejarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const servicio = document.getElementById("servicio").value;

    if (nombre && servicio) {
        consultas.push({ nombre, servicio });

        // Guardar en localStorage
        localStorage.setItem('consultas', JSON.stringify(consultas));

        // Actualizar historial
        actualizarHistorial();

        // Limpiar el formulario
        document.getElementById("consultaForm").reset();
    }
}

// Función para editar una consulta
function editarConsulta(index) {
    const consulta = consultas[index];
    const nuevoNombre = prompt("Editar nombre:", consulta.nombre);
    const nuevoServicio = prompt("Editar servicio:", consulta.servicio);

    if (nuevoNombre !== null && nuevoServicio !== null) {
        consultas[index] = { nombre: nuevoNombre, servicio: nuevoServicio };
        localStorage.setItem('consultas', JSON.stringify(consultas));
        actualizarHistorial();
    }
}

// Función para eliminar una consulta
function eliminarConsulta(index) {
    consultas.splice(index, 1);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    actualizarHistorial();
}

// Vincular evento al formulario
document.getElementById("consultaForm").addEventListener("submit", manejarFormulario);

// Inicializar historial al cargar la página
document.addEventListener("DOMContentLoaded", actualizarHistorial);
