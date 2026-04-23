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

    // 3. Lógica del Ciclo
    const dayElement = document.getElementById('summary-cycle-day');
    const ringElement = document.querySelector('.progress-ring-summary');
    const latestCycle = user.getLatestCycle();
    
    let currentDay = 12; // Valor por defecto si no hay ciclo registrado
    let totalCycleDays = 28;

    if (latestCycle) {
        totalCycleDays = latestCycle.averageDuration || 28;
        const hoy = new Date();
        if (hoy >= latestCycle.startDate) {
            const diffTime = Math.abs(hoy - latestCycle.startDate);
            currentDay = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        }
    }

    if (dayElement && ringElement) {
        dayElement.textContent = currentDay;
        
        // Animación del anillo de progreso
        const progressPercent = Math.min((currentDay / totalCycleDays) * 100, 100);
        // Perímetro para r=80 es 2 * PI * 80 ≈ 502
        const perimeter = 502; 
        
        setTimeout(() => {
            const finalOffset = perimeter - (perimeter * progressPercent) / 100;
            ringElement.style.strokeDashoffset = finalOffset;
        }, 300);
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

    // 6. Selección de Emociones
    const emotionCards = document.querySelectorAll('.emotion-card');
    emotionCards.forEach(card => {
        card.addEventListener('click', () => {
            emotionCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            // Aquí se podría guardar la emoción en el modelo del usuario si se desea
        });
    });
});
