document.addEventListener("DOMContentLoaded", () => {
    actualizarHistorial();
});

let consultas = JSON.parse(localStorage.getItem('consultas')) || [];

// Función para actualizar el historial
function actualizarHistorial() {
    const historial = document.getElementById("historial");
    historial.innerHTML = "";

    consultas.forEach((consulta, index) => {
        const li = document.createElement("li");
        li.textContent = `${consulta.nombre} consultó sobre ${consulta.servicio}`;

        const editarBtn = document.createElement("button");
        editarBtn.textContent = "Editar";
        editarBtn.onclick = () => editarConsulta(index);

        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarConsulta(index);

        li.appendChild(editarBtn);
        li.appendChild(eliminarBtn);
        historial.appendChild(li);
    });
}

// Función para manejar el formulario
document.getElementById("consultaForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const servicio = document.getElementById("servicio").value;

    if (nombre && servicio) {
        consultas.push({ nombre, servicio });
        localStorage.setItem('consultas', JSON.stringify(consultas));
        actualizarHistorial();
        document.getElementById("consultaForm").reset();
    }
});

// Función para editar una consulta con SweetAlert2
function editarConsulta(index) {
    const consulta = consultas[index];
    Swal.fire({
        title: "Editar consulta",
        html: `
            <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${consulta.nombre}">
            <input id="swal-servicio" class="swal2-input" placeholder="Servicio" value="${consulta.servicio}">
        `,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
        preConfirm: () => {
            const nuevoNombre = document.getElementById("swal-nombre").value;
            const nuevoServicio = document.getElementById("swal-servicio").value;
            if (nuevoNombre && nuevoServicio) {
                consultas[index] = { nombre: nuevoNombre, servicio: nuevoServicio };
                localStorage.setItem('consultas', JSON.stringify(consultas));
                actualizarHistorial();
            }
        }
    });
}

// Función para eliminar consulta
function eliminarConsulta(index) {
    consultas.splice(index, 1);
    localStorage.setItem('consultas', JSON.stringify(consultas));
    actualizarHistorial();
}
