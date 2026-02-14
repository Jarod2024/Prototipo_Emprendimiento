const API_URL = window.location.origin;

// --- Lógica para REGISTRO ---
const formRegistro = document.getElementById('formRegistro');
if (formRegistro) {
    formRegistro.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('regNombre').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPass').value;

        try {
            const res = await fetch(`${API_URL}/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });
            const data = await res.json();

            if (res.ok) {
                alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
                window.location.href = 'login.html';
            } else {
                alert("❌ Error: " + data.error);
            }
        } catch (error) {
            console.error("Error en registro:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}

// --- Lógica para LOGIN ---
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('logEmail').value;
        const password = document.getElementById('logPass').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                // Guardamos el nombre en el navegador
                localStorage.setItem('usuarioNombre', data.nombre); 
                alert("¡Bienvenido de nuevo, " + data.nombre + "!");
                window.location.href = 'index.html'; 
            } else {
                alert("❌ " + data.error);
            }
        } catch (error) {
            console.error("Error en login:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
}

// --- Lógica para VERIFICAR SESIÓN Y MOSTRAR PLAN ---
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