// Backend/models/db.js
import mysql from 'mysql2/promise';
// Importamos dotenv/config para cargar el archivo .env
import 'dotenv/config'; 

// Configuración de la conexión usando variables de entorno
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Función de prueba para verificar la conexión
export const testConnection = async () => {
    try {
        await pool.getConnection();
        console.log('🔗 Conexión a MySQL establecida y Pool creado correctamente.');
    } catch (error) {
        console.error('❌ Error fatal al conectar con MySQL:', error.message);
    }
};

// ⚠️ ¡ESTA LÍNEA ES VITAL! Exporta el pool por defecto.
export default pool;