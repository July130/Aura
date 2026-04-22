import { User } from '../../models/User.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos del DOM
    const dayElement = document.getElementById('cycle-day');
    const ringElement = document.querySelector('.progress-ring');
    
    // 2. Extraer usuario de la sesión actual
    const sesion = User.getCurrentUser();
    let currentDay = 1; // Default
    let totalCycleDays = 28;

    if (sesion) {
        // Obtenemos el ciclo más reciente si lo hay
        const latestCycle = sesion.getLatestCycle();
        if (latestCycle) {
            totalCycleDays = latestCycle.averageDuration || 28;
            
            const hoy = new Date();
            // Evitamos fechas futuras y obtenemos diferencia real en días enteros
            if (hoy >= latestCycle.startDate) {
                const diffTime = Math.abs(hoy - latestCycle.startDate);
                // +1 porque el día que inicia ya es el día 1
                currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
            }
        }
    }
    
    if (dayElement && ringElement) {
        // Actualizamos visualmente el número
        dayElement.textContent = currentDay;
        
        // Calculamos el porcentaje, con tope al 100% 
        const progressPercent = Math.min((currentDay / totalCycleDays) * 100, 100);
        
        // La animación inicial sucede luego de un ligero timeout
        setTimeout(() => {
            // El desfase máximo es 440 (perímetro de círculo r=70)
            const finalOffset = 440 - (440 * progressPercent) / 100;
            ringElement.style.strokeDashoffset = finalOffset;
        }, 150);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sesion = User.getCurrentUser();

    if (sesion) {
        const nameElement = document.getElementById('user-name');
        const avatarImg = document.querySelector('.avatar img');

        if (nameElement && sesion.name) {
            nameElement.textContent = sesion.name;
        }

        if (avatarImg && sesion.name) {
            avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(sesion.name)}&background=83133F&color=fff`;
            avatarImg.alt = `Avatar de ${sesion.name}`;
        }
    } else {
        window.location.href = 'pages/login/login.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnVerMas = document.querySelector('.btn-ver-mas');
    const textoResumen = document.querySelector('.resumen-content p');

    // Verificamos que el botón exista para evitar errores en consola
    if (btnVerMas && textoResumen) {
        btnVerMas.addEventListener('click', () => {
            // Alternamos la clase para mostrar/ocultar
            textoResumen.classList.toggle('expandido');

            // Cambiamos el texto del botón según el estado
            if (textoResumen.classList.contains('expandido')) {
                btnVerMas.textContent = 'Ver menos';
            } else {
                btnVerMas.textContent = 'Ver más';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.querySelector('.btn-cerrar-sesión');

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // 1. Eliminar la sesión
            User.logout();

            // 2. Opcional: Mostrar un mensaje rápido antes de salir
            alert('Has cerrado sesión correctamente. ¡Vuelve pronto!');

            // 3. Redirigir al login
            window.location.href = 'pages/login/login.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnAi = document.querySelector('.btn-ai');

    if (btnAi) {
        btnAi.addEventListener('click', () => {
            // Efecto visual de carga
            btnAi.textContent = 'Iniciando Aura AI...';
            btnAi.style.opacity = '0.7';
            window.location.href = 'pages/aIAssistant/aiassistant.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnVerMas = document.querySelector('.btn-ver-mas');

    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            // Cambia 'reporte.html' por la ruta de tu nueva pantalla
            window.location.href = 'pages/summary/summary.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Lógica para desplegar menú de perfil
    const btnAvatar = document.getElementById('user-avatar');
    const profileDropdown = document.getElementById('profileDropdown');

    if (btnAvatar && profileDropdown) {
        btnAvatar.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita cierre inmediato
            if (profileDropdown.style.display === 'none') {
                profileDropdown.style.display = 'block';
            } else {
                profileDropdown.style.display = 'none';
            }
        });

        // Cerrar al hacer clic en cualquier otra parte
        window.addEventListener('click', () => {
            if (profileDropdown.style.display === 'block') {
                profileDropdown.style.display = 'none';
            }
        });
    }

    // Cerrar sesión desde el dropdown
    const dropdownLogout = document.getElementById('dropdown-logout');
    if (dropdownLogout) {
        dropdownLogout.addEventListener('click', (e) => {
            e.preventDefault();
            User.logout();
            window.location.href = 'pages/login/login.html';
        });
    }
});
