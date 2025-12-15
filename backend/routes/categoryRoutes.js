import express from 'express';
import { getCategoryStats } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/stats', getCategoryStats);

export default router;