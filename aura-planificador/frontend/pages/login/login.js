import { User } from '../../models/User.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Capturar los valores del formulario
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;

        if (!email || !password) {
            alert('Por favor ingresa correo y contraseña.');
            return;
        }

        // 2. Buscar el usuario mediante el Modelo User
        const user = User.findByEmail(email);

        if (!user) {
            alert('No existe una cuenta registrada con este correo.');
            return;
        }

        // 3. Verificar si la contraseña coincide
        if (user.password !== password) {
            alert('Contraseña incorrecta. Inténtalo de nuevo.');
            return;
        }

        // 4. Verificar el estado de la cuenta
        if (user.status !== 'active' && user.estado !== 'activo') {
            alert('Tu cuenta no está activa. Por favor contacta soporte.');
            return;
        }

        // 5. GUARDAR SESIÓN (Persistencia en el Modelo)
        User.login(user.id);

        alert(`Bienvenid@ de nuevo, ${user.name}`);

        // 6. Redirigir al Dashboard
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