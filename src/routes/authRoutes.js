// routes/authRoutes.js
import express from 'express';
import { login, signup } from '../controllers/authController.js';
import { signupAdmin, loginAdmin } from '../controllers/adminAuth.js'

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/admin/signup', signupAdmin);
router.post('/admin/login', loginAdmin);
 
export default router;
