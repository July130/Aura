document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos el elemento que contiene el día y el aro de progreso
    const dayElement = document.getElementById('cycle-day');
    const ringElement = document.querySelector('.progress-ring');
    
    // Asumimos un ciclo estandar de 28 días (o lo que configure el usuario)
    const totalCycleDays = 28;
    
    if (dayElement && ringElement) {
        // Obtenemos el día en el que se encuentra actualmente el texto
        const currentDay = parseInt(dayElement.textContent, 10);
        
        // Calculamos el porcentaje, con tope al 100% 
        const progressPercent = Math.min((currentDay / totalCycleDays) * 100, 100);
        
        // La animación inicial sucede luego de un ligero timeout
        setTimeout(() => {
            // El desfase máximo es 440 (perímetro de círculo de radio 70px)
            const finalOffset = 440 - (440 * progressPercent) / 100;
            ringElement.style.strokeDashoffset = finalOffset;
        }, 150); // Mismo efecto estético de "cargar"
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const sesion = JSON.parse(localStorage.getItem('sesion_actual_aura'));

    if (sesion) {
        const nameElement = document.getElementById('user-name');
        const avatarImg = document.querySelector('.avatar img');

        if (nameElement && sesion.name) {
            nameElement.textContent = sesion.name;
        }

        if (avatarImg && sesion.name) {
            avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(sesion.name)}&background=83133F&color=fff`;
            avatarImg.alt = `Avatar de ${sesion.name}`;
        }
    } else {
        window.location.href = 'pages/login/login.html';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnVerMas = document.querySelector('.btn-ver-mas');
    const textoResumen = document.querySelector('.resumen-content p');

    // Verificamos que el botón exista para evitar errores en consola
    if (btnVerMas && textoResumen) {
        btnVerMas.addEventListener('click', () => {
            // Alternamos la clase para mostrar/ocultar
            textoResumen.classList.toggle('expandido');

            // Cambiamos el texto del botón según el estado
            if (textoResumen.classList.contains('expandido')) {
                btnVerMas.textContent = 'Ver menos';
            } else {
                btnVerMas.textContent = 'Ver más';
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. OBTENER SESIÓN ACTUAL
    const sesion = JSON.parse(localStorage.getItem('sesion_actual_aura'));
    if (!sesion) return; // Si no hay sesión, no hacemos nada

    // 2. REFERENCIAS
    const emocionPills = document.querySelectorAll('.diario-cards .card:nth-child(1) .pill');
    const sintomasPills = document.querySelectorAll('.diario-cards .card:nth-child(2) .pill');
    const flujoItems = document.querySelectorAll('.circle-item');
    const diarioContainer = document.querySelector('.diario-cards');

    // 3. VERIFICAR SI YA SE GUARDÓ EN ESTA SESIÓN
    if (localStorage.getItem(`diario_completado_${sesion.email}`)) {
        bloquearDiario();
    }

    // --- LÓGICA DE SELECCIÓN ---

    emocionPills.forEach(pill => {
        pill.addEventListener('click', () => {
            emocionPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            verificarYGuardar();
        });
    });

    sintomasPills.forEach(pill => {
        pill.addEventListener('click', () => {
            pill.classList.toggle('active');
            verificarYGuardar();
        });
    });

    flujoItems.forEach(item => {
        item.addEventListener('click', () => {
            flujoItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            verificarYGuardar();
        });
    });

    // --- FUNCIONES CORE ---

    function verificarYGuardar() {
        const emocion = document.querySelector('.diario-cards .card:nth-child(1) .pill.active');
        const sintomas = document.querySelectorAll('.diario-cards .card:nth-child(2) .pill.active');
        const flujo = document.querySelector('.circle-item.active');

        // Solo procedemos si hay al menos uno de cada sección
        if (emocion && sintomas.length > 0 && flujo) {
            const datosDiario = {
                usuario: sesion.email,
                emocion: emocion.textContent.trim(),
                sintomas: Array.from(sintomas).map(s => s.textContent.trim()),
                flujo: flujo.querySelector('span').textContent.trim(),
                fecha: new Date().toISOString()
            };

            // Guardar en el historial general
            const historial = JSON.parse(localStorage.getItem('historial_diario_aura')) || [];
            historial.push(datosDiario);
            localStorage.setItem('historial_diario_aura', JSON.stringify(historial));

            // Marcar como completado para este usuario
            localStorage.setItem(`diario_completado_${sesion.email}`, 'true');

            alert('¡Diario del día guardado! Gracias por registrar cómo te sientes.');
            bloquearDiario();
        }
    }

    function bloquearDiario() {
        // Añadimos un estilo visual de bloqueo
        diarioContainer.style.opacity = '0.6';
        diarioContainer.style.pointerEvents = 'none';

        // Opcional: Cambiar el título para avisar al usuario
        const tituloDiario = document.querySelector('.diario-section h2');
        if (tituloDiario) tituloDiario.textContent = 'Diario - Completado hoy ✅';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnLogout = document.querySelector('.btn-cerrar-sesión');

    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            // 1. Eliminar la sesión de LocalStorage
            localStorage.removeItem('sesion_actual_aura');

            // 2. Opcional: Mostrar un mensaje rápido antes de salir
            alert('Has cerrado sesión correctamente. ¡Vuelve pronto!');

            // 3. Redirigir al login
            // Ajusta la ruta según tu estructura de carpetas
            window.location.href = 'pages/login/login.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnAi = document.querySelector('.btn-ai');

    if (btnAi) {
        btnAi.addEventListener('click', () => {
            // Efecto visual de carga
            btnAi.textContent = 'Iniciando Aura AI...';
            btnAi.style.opacity = '0.7';
            window.location.href = 'pages/aIAssistant/aiassistant.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnVerMas = document.querySelector('.btn-ver-mas');

    if (btnVerMas) {
        btnVerMas.addEventListener('click', () => {
            // Cambia 'reporte.html' por la ruta de tu nueva pantalla
            window.location.href = 'pages/summary/summary.html';
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnAjustes = document.querySelector('button[title="Ajustes"]');
    const btnPerfil = document.querySelector('button[title="Perfil"]');
    const sesion = JSON.parse(localStorage.getItem('sesion_actual_aura'));

    if (btnAjustes) {
        btnAjustes.addEventListener('click', () => {
            alert('La configuración de la cuenta estará disponible próximamente.');
        });
    }

    if (btnPerfil) {
        btnPerfil.addEventListener('click', () => {
            if (sesion) {
                alert(`Perfil de Usuario:\nNombre: ${sesion.name}\nCorreo: ${sesion.email}`);
            } else {
                window.location.href = 'pages/login/login.html';
            }
        });
    }
});
