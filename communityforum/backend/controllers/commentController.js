import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const getCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params;
    
    const comments = await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .populate('userId', 'username email')
      .lean();
    
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, author, username, userId } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }
    
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    
    // Verify post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    const newComment = new Comment({
      postId,
      content,
      author: author || "Anonymous",
      username: username || "@anonymous",
      userId
    });
    
    await newComment.save();
    
    
    await Post.findByIdAndUpdate(postId, { $inc: { comments: 1 } });
    
    const populatedComment = await Comment.findById(newComment._id)
      .populate('userId', 'username email')
      .lean();
    
    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment" });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )
      .populate('userId', 'username email')
      .lean();
    
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    res.json(updatedComment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedComment = await Comment.findByIdAndDelete(id).lean();
    
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    
    // Decrement comment count on post
    await Post.findByIdAndUpdate(
      deletedComment.postId,
      { $inc: { comments: -1 } }
    );
    
    res.json({ message: "Comment deleted successfully", comment: deletedComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment" });
  }
};


