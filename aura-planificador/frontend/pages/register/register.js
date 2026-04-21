document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.register-form');

    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const terms = document.getElementById('terms').checked;

        // --- VALIDACIONES ---
        if (!name || !email || !password || !confirmPassword) {
            alert('Por favor completa todos los campos.');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Por favor ingresa un correo electrónico válido.');
            return;
        }

        if (password.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        if (!terms) {
            alert('Debes aceptar los términos y condiciones.');
            return;
        }

        // --- PERSISTENCIA LOCAL ---

        // 1. Obtener base de datos actual
        let users = JSON.parse(localStorage.getItem('usuarios_aura')) || [];

        // 2. Verificar si el correo ya existe (case insensitive para evitar errores)
        const emailExists = users.some(user => user.email.toLowerCase() === email.toLowerCase());
        if (emailExists) {
            alert('El correo electrónico ya está registrado.');
            return;
        }

        // 3. Crear el nuevo usuario
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            estado: 'activo',
            fechaRegistro: new Date().toLocaleString() // Más legible para el administrador
        };

        // 4. Guardar en el array y actualizar LocalStorage
        users.push(newUser);
        localStorage.setItem('usuarios_aura', JSON.stringify(users));

        alert('¡Registro exitoso! Ya puedes entrar.');

        // Redirección
        window.location.href = '../login/login.html';
    });
});