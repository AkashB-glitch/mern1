import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostCount,
  getReactions,
  updateReaction
} from '../controllers/postController.js';

const router = express.Router();

router.get('/count', getPostCount);
router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.get('/:id/reactions', getReactions);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.post('/:id/like', likePost);
router.post('/:id/reactions', updateReaction);

export default router;


