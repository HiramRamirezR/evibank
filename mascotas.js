document.addEventListener('DOMContentLoaded', () => {
    const mascotasContainer = document.getElementById('mascotas-container');
    // Esperamos un ARRAY de objetos
    const personas = JSON.parse(localStorage.getItem('personas')) || [];

    mascotasContainer.innerHTML = '';

    if (personas.length === 0) {
        mascotasContainer.innerHTML = '<p>No hay mascotas todavía. Agrega una persona en el banco para empezar.</p>';
        return;
    }

    // Iteramos sobre el array
    personas.forEach(persona => {
        const mascotaCard = document.createElement('div');
        mascotaCard.className = 'mascota-card';

        const imagenContainer = document.createElement('div');
        imagenContainer.className = 'mascota-imagen-container';

        // Usamos un valor por defecto (50) si persona.mascota no existe, para evitar errores
        const tamanoMascota = persona.mascota || 50;

        const mascotaImg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        mascotaImg.setAttribute('viewBox', '0 0 100 100');
        mascotaImg.style.width = `${tamanoMascota}px`;
        mascotaImg.style.height = `${tamanoMascota}px`;
        mascotaImg.classList.add('mascota-svg');

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
        ojo1.classList.add('mascota-ojo');
        mascotaImg.appendChild(ojo1);

        const ojo2 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        ojo2.setAttribute('cx', '65');
        ojo2.setAttribute('cy', '40');
        ojo2.setAttribute('r', '5');
        ojo2.setAttribute('fill', 'white');
        ojo2.classList.add('mascota-ojo');
        mascotaImg.appendChild(ojo2);

        imagenContainer.appendChild(mascotaImg);

        const infoContainer = document.createElement('div');
        infoContainer.className = 'mascota-info';

        const nombreMascota = document.createElement('h3');
        nombreMascota.textContent = persona.nombre; // Se muestra solo el nombre

        infoContainer.appendChild(nombreMascota);
        
        mascotaCard.appendChild(imagenContainer);
        mascotaCard.appendChild(infoContainer);

        mascotasContainer.appendChild(mascotaCard);
    });

    function iniciarParpadeoAleatorio() {
        const todasLasMascotas = document.querySelectorAll('.mascota-svg');
        setInterval(() => {
            todasLasMascotas.forEach(mascota => {
                if (Math.random() < 0.4) {
                    const ojos = mascota.querySelectorAll('.mascota-ojo');
                    if (ojos.length > 0) {
                        ojos.forEach(ojo => ojo.classList.add('blink'));
                        setTimeout(() => {
                            ojos.forEach(ojo => ojo.classList.remove('blink'));
                        }, 200);
                    }
                }
            });
        }, 2000);
    }

    if (personas.length > 0) {
        iniciarParpadeoAleatorio();
    }
});