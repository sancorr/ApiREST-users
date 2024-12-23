import express from 'express';
import { registerUser, loginUser, listUsers } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/register', registerUser);


router.post('/login', loginUser);


router.get('/users', authMiddleware, listUsers);

export default router;
