import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body;
        const user = await User.findById(req.userId);

        if (!comment) {
            return res.json({ message: 'Comment cannot be empty' });
        }
            
        const newComment = new Comment({
            comment,
            firstName: user.firstName,
            lastName: user.lastName
        });

        await newComment.save();

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            });
        } catch (error) {
            console.log(error);
        }

        res.status(200).json(newComment);
    } catch (error) {
        res.status(409).json({ message: 'Comment not added.' });
    }
};