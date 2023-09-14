import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/post.js';
import userRoutes from './routes/user.js';
import commentRoute from './routes/comments.js'
import Post from './models/Post.js';
import { posts } from './db/postsList.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

// ROUTES

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoute);

// Start server

async function start() {
    try {
        await mongoose.connect(MONGO_URL);
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
        // Post.insertMany(posts);
    } catch (error) {
        console.log(error)
    }
}
start();