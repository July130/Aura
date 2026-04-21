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

        // 2. Obtener la "Base de Datos" local
        // Si no existe 'usuarios_aura', devolvemos un array vacío []
        const users = JSON.parse(localStorage.getItem('usuarios_aura')) || [];

        // 3. Buscar el usuario que coincida con el correo
        const user = users.find(u => u.email === email);

        if (!user) {
            alert('No existe una cuenta registrada con este correo.');
            return;
        }

        // 4. Verificar si la contraseña coincide
        if (user.password !== password) {
            alert('Contraseña incorrecta. Inténtalo de nuevo.');
            return;
        }

        // 5. Verificar el estado de la cuenta
        if (user.estado !== 'activo') {
            alert('Tu cuenta no está activa. Por favor contacta soporte.');
            return;
        }

        // 6. GUARDAR SESIÓN (Persistencia local)
        // Guardamos solo lo necesario para identificar al usuario en otras páginas
        const sessionData = {
            id: user.id,
            name: user.name,
            email: user.email,
            loginTime: new Date().toLocaleString() // Formato legible
        };

        // Convertimos el objeto a String para poder guardarlo
        localStorage.setItem('sesion_actual_aura', JSON.stringify(sessionData));

        alert(`Bienvenid@ de nuevo, ${user.name}`);

        // 7. Redirigir al Dashboard
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