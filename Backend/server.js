// Backend/server.js

// 1. Importar dotenv y configurarlo CON LA RUTA CORRECTA
import * as dotenv from 'dotenv';
dotenv.config({ path: './Backend/.env' }); 

// 2. Importar el resto de librerías
import express from 'express';
import cors from 'cors';
import { testConnection } from './models/db.js';
import authRoutes from './routes/auth.routes.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión de prueba a la base de datos
testConnection(); 

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('API de PFEPS funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express escuchando en http://localhost:${PORT}`);
});
