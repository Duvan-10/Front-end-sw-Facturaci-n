// Backend/models/user.model.js

// Importación local, ya que db.js está en la misma carpeta
import pool from './db.js'; 

// -------------------------------------------------------------------
// 1. Buscar usuario por Email (usada para Login y para verificar Registro)
// -------------------------------------------------------------------
// ¡Debe tener 'export const' para ser importada!
export const findUserByEmail = async (email) => {
    try {
        const [rows] = await pool.query('SELECT id, name, email, password FROM users WHERE email = ?', [email]);
        return rows[0]; 
    } catch (error) {
        console.error('Error en findUserByEmail:', error);
        throw error; 
    }
};

// -------------------------------------------------------------------
// 2. Crear un nuevo usuario (usada para Registro)
// -------------------------------------------------------------------
// ¡Debe tener 'export const' para ser importada!
export const createUser = async (name, email, hashedPassword) => {
    try {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        const [result] = await pool.query(query, [name, email, hashedPassword]);
        
        return { id: result.insertId, name, email }; 
    } catch (error) {
        console.error('Error en createUser:', error);
        throw error;
    }
};