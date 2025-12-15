import express from 'express';
import { getProfile, updateProfile, getUserCount } from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', getProfile);
router.put('/update/:id', updateProfile);
router.get('/count', getUserCount);

export default router;
