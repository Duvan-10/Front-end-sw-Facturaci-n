// ruta: Backend/controllers/auth.controller.js

import { createUser, findUserByIdentification, findUserByEmail, bcrypt } from '../models/user.model.js';
import jwt from 'jsonwebtoken';
// Cargar el secreto JWT desde las variables de entorno
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro_por_defecto'; 


// Controlador para el REGISTRO de un nuevo usuario
export const register = async (req, res) => {
    try {
        const { name, identification, email, password } = req.body;

        // 1. CONDICIÓN: Validar que la cédula no esté en la base de datos (REQUISITO PRINCIPAL)
        const existingUserByIdentification = await findUserByIdentification(identification);
        if (existingUserByIdentification) {
            // Retorna un error 409 (Conflict) si la cédula ya existe
            return res.status(409).json({ message: 'La identificación (Cédula) ya está registrada.' });
        }

        // Opcional: Validar que el email no esté ya registrado
        const existingUserByEmail = await findUserByEmail(email);
        if (existingUserByEmail) {
            return res.status(409).json({ message: 'El correo electrónico ya está en uso.' });
        }
        
        // 2. Guardar el nuevo usuario (la contraseña se encripta en el modelo)
        const userId = await createUser({ name, identification, email, password });

        // 3. Respuesta de éxito
        res.status(201).json({ 
            message: 'Usuario registrado con éxito',
            userId: userId
        });

    } catch (error) {
        console.error('Error en el registro de usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};


// Controlador para el LOGIN (Inicio de Sesión)
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario por email
        const user = await findUserByEmail(email);

        // 2. Verificar que el usuario exista y que la contraseña sea correcta
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Credenciales inválidas (correo o contraseña incorrectos).' });
        }

        // 3. Generar un Token JWT (Token de sesión)
        const token = jwt.sign(
            { id: user.id, email: user.email }, // Payload (datos del usuario)
            JWT_SECRET, 
            { expiresIn: '7d' } // Expira en 7 días
        );

        // 4. Respuesta de éxito, enviando el token y datos básicos del usuario al Frontend
        res.status(200).json({ 
            message: 'Login exitoso',
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                identification: user.identification
            }
        });

    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};