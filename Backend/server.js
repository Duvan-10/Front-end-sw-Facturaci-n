// Backend/server.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config'; 
import { testConnection } from './models/db.js';
import authRoutes from './routes/auth.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Permite peticiones desde el Frontend (localhost:5173)
app.use(express.json()); // Permite leer el body de las peticiones en formato JSON

// Conexión de prueba a la base de datos al inicio
testConnection(); 

// Rutas
app.use('/api/auth', authRoutes); // Todas las rutas de autenticación irán bajo /api/auth

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API de PFEPS funcionando!');
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});