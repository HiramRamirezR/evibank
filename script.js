document.addEventListener('DOMContentLoaded', () => {
    const personasContainer = document.getElementById('personas-container');
    const nuevaPersonaInput = document.getElementById('nueva-persona');
    const agregarPersonaBtn = document.getElementById('agregar-persona');

    // Cargar y migrar datos guardados si es necesario
    function cargarDatos() {
        const datosGuardados = JSON.parse(localStorage.getItem('personas'));
        // Si los datos viejos existen y son un objeto (no un array), los migramos al nuevo formato
        if (datosGuardados && typeof datosGuardados === 'object' && !Array.isArray(datosGuardados)) {
            const datosMigrados = Object.entries(datosGuardados).map(([nombre, puntos]) => ({ nombre, puntos }));
            localStorage.setItem('personas', JSON.stringify(datosMigrados));
            return datosMigrados;
        }
        // Si no, simplemente retornamos los datos o un array vacío
        return datosGuardados || [];
    }

    let personas = cargarDatos();

    // Función para guardar los datos en localStorage
    function guardarDatos() {
        localStorage.setItem('personas', JSON.stringify(personas));
    }

    // Función para actualizar la interfaz
    function actualizarInterfaz() {
        personasContainer.innerHTML = '';
        personas.forEach(persona => {
            const card = crearTarjetaPersona(persona);
            personasContainer.appendChild(card);
        });
    }

    // Función para crear una tarjeta de persona
    function crearTarjetaPersona(persona) {
        const card = document.createElement('div');
        card.className = 'persona-card';
        card.dataset.name = persona.nombre; // Importante para identificar el elemento al reordenar

        const nombreElement = document.createElement('span');
        nombreElement.className = 'nombre';
        nombreElement.textContent = persona.nombre;

        const puntosElement = document.createElement('span');
        puntosElement.className = 'puntos';
        puntosElement.textContent = persona.puntos;

        const btnIncrementar = document.createElement('button');
        btnIncrementar.className = 'boton boton-incrementar';
        btnIncrementar.textContent = '+';
        btnIncrementar.onclick = () => modificarPuntos(persona.nombre, 1);

        const btnDisminuir = document.createElement('button');
        btnDisminuir.className = 'boton boton-disminuir';
        btnDisminuir.textContent = '-';
        btnDisminuir.onclick = () => modificarPuntos(persona.nombre, -1);

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'boton boton-eliminar';
        btnEliminar.textContent = '×';
        btnEliminar.onclick = () => eliminarPersona(persona.nombre);

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
            personas = personas.filter(p => p.nombre !== nombre);
            guardarDatos();
            actualizarInterfaz();
        }
    }

    // Función para modificar los puntos
    function modificarPuntos(nombre, cantidad) {
        const persona = personas.find(p => p.nombre === nombre);
        if (persona) {
            persona.puntos += cantidad;
            guardarDatos();
            actualizarInterfaz();
        }
    }

    // Evento para agregar nueva persona
    agregarPersonaBtn.addEventListener('click', () => {
        const nombre = nuevaPersonaInput.value.trim();
        if (nombre && !personas.some(p => p.nombre === nombre)) {
            personas.push({ nombre: nombre, puntos: 0 });
            guardarDatos();
            nuevaPersonaInput.value = '';
            actualizarInterfaz();
        }
    });

    // Inicializar SortableJS en el contenedor de personas
    new Sortable(personasContainer, {
        animation: 150, // Animación suave al reordenar
        ghostClass: 'sortable-ghost', // Clase CSS para el elemento "fantasma" que se arrastra

        // Se llama cuando el usuario termina de arrastrar y suelta el elemento
        onEnd: function(evt) {
            // Obtenemos el nuevo orden de los nombres desde el DOM
            const nuevoOrden = Array.from(personasContainer.children).map(card => card.dataset.name);

            // Reordenamos el array 'personas' para que coincida con el nuevo orden visual
            personas.sort((a, b) => {
                return nuevoOrden.indexOf(a.nombre) - nuevoOrden.indexOf(b.nombre);
            });

            // Guardamos el nuevo orden en localStorage
            guardarDatos();
        }
    });

    // Inicializar la interfaz
    actualizarInterfaz();
});