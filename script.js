document.addEventListener('DOMContentLoaded', () => {
    const personasContainer = document.getElementById('personas-container');
    const nuevaPersonaInput = document.getElementById('nueva-persona');
    const agregarPersonaBtn = document.getElementById('agregar-persona');

    // Ahora esperamos un ARRAY de objetos
    let personas = JSON.parse(localStorage.getItem('personas')) || [];

    function guardarYActualizar() {
        localStorage.setItem('personas', JSON.stringify(personas));
        actualizarInterfaz();
    }

    function actualizarInterfaz() {
        personasContainer.innerHTML = '';
        personas.forEach((persona, index) => {
            const card = crearTarjetaPersona(persona, index);
            personasContainer.appendChild(card);
        });
    }

    function crearTarjetaPersona(persona, index) {
        const card = document.createElement('div');
        card.className = 'persona-card';

        const nombreElement = document.createElement('span');
        nombreElement.className = 'nombre';
        nombreElement.textContent = persona.nombre; // Usamos la propiedad nombre

        const puntosElement = document.createElement('span');
        puntosElement.className = 'puntos';
        puntosElement.textContent = persona.puntos;

        // Los botones ahora usan el ÍNDICE del array para identificar a la persona
        const btnIncrementar = document.createElement('button');
        btnIncrementar.className = 'boton boton-incrementar';
        btnIncrementar.textContent = '+';
        btnIncrementar.onclick = () => modificarPuntos(index, 1);

        const btnDisminuir = document.createElement('button');
        btnDisminuir.className = 'boton boton-disminuir';
        btnDisminuir.textContent = '-';
        btnDisminuir.onclick = () => modificarPuntos(index, -1);
        
        const btnAlimentar = document.createElement('button');
        btnAlimentar.className = 'boton boton-alimentar';
        btnAlimentar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .9.36.95.85.07.74-.74 2.15-.74 2.15L11 21z"/></svg>';
        btnAlimentar.title = 'Alimentar';
        btnAlimentar.onclick = () => alimentarMascota(index);

        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'boton boton-eliminar';
        btnEliminar.textContent = '×';
        btnEliminar.onclick = () => eliminarPersona(index);

        card.appendChild(nombreElement);
        card.appendChild(puntosElement);
        card.appendChild(btnIncrementar);
        card.appendChild(btnDisminuir);
        card.appendChild(btnAlimentar);
        card.appendChild(btnEliminar);

        return card;
    }

    function eliminarPersona(index) {
        const nombre = personas[index].nombre;
        if (confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) {
            personas.splice(index, 1); // Usamos splice para arrays
            guardarYActualizar();
        }
    }

    function modificarPuntos(index, cantidad) {
        personas[index].puntos += cantidad;
        guardarYActualizar();
    }

    function alimentarMascota(index) {
        if (personas[index].puntos > 0) {
            personas[index].puntos--;
            personas[index].mascota++;
            guardarYActualizar();
        } else {
            alert('No hay puntos suficientes para alimentar a la mascota.');
        }
    }

    agregarPersonaBtn.addEventListener('click', () => {
        const nombre = nuevaPersonaInput.value.trim();
        // Verificamos que el nombre no exista ya en el array
        if (nombre && !personas.some(p => p.nombre === nombre)) {
            personas.push({ 
                nombre: nombre, 
                puntos: 0, 
                mascota: 50 // Tamaño inicial
            });
            nuevaPersonaInput.value = '';
            guardarYActualizar();
        }
    });

    actualizarInterfaz();
});