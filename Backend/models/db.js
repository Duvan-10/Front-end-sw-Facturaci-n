// Backend/models/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// ⚠️ CARGA CRÍTICA: Forzamos la lectura del .env ANTES de crear el pool
// Como ejecutas desde la raíz, la ruta es './Backend/.env'
dotenv.config({ path: './Backend/.env' });

// Verificación en consola (Opcional, para que veas si cargó)
console.log('🔍 Intentando conectar con Usuario:', process.env.DB_USER);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// Nueva función para buscar un usuario por email
export const getUserByEmail = async (email) => {
    let connection;
    try {
        // Obtenemos una conexión del pool
        connection = await pool.getConnection();
        
        // La consulta SQL busca el usuario por email
        const [rows] = await connection.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );
        
        // Devuelve el primer usuario encontrado (debería ser único) o undefined
        return rows[0];

    } catch (error) {
        console.error('Error al obtener usuario por email:', error);
        throw new Error('Error al buscar usuario en la base de datos.');
    } finally {
        // CRÍTICO: Devolver la conexión al pool
        if (connection) connection.release();
    }
};


export const testConnection = async () => {
    try {
        await pool.getConnection();
        console.log('🔗 Conexión a MySQL establecida y Pool creado correctamente.');
    } catch (error) {
        console.error('❌ Error fatal al conectar con MySQL:', error.message);
    }
};

export default pool;