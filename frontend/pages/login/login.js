import { User } from '../../models/User.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember-me');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // 1. Cargar correo recordado si existe
    const savedEmail = localStorage.getItem('aura_remembered_email');
    if (savedEmail && emailInput) {
        emailInput.value = savedEmail;
        if (rememberCheckbox) rememberCheckbox.checked = true;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ocultar errores previos
        if(emailError) emailError.style.display = 'none';
        if(passwordError) passwordError.style.display = 'none';
        
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        // Buscar el usuario mediante el Modelo User
        const user = User.findByEmail(email);

        if (!user) {
            if(emailError) {
                emailError.textContent = 'No existe una cuenta registrada con este correo.';
                emailError.style.display = 'block';
            } else alert('No existe una cuenta registrada con este correo.');
            return;
        }

        // Verificar si la contraseña coincide
        if (user.password !== password) {
            if(passwordError) {
                passwordError.textContent = 'Contraseña incorrecta. Inténtalo de nuevo.';
                passwordError.style.display = 'block';
            } else alert('Contraseña incorrecta.');
            return;
        }

        // Verificar el estado de la cuenta
        if (user.status !== 'active' && user.estado !== 'activo') {
            alert('Tu cuenta no está activa. Por favor contacta soporte.');
            return;
        }

        // --- Lógica de Recuérdame ---
        if (rememberCheckbox && rememberCheckbox.checked) {
            localStorage.setItem('aura_remembered_email', email);
        } else {
            localStorage.removeItem('aura_remembered_email');
        }

        // GUARDAR SESIÓN (Persistencia en el Modelo)
        User.login(user.id);

        alert(`Bienvenid@ de nuevo, ${user.name}`);

        // Redirigir al Dashboard
        window.location.href = '../../index.html';
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const forgotPasswordLink = document.querySelector('.forgot-password');
    const emailInput = document.getElementById('email'); // Asegúrate de que tu input tenga este ID

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página recargue o salte

            const emailValue = emailInput.value.trim();

            // 1. Validar si el campo está vacío
            if (!emailValue) {
                alert('Por favor, escribe tu correo electrónico primero para poder ayudarte.');
                emailInput.focus(); // Pone el cursor en el campo para ayudar al usuario
                return;
            }

            // 2. Opcional: Validar si el formato es correcto (puedes usar la función isValidEmail que ya tienes)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailValue)) {
                alert('Por favor, ingresa un formato de correo válido.');
                return;
            }

            // 3. Mostrar aviso de éxito
            alert(`Se ha enviado un mensaje de recuperación a: ${emailValue}. Revisa tu bandeja de entrada.`);
        });
    }
});