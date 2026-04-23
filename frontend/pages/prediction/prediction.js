import { User } from '../../models/User.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar sesión
    const user = User.getCurrentUser();
    if (!user) {
        window.location.href = '../login/login.html';
        return;
    }

    // 2. Actualizar Interfaz con datos del usuario
    const avatarImg = document.querySelector('#user-avatar img');
    if (avatarImg) {
        avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=83133F&color=fff`;
        avatarImg.alt = `Avatar de ${user.name}`;
    }

    // 3. Lógica de Predicción
    const btnCalcular = document.getElementById('calcular');
    const inputFecha = document.getElementById('fecha');
    const inputCiclo = document.getElementById('ciclo');
    const displayProxima = document.getElementById('proxima');
    const displayFertil = document.getElementById('fertil');

    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    if (btnCalcular) {
        btnCalcular.addEventListener('click', () => {
            const fechaValor = inputFecha.value;
            const cicloValor = parseInt(inputCiclo.value);

            if (!fechaValor || !cicloValor || cicloValor <= 0) {
                alert('Por favor, ingresa una fecha válida y la duración de tu ciclo.');
                return;
            }

            const fechaInicio = new Date(fechaValor + 'T00:00:00');

            const proximaFecha = new Date(fechaInicio);
            proximaFecha.setDate(fechaInicio.getDate() + cicloValor);
            displayProxima.textContent = proximaFecha.toLocaleDateString('es-ES', opcionesFecha);

            const fechaOvulacion = new Date(proximaFecha);
            fechaOvulacion.setDate(proximaFecha.getDate() - 14);

            const inicioFertil = new Date(fechaOvulacion);
            inicioFertil.setDate(fechaOvulacion.getDate() - 5);

            const finFertil = new Date(fechaOvulacion);
            finFertil.setDate(fechaOvulacion.getDate() + 1);

            const formatoCorto = { day: 'numeric', month: 'short' };
            displayFertil.textContent = `${inicioFertil.toLocaleDateString('es-ES', formatoCorto)} - ${finFertil.toLocaleDateString('es-ES', formatoCorto)}`;
        });
    }

    // 4. Dropdown de Perfil
    const btnAvatar = document.getElementById('user-avatar');
    const profileDropdown = document.getElementById('profileDropdown');

    if (btnAvatar && profileDropdown) {
        btnAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
        });

        window.addEventListener('click', () => {
            profileDropdown.style.display = 'none';
        });
    }

    // 5. Cerrar Sesión
    const btnLogout = document.getElementById('dropdown-logout');
    const sidebarLogout = document.querySelector('.btn-cerrar-sesión');

    const handleLogout = (e) => {
        if (e) e.preventDefault();
        User.logout();
        window.location.href = '../login/login.html';
    };

    if (btnLogout) btnLogout.addEventListener('click', handleLogout);
    if (sidebarLogout) sidebarLogout.addEventListener('click', handleLogout);
});