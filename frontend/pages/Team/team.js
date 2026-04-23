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

    // 3. Dropdown de Perfil
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

    // 4. Cerrar Sesión
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
