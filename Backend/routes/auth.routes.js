// Backend/routes/auth.routes.js

import { Router } from 'express'; 
// ⬅️ Las funciones 'register' y 'login' se importan desde el controlador.
import { register, login } from '../controllers/auth.controller.js';

 const router = Router();  

// Rutas de Autenticación
// ⬅️ Solo usamos las funciones importadas aquí
router.post('/register', register); 
router.post('/login', login);

export default router;