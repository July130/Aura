document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = document.querySelector('.submit-btn');
        
        // Simular un estado de carga
        const originalText = btn.textContent;
        btn.textContent = 'Iniciando sesión...';
        btn.style.opacity = '0.8';
        btn.disabled = true;

        setTimeout(() => {
            btn.textContent = '¡Bienvenido!';
            
            
            // Aquí puedes agregar la lógica real de inicio de sesión
            console.log('Intento de inicio de sesión:', { email, password });
            
            setTimeout(() => {
                // Restaurar botón
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 2000);
        }, 1500);
    });
});

