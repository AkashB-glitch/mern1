import Post from '../models/Post.js';

export const getAllPosts = async (req, res) => {
  try {
    const { category, sort } = req.query;
    const query = category ? { category } : {};
    
    let sortOption = { createdAt: -1 }; // Default: newest first
    
    // Determine sorting based on filter type
    switch (sort) {
      case 'hot':
        // Sort by engagement score (likes + comments + views)
        sortOption = { 
          $expr: { 
            $add: [
              { $ifNull: ['$likes', 0] },
              { $ifNull: ['$comments', 0] },
              { $multiply: [{ $ifNull: ['$views', 0] }, 0.1] }
            ]
          }
        };
        break;
      case 'top':
        // Sort by likes (highest first)
        sortOption = { likes: -1, createdAt: -1 };
        break;
      case 'rising':
        // Sort by recent posts with good engagement (last 7 days)
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        query.createdAt = { $gte: weekAgo };
        sortOption = { likes: -1, views: -1, createdAt: -1 };
        break;
      case 'new':
      default:
        // Sort by creation date (newest first)
        sortOption = { createdAt: -1 };
        break;
    }
    
    let posts;
    if (sort === 'hot') {
      // For hot posts, use aggregation pipeline
      posts = await Post.aggregate([
        { $match: query },
        {
          $addFields: {
            hotScore: {
              $add: [
                { $ifNull: ['$likes', 0] },
                { $ifNull: ['$comments', 0] },
                { $multiply: [{ $ifNull: ['$views', 0] }, 0.1] }
              ]
            }
          }
        },
        { $sort: { hotScore: -1, createdAt: -1 } },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'userInfo'
          }
        },
        {
          $addFields: {
            userId: {
              username: { $arrayElemAt: ['$userInfo.username', 0] },
              email: { $arrayElemAt: ['$userInfo.email', 0] }
            }
          }
        },
        { $unset: ['userInfo', 'hotScore'] }
      ]);
    } else {
      posts = await Post.find(query)
        .sort(sortOption)
        .populate('userId', 'username email')
        .lean();
    }
    
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findById(id)
      .populate('userId', 'username email')
      .lean();
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    
    await Post.findByIdAndUpdate(id, { $inc: { views: 1 } });
    post.views = (post.views || 0) + 1;
    
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Error fetching post" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, content, category, author, username, tag, tagColor, userId } = req.body;
    
    console.log('Creating post with data:', { title, content, category, author, username, tag, tagColor, userId });
    
    if (!title || !content || !category) {
      return res.status(400).json({ message: "Title, content, and category are required" });
    }
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    // Validate userId format
    if (!userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    const newPost = new Post({
      title,
      content,
      category,
      author: author || "Anonymous",
      username: username || "@anonymous",
      tag: tag || "Discussion",
      tagColor: tagColor || "blue",
      userId
    });
    
    await newPost.save();
    
    const populatedPost = await Post.findById(newPost._id)
      .populate('userId', 'username email')
      .lean();
    
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    console.error("Error details:", error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error creating post: " + error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('userId', 'username email')
      .lean();
    
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Error updating post" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedPost = await Post.findByIdAndDelete(id).lean();
    
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.json({ message: "Post deleted successfully", post: deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Error deleting post" });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    )
      .populate('userId', 'username email')
      .lean();
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.json(post);
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ message: "Error liking post" });
  }
};

export const getPostCount = async (req, res) => {
  try {
    const count = await Post.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error getting post count:', error);
    res.status(500).json({ message: 'Error getting post count' });
  }
};

export const getReactions = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json({
      reactions: post.reactions || {
        '👍': 0, '❤️': 0, '😂': 0, '😮': 0, '😢': 0, '🔥': 0
      }
    });
  } catch (error) {
    console.error('Error getting reactions:', error);
    res.status(500).json({ message: 'Error getting reactions' });
  }
};

export const updateReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { emoji, action } = req.body;
    
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    if (!post.reactions) {
      post.reactions = { '👍': 0, '❤️': 0, '😂': 0, '😮': 0, '😢': 0, '🔥': 0 };
    }
    
    if (action === 'add') {
      post.reactions[emoji] = (post.reactions[emoji] || 0) + 1;
    } else if (action === 'remove' && post.reactions[emoji] > 0) {
      post.reactions[emoji] -= 1;
    }
    
    await post.save();
    
    res.json({ reactions: post.reactions });
  } catch (error) {
    console.error('Error updating reaction:', error);
    res.status(500).json({ message: 'Error updating reaction' });
  }
};


