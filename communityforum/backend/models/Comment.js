import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});


commentSchema.index({ postId: 1, createdAt: -1 });
commentSchema.index({ userId: 1 });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
