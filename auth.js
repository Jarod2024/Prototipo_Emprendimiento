const API_URL = window.location.origin;

// --- REGISTRO Y LOGIN (Se mantienen igual) ---
// ... (Tus funciones de fetch aquí) ...

function verificarSesion() {
    const nombreGuardado = localStorage.getItem('usuarioNombre');
    const planGuardado = localStorage.getItem('planContratado');
    const botonIngresar = document.querySelector('a[href="login.html"]');

    if (nombreGuardado && botonIngresar) {
        const liPadre = botonIngresar.parentElement;
        
        liPadre.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px; font-family: 'Poppins', sans-serif;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #444; font-weight: 600; font-size: 0.85rem;">
                       Hola, <span style="color: #007bff;">${nombreGuardado}</span>
                    </span>
                    <button id="btnSalir" style="background:transparent; color:#ff4d4d; border:1px solid #ff4d4d; padding:2px 12px; border-radius:20px; font-size:0.7rem; font-weight:700; cursor:pointer; text-transform:uppercase;">Salir</button>
                </div>
                ${planGuardado ? `
                    <span style="background: #28a745; color: white; padding: 3px 10px; border-radius: 4px; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.5px;">
                        PLAN ACTIVO: ${planGuardado.toUpperCase()}
                    </span>
                ` : ''}
            </div>
        `;

        const btnSalir = document.getElementById('btnSalir');
        btnSalir.addEventListener('click', () => {
            localStorage.removeItem('usuarioNombre');
            localStorage.removeItem('planContratado');
            window.location.reload();
        });
    }
}

document.addEventListener('DOMContentLoaded', verificarSesion);