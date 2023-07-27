import express from 'express';
import { getUser, updateUser } from '../controllers/userControllers.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

// Get User by Id
// http://localhost:3002/user/:id
router.get('/:id', getUser);

//Update user
// http://localhost:3002/user/:id
router.put('/:id', checkAuth, updateUser);

// router.get('/:id/friends', verifyToken, getUserFriends);
// router.patch('/:id/:friendId', verifyToken, addRemoveFriend);

export default router;