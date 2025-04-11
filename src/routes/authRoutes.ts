import express from 'express';
import authController from '../controllers/authController';

const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/confirm', authController.confirmEmail);

export default router;