import { User } from '../../models/User.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar sesión activa usando el Modelo
    const sesion = User.getCurrentUser();
    if (!sesion) {
        window.location.href = '../login/login.html';
        return;
    }

    const pills = document.querySelectorAll('.pill');
    const intensityBtns = document.querySelectorAll('.circle-btn');
    const btnGuardar = document.querySelector('.btn-primary');
    const btnLogout = document.querySelector('.btn-cerrar-sesión');

    let intensidadSeleccionada = null;

    // 2. Selección de MÚLTIPLES síntomas (Toggle)
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('active');
        });
    });

    // 3. Selección de intensidad con color gradual (manejado por CSS)
    intensityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Solo activar la actual y desactivar el resto
            intensityBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            intensidadSeleccionada = btn.getAttribute('data-value');
        });
    });

    // 4. Guardar en localStorage relacionado al correo
    btnGuardar.addEventListener('click', () => {
        const activas = document.querySelectorAll('.pill.active');
        
        if (activas.length === 0 || !intensidadSeleccionada) {
            alert('Por favor selecciona al menos un síntoma y su intensidad.');
            return;
        }

        // Extraer los textos de todos los síntomas clickeados
        const arraySintomas = Array.from(activas).map(p => p.textContent);

        // Estructura del registro
        const nuevoRegistro = {
            email: sesion.email, // Vinculado al correo devuelto por User
            sintomas: arraySintomas, // Ahora almacena todos en un array
            intensidad: intensidadSeleccionada,
            fecha: new Date().toLocaleString()
        };

        // Obtener historial previo o crear uno nuevo
        const historial = JSON.parse(localStorage.getItem('historial_sintomas_aura')) || [];
        historial.push(nuevoRegistro);
        localStorage.setItem('historial_sintomas_aura', JSON.stringify(historial));

        alert(`¡Guardado con éxito! Se registraron: ${arraySintomas.join(', ')} (Intensidad ${intensidadSeleccionada})`);

        // Limpiar selección después de guardar
        pills.forEach(p => p.classList.remove('active'));
        intensityBtns.forEach(b => {
            b.classList.remove('active');
            b.classList.remove('hover-filled');
        });
        intensidadSeleccionada = null;
    });

    // 5. Botón Cerrar Sesión
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            User.logout();
            window.location.href = '../login/login.html';
        });
    }
});