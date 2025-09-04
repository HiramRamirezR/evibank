document.addEventListener('DOMContentLoaded', () => {
    const mascotasContainer = document.getElementById('mascotas-container');
    const personas = JSON.parse(localStorage.getItem('personas')) || {};

    // Limpiar el contenedor
    mascotasContainer.innerHTML = '';

    if (Object.keys(personas).length === 0) {
        mascotasContainer.innerHTML = '<p>No hay mascotas todavía. Agrega una persona en el banco para empezar.</p>';
        return;
    }

    // Crear y añadir la tarjeta de cada mascota
    Object.entries(personas).forEach(([nombre, datos]) => {
        const mascotaCard = document.createElement('div');
        mascotaCard.className = 'mascota-card';

        const imagenContainer = document.createElement('div');
        imagenContainer.className = 'mascota-imagen-container';

        const mascotaImg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        mascotaImg.setAttribute('viewBox', '0 0 100 100');
        mascotaImg.style.width = `${datos.mascota}px`;
        mascotaImg.style.height = `${datos.mascota}px`;
        mascotaImg.classList.add('mascota-svg'); // Clase para seleccionar la mascota

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('r', '45');
        circle.setAttribute('fill', '#4285F4');
        mascotaImg.appendChild(circle);

        const ojo1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ojo1.setAttribute('cx', '35');
        ojo1.setAttribute('cy', '40');
        ojo1.setAttribute('r', '5');
        ojo1.setAttribute('fill', 'white');
        ojo1.classList.add('mascota-ojo'); // Clase para seleccionar los ojos
        mascotaImg.appendChild(ojo1);

        const ojo2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ojo2.setAttribute('cx', '65');
        ojo2.setAttribute('cy', '40');
        ojo2.setAttribute('r', '5');
        ojo2.setAttribute('fill', 'white');
        ojo2.classList.add('mascota-ojo'); // Clase para seleccionar los ojos
        mascotaImg.appendChild(ojo2);

        imagenContainer.appendChild(mascotaImg);

        const infoContainer = document.createElement('div');
        infoContainer.className = 'mascota-info';

        const nombreMascota = document.createElement('h3');
        nombreMascota.textContent = `Mascota de ${nombre}`;

        const puntosMascota = document.createElement('p');
        puntosMascota.textContent = `Puntos disponibles: ${datos.puntos}`;

        infoContainer.appendChild(nombreMascota);
        infoContainer.appendChild(puntosMascota);
        
        mascotaCard.appendChild(imagenContainer);
        mascotaCard.appendChild(infoContainer);

        mascotasContainer.appendChild(mascotaCard);
    });

    // --- LÓGICA DE PARPADEO ALEATORIO ---
    function iniciarParpadeoAleatorio() {
        const todasLasMascotas = document.querySelectorAll('.mascota-svg');

        setInterval(() => {
            todasLasMascotas.forEach(mascota => {
                // Cada mascota tiene una probabilidad de parpadear en cada intervalo
                if (Math.random() < 0.4) { // 40% de probabilidad de parpadear
                    const ojos = mascota.querySelectorAll('.mascota-ojo');
                    if (ojos.length > 0) {
                        ojos.forEach(ojo => ojo.classList.add('blink'));

                        // Quitar la clase después de un breve momento para completar el parpadeo
                        setTimeout(() => {
                            ojos.forEach(ojo => ojo.classList.remove('blink'));
                        }, 200); // Duración del parpadeo
                    }
                }
            });
        }, 2000); // Intenta parpadear cada 2 segundos
    }

    // Iniciar la animación de parpadeo si hay mascotas
    if (Object.keys(personas).length > 0) {
        iniciarParpadeoAleatorio();
    }
});