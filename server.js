const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ESTA LÍNEA ES CLAVE: Sirve tus archivos (index.html, registro.html, etc.)
app.use(express.static(__dirname)); 

// CONFIGURACIÓN DE POSTGRES (sa/sa)
const pool = new Pool({
    user: 'postgres', // Intenta con el usuario maestro
    host: 'localhost',
    database: 'mi_sistema',
    password: 'sa', 
    port: 5432,
});

// Prueba de conexión inmediata
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error("❌ ERROR DE CONEXIÓN A POSTGRES:", err.message);
    } else {
        console.log("✅ CONEXIÓN EXITOSA A POSTGRESQL");
    }
});

// RUTA DE REGISTRO
app.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3)',
            [nombre, email, hash]
        );
        res.json({ mensaje: "Usuario registrado con éxito" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al registrar (el email podría ya existir)" });
    }
});

// RUTA DE LOGIN
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        if (result.rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        const esValida = await bcrypt.compare(password, result.rows[0].password);
        if (esValida) {
            res.json({ mensaje: "¡Bienvenido!", nombre: result.rows[0].nombre });
        } else {
            res.status(401).json({ error: "Contraseña incorrecta" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// INICIAR SERVIDOR
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor listo en: http://localhost:${PORT}`);
});