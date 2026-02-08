const infoPlanes = {
    landing: {
        titulo: "Landing Page Profesional",
        precio: "$99 + IVA",
        imagen: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
        items: ["Una sola página (One Page)", "Botón WhatsApp siempre visible", "Optimización móvil", "Certificado SSL", "Entrega en 5 días"]
    },
    sucursal: {
        titulo: "Sucursal Digital Completa",
        precio: "$180 + IVA",
        imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
        items: ["Hasta 5 secciones", "Catálogo interactivo", "SEO en Google", "Correos corporativos", "Formulario directo"]
    },
    ecommerce: {
        titulo: "E-commerce Pro",
        precio: "$350 + IVA",
        imagen: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
        items: ["Tienda completa", "Carrito de compras", "Gestión de Inventario", "Pasarela de pagos", "Soporte 24/7"]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const planElegido = params.get('plan');
    const data = infoPlanes[planElegido];

    if (data) {
        document.getElementById('plan-titulo').innerText = data.titulo;
        document.getElementById('plan-precio').innerText = data.precio;
        document.getElementById('plan-imagen').src = data.imagen;
        
        const lista = document.getElementById('plan-lista');
        lista.innerHTML = "";
        data.items.forEach(item => {
            lista.innerHTML += `<li>✔ <strong>${item}</strong></li>`;
        });
        
        configurarPasarela(data.titulo, data.precio);
    } else {
        window.location.href = "index.html";
    }
});

function configurarPasarela(nombrePlan, precioPlan) {
    const modal = document.getElementById('modalPago');
    const btnAbrir = document.getElementById('btn-abrir-pago');
    const btnCancelar = document.getElementById('btnCancelar');
    const btnPagar = document.getElementById('btnFinalizarPago');
    const montoDisplay = document.getElementById('montoModal');

    if (btnAbrir) btnAbrir.onclick = () => {
        montoDisplay.innerText = precioPlan;
        modal.style.display = 'flex';
    };

    if (btnCancelar) btnCancelar.onclick = () => modal.style.display = 'none';

    if (btnPagar) {
        btnPagar.onclick = () => {
            btnPagar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando Tarjeta...';
            btnPagar.style.background = "#6c757d";
            btnPagar.disabled = true;

            setTimeout(() => {
                localStorage.setItem('planContratado', nombrePlan);
                alert("✅ PAGO APROBADO\n\nTu servicio de " + nombrePlan + " ha sido activado.");
                window.location.href = "index.html";
            }, 3000);
        };
    }

    // Formato automático de tarjeta (espacios cada 4 números)
    const cardInput = document.getElementById('numTarjeta');
    cardInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
    });
}