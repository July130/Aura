document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar sesión activa
    const sesion = JSON.parse(localStorage.getItem('sesion_actual_aura'));
    if (!sesion) {
        window.location.href = '../login/login.html';
        return;
    }

    const pills = document.querySelectorAll('.pill');
    const intensityBtns = document.querySelectorAll('.circle-btn');
    const btnGuardar = document.querySelector('.btn-primary');
    const btnLogout = document.querySelector('.btn-cerrar-sesión');

    let sintomaSeleccionado = null;
    let intensidadSeleccionada = null;

    // 2. Selección de un solo síntoma
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            sintomaSeleccionado = pill.textContent;
        });
    });

    // 3. Selección de una sola intensidad
    intensityBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            intensityBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            intensidadSeleccionada = btn.getAttribute('data-value');
        });
    });

    // 4. Guardar en localStorage relacionado al correo
    btnGuardar.addEventListener('click', () => {
        if (!sintomaSeleccionado || !intensidadSeleccionada) {
            alert('Por favor selecciona un síntoma y su intensidad.');
            return;
        }

        // Estructura del registro
        const nuevoRegistro = {
            email: sesion.email, // Vinculado al correo del usuario actual
            sintoma: sintomaSeleccionado,
            intensidad: intensidadSeleccionada,
            fecha: new Date().toLocaleString()
        };

        // Obtener historial previo o crear uno nuevo
        const historial = JSON.parse(localStorage.getItem('historial_sintomas_aura')) || [];

        // Agregar el nuevo registro
        historial.push(nuevoRegistro);

        // Guardar de nuevo
        localStorage.setItem('historial_sintomas_aura', JSON.stringify(historial));

        alert(`¡Guardado con éxito! Se registró: ${sintomaSeleccionado} (Nivel ${intensidadSeleccionada})`);

        // Opcional: Limpiar selección después de guardar
        pills.forEach(p => p.classList.remove('active'));
        intensityBtns.forEach(b => b.classList.remove('active'));
        sintomaSeleccionado = null;
        intensidadSeleccionada = null;
    });

    // 5. Botón Cerrar Sesión
    btnLogout.addEventListener('click', () => {
        localStorage.removeItem('sesion_actual_aura');
        window.location.href = '../login/login.html';
    });
});