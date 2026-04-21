document.addEventListener('DOMContentLoaded', () => {
    const btnCalcular = document.getElementById('calcular');
    const inputFecha = document.getElementById('fecha');
    const inputCiclo = document.getElementById('ciclo');
    const displayProxima = document.getElementById('proxima');
    const displayFertil = document.getElementById('fertil');
    const btnCerrarSesion = document.querySelector('.btn-cerrar-sesión');

    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener('click', () => {
            localStorage.removeItem('sesion_actual_aura');
            window.location.href = '../login/login.html';
        });
    }
});