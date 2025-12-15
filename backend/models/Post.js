import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['General Discussion', 'Web Development', 'Mobile Apps', 'AI & Machine Learning', 'DevOps', 'Off Topic']
  },
  tag: {
    type: String,
    default: 'Discussion',
    enum: ['Question', 'Discussion', 'Guide', 'Announcement']
  },
  tagColor: {
    type: String,
    default: 'blue',
    enum: ['yellow', 'blue', 'green', 'purple']
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for better query performance
postSchema.index({ category: 1, createdAt: -1 });
postSchema.index({ userId: 1 });

const Post = mongoose.model('Post', postSchema);

export default Post;
