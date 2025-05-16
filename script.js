document.addEventListener('DOMContentLoaded', () => {
    const personasContainer = document.getElementById('personas-container');
    const nuevaPersonaInput = document.getElementById('nueva-persona');
    const agregarPersonaBtn = document.getElementById('agregar-persona');

    // Cargar datos guardados
    let personas = JSON.parse(localStorage.getItem('personas')) || {};

    // Función para actualizar la interfaz
    function actualizarInterfaz() {
        personasContainer.innerHTML = '';
        
        Object.entries(personas).forEach(([nombre, puntos]) => {
            const card = crearTarjetaPersona(nombre, puntos);
            personasContainer.appendChild(card);
        });
    }

    // Función para crear una tarjeta de persona
    function crearTarjetaPersona(nombre, puntos) {
        const card = document.createElement('div');
        card.className = 'persona-card';

        const nombreElement = document.createElement('span');
        nombreElement.className = 'nombre';
        nombreElement.textContent = nombre;

        const puntosElement = document.createElement('span');
        puntosElement.className = 'puntos';
        puntosElement.textContent = puntos;

        const btnIncrementar = document.createElement('button');
        btnIncrementar.className = 'boton boton-incrementar';
        btnIncrementar.textContent = '+';
        btnIncrementar.onclick = () => modificarPuntos(nombre, 1);

        const btnDisminuir = document.createElement('button');
        btnDisminuir.className = 'boton boton-disminuir';
        btnDisminuir.textContent = '-';
        btnDisminuir.onclick = () => modificarPuntos(nombre, -1);

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'boton boton-eliminar';
        btnEliminar.textContent = '×';
        btnEliminar.onclick = () => eliminarPersona(nombre);

        card.appendChild(nombreElement);
        card.appendChild(puntosElement);
        card.appendChild(btnIncrementar);
        card.appendChild(btnDisminuir);
        card.appendChild(btnEliminar);

        return card;
    }

    // Función para eliminar una persona
    function eliminarPersona(nombre) {
        if (confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) {
            delete personas[nombre];
            localStorage.setItem('personas', JSON.stringify(personas));
            actualizarInterfaz();
        }
    }

    // Función para modificar los puntos
    function modificarPuntos(nombre, cantidad) {
        personas[nombre] = (personas[nombre] || 0) + cantidad;
        localStorage.setItem('personas', JSON.stringify(personas));
        actualizarInterfaz();
    }

    // Evento para agregar nueva persona
    agregarPersonaBtn.addEventListener('click', () => {
        const nombre = nuevaPersonaInput.value.trim();
        if (nombre && !personas[nombre]) {
            personas[nombre] = 0;
            localStorage.setItem('personas', JSON.stringify(personas));
            nuevaPersonaInput.value = '';
            actualizarInterfaz();
        }
    });

    // Inicializar la interfaz
    actualizarInterfaz();
});
