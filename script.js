document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado. Iniciando script.');
    const personasContainer = document.getElementById('personas-container');
    const nuevaPersonaInput = document.getElementById('nueva-persona');
    const agregarPersonaBtn = document.getElementById('agregar-persona');

    console.log('Cargando datos desde localStorage...');
    let personas = {};
    try {
        personas = JSON.parse(localStorage.getItem('personas')) || {};
        console.log('Datos cargados:', personas);
    } catch (e) {
        console.error('Error al parsear JSON de localStorage:', e);
        personas = {};
    }

    const primerNombre = Object.keys(personas)[0];
    if (primerNombre && typeof personas[primerNombre] === 'number') {
        console.log('Detectado formato de datos antiguo. Migrando...');
        const nuevasPersonas = {};
        Object.keys(personas).forEach(nombre => {
            nuevasPersonas[nombre] = { puntos: personas[nombre], mascota: 50 };
        });
        personas = nuevasPersonas;
        console.log('Datos migrados:', personas);
        localStorage.setItem('personas', JSON.stringify(personas));
        console.log('Datos migrados guardados en localStorage.');
    }

    function guardarYActualizar() {
        console.log('Intentando guardar en localStorage. Datos:', personas);
        try {
            localStorage.setItem('personas', JSON.stringify(personas));
            console.log('Éxito: Datos guardados en localStorage.');
            const guardado = localStorage.getItem('personas');
            console.log('Verificación de lectura desde localStorage:', JSON.parse(guardado));
        } catch (e) {
            console.error('Error al guardar en localStorage:', e);
        }
        actualizarInterfaz();
    }

    function actualizarInterfaz() {
        console.log('Actualizando interfaz de usuario.');
        personasContainer.innerHTML = '';
        Object.entries(personas).forEach(([nombre, datos]) => {
            if (datos && typeof datos === 'object') {
                const card = crearTarjetaPersona(nombre, datos);
                personasContainer.appendChild(card);
            }
        });
    }

    function crearTarjetaPersona(nombre, datos) {
        const card = document.createElement('div');
        card.className = 'persona-card';
        const nombreElement = document.createElement('span');
        nombreElement.className = 'nombre';
        nombreElement.textContent = nombre;
        const puntosElement = document.createElement('span');
        puntosElement.className = 'puntos';
        puntosElement.textContent = datos.puntos;
        const btnIncrementar = document.createElement('button');
        btnIncrementar.className = 'boton boton-incrementar';
        btnIncrementar.textContent = '+';
        btnIncrementar.onclick = () => modificarPuntos(nombre, 1);
        const btnDisminuir = document.createElement('button');
        btnDisminuir.className = 'boton boton-disminuir';
        btnDisminuir.textContent = '-';
        btnDisminuir.onclick = () => modificarPuntos(nombre, -1);
        const btnAlimentar = document.createElement('button');
        btnAlimentar.className = 'boton boton-alimentar';
        btnAlimentar.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11 21h-1l1-7H7.5c-.88 0-.33-.75-.31-.78C8.48 10.94 10.42 7.54 13 3h1l-1 7h3.5c.49 0 .9.36.95.85.07.74-.74 2.15-.74 2.15L11 21z"/></svg>';
        btnAlimentar.title = 'Alimentar'; // Tooltip para accesibilidad
        btnAlimentar.onclick = () => alimentarMascota(nombre);
        const btnEliminar = document.createElement('button');
        btnEliminar.className = 'boton boton-eliminar';
        btnEliminar.textContent = '×';
        btnEliminar.onclick = () => eliminarPersona(nombre);
        card.appendChild(nombreElement);
        card.appendChild(puntosElement);
        card.appendChild(btnIncrementar);
        card.appendChild(btnDisminuir);
        card.appendChild(btnAlimentar);
        card.appendChild(btnEliminar);
        return card;
    }

    function eliminarPersona(nombre) {
        console.log(`Eliminando a ${nombre}`);
        if (confirm(`¿Estás seguro de que quieres eliminar a ${nombre}?`)) {
            delete personas[nombre];
            guardarYActualizar();
        }
    }

    function modificarPuntos(nombre, cantidad) {
        console.log(`Modificando puntos para ${nombre} por ${cantidad}`);
        personas[nombre].puntos = (personas[nombre].puntos || 0) + cantidad;
        guardarYActualizar();
    }

    function alimentarMascota(nombre) {
        console.log(`Alimentando a la mascota de ${nombre}`);
        if (personas[nombre].puntos > 0) {
            personas[nombre].puntos--;
            personas[nombre].mascota++;
            guardarYActualizar();
        } else {
            alert('No hay puntos suficientes para alimentar a la mascota.');
        }
    }

    agregarPersonaBtn.addEventListener('click', () => {
        const nombre = nuevaPersonaInput.value.trim();
        console.log(`Botón 'Agregar Persona' clickeado. Nombre: '${nombre}'`);
        if (nombre && !personas[nombre]) {
            console.log(`Agregando nueva persona: ${nombre}`);
            personas[nombre] = { puntos: 0, mascota: 50 };
            nuevaPersonaInput.value = '';
            guardarYActualizar();
        } else {
            console.log('No se agregó persona. Nombre vacío o ya existe.');
        }
    });

    console.log('Inicializando la interfaz.');
    actualizarInterfaz();
});