import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        occupation: { type: String },
        title: { type: String, required: true },
        text: { type: String, required: true },
        imgUrl: { type: String, default: '' },
        views: { type: Number, default: 0 },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        likes: { type: Map, of: Boolean },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
        picturePath: { type: String },
    },
    { timestamps: true },
);

export default mongoose.model('Post', PostSchema);