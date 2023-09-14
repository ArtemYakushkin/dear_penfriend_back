import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';
import { createComment } from '../controllers/commentsControllers.js';

const router = new Router();

// Create Comment
// http://localhost:3002/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;