import express from 'express';
import { getStats, getAllUsers, getAllPosts, getAllComments, deleteUser, deletePost, deleteComment } from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', getStats);
router.get('/users', getAllUsers);
router.get('/posts', getAllPosts);
router.get('/comments', getAllComments);
router.delete('/users/:id', deleteUser);
router.delete('/posts/:id', deletePost);
router.delete('/comments/:id', deleteComment);

export default router;