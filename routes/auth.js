import { Router } from 'express';
import { register, login, getMe } from '../controllers/authControllers.js';
import { checkAuth } from '../utils/checkAuth.js';
const router = new Router();

// Register
// http://localhost:3002/auth/register
router.post('/register', register);

// Login
// http://localhost:3002/auth/login
router.post('/login', login);

// Get Me
// http://localhost:3002/auth/me
router.get('/me', checkAuth, getMe);

export default router;