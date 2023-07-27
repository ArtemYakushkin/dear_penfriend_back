import { Router } from 'express';
import { createPost, getAll, getById, getMyPosts, removePost, updatePost, getPostComments, likePost } from '../controllers/postsControllers.js';
import { checkAuth } from '../utils/checkAuth.js';
const router = new Router();

// Create Post
// http://localhost:3002/posts
router.post('/', checkAuth, createPost);

// Get All Posts
// http://localhost:3002/posts
router.get('/', getAll);

// Get Post By Id
// http://localhost:3002/posts/:id
router.get('/:id', getById);

// Update Post
// http://localhost:3002/posts/:id
router.put('/:id', checkAuth, updatePost);

// Get My Posts
// http://localhost:3002/posts/user/me
router.get('/user/me', checkAuth, getMyPosts);

// Remove Post
// http://localhost:3002/posts/:id
router.delete('/:id', checkAuth, removePost);

// Get Post Comments
// http://localhost:3002/posts/comments/:id
router.get('/comments/:id', getPostComments);

// Get Post Like
// http://localhost:3002/posts/:id/like
router.patch('/:id/like', checkAuth, likePost);


export default router;