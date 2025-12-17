import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Comment from './models/Comment.js';

dotenv.config();

const viewData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const userCount = await User.countDocuments();
    const postCount = await Post.countDocuments();
    const commentCount = await Comment.countDocuments();

    console.log('\n📊 DATABASE STATS:');
    console.log(`Users: ${userCount}`);
    console.log(`Posts: ${postCount}`);
    console.log(`Comments: ${commentCount}`);

    console.log('\n👥 RECENT USERS:');
    const users = await User.find().limit(5).select('username email role');
    users.forEach(user => console.log(`- ${user.username} (${user.email}) - ${user.role}`));

    console.log('\n📝 RECENT POSTS:');
    const posts = await Post.find().limit(5).select('title author category');
    posts.forEach(post => console.log(`- ${post.title} by ${post.author}`));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

viewData();