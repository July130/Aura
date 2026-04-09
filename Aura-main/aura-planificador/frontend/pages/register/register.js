document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const btn = document.querySelector('.boton.boton-candy');
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }
        
        // Simular un estado de carga
        const originalText = btn.textContent;
        btn.textContent = 'Registrando...';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '¡Registro exitoso!';
            
            // Aquí puedes agregar la lógica real de registro
            console.log('Intento de registro:', { name, email, password });
            
            setTimeout(() => {
                // Restaurar botón y simular redirección
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                
                // Redirigir al usuario al login luego del registro exitoso
                window.location.href = 'login.html';
            }, 2000);
        }, 1500);
    });
});
