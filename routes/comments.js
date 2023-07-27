import { Router } from 'express';
const router = new Router();
import { checkAuth } from '../utils/checkAuth.js';
import { createComment } from '../controllers/commentsControllers.js';

// Create Comment
// http://localhost:3002/comments/:id
router.post('/:id', checkAuth, createComment);

export default router;