import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Create Post
export const createPost = async (req, res) => {
    try {
        const { title, text } = req.body;
        const user = await User.findById(req.userId);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newPostWithImage = new Post({
                firstName: user.firstName,
                lastName: user.lastName,
                occupation: user.occupation,
                picturePath: user.picturePath,
                title,
                text,
                imgUrl: fileName,
                author: req.userId,
                likes: {},
            });

            await newPostWithImage.save();

            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImage },
            });

            return res.status(201).json(newPostWithImage);
        }

        const newPostWithoutImage = new Post({
            firstName: user.firstName,
            lastName: user.lastName,
            occupation: user.occupation,
            picturePath: user.picturePath,
            title,
            text,
            imgUrl: '',
            author: req.userId,
            likes: {},
        });

        await newPostWithoutImage.save();

        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImage },
        });

        res.status(201).json(newPostWithoutImage);

    } catch (error) {
        res.status(409).json({ message: 'Post not added.' });
    }
}

// Get All Posts
export const getAll = async (req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt');
        const popularPosts = await Post.find().limit(5).sort('-views');

        if (!posts) {
            return res.json({ message: 'No posts' });
        }

        res.status(201).json({ posts, popularPosts });

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Get Post By Id
export const getById = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        });
        res.status(201).json(post);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Get My Posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            })
        );

        res.status(201).json(list);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Remove post
export const removePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.json({ message: 'This post does not exist.' });

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        });

        res.status(200).json({ message: 'The post has been deleted.' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update post
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body;
        const post = await Post.findById(id);

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));
            post.imgUrl = fileName || '';
        }

        post.title = title;
        post.text = text;

        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Create Comment
export const createComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { value } = req.body;

        const post = await Post.findById(id);

        post.comments.push(value);

        const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

        res.json(updatePost);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Get Post Comments
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            }),
        );
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Post like
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;

        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if (isLiked) {
            post.likes.delete(userId);
        } else {
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(201).json(updatedPost);

    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};