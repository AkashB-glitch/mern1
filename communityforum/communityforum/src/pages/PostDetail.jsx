import React, { useState, useEffect } from "react";
import axios from "axios";
import Comment from "../components/Comment";
import api from "../api/config";

export default function PostDetail({ setCurrentPage, selectedPost }) {
  const [post, setPost] = useState(selectedPost || null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (selectedPost && selectedPost._id) {
      fetchPostAndComments(selectedPost._id);
    } else if (selectedPost && selectedPost.id) {
      fetchPostAndComments(selectedPost.id);
    }
  }, [selectedPost]);

  const fetchPostAndComments = async (postId) => {
    try {
      setLoading(true);
      const [postResponse, commentsResponse] = await Promise.all([
        axios.get(`http://localhost:5002/api/posts/${postId}`),
        axios.get(`http://localhost:5002/api/comments/post/${postId}`)
      ]);
      
      if (postResponse.data) {
        setPost(postResponse.data);
      }
      if (commentsResponse.data) {
        setComments(commentsResponse.data);
      }
    } catch (error) {
      console.error("Error fetching post details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !post) return;
    
    setCommentLoading(true);
    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      console.log('User data:', user);
      console.log('Post ID:', post._id || post.id);
      
      const commentData = {
        content: newComment,
        author: user?.username || "Anonymous",
        username: user?.username ? `@${user.username.toLowerCase()}` : "@anonymous",
        userId: user?._id || user?.id || "675a1234567890abcdef1234"
      };
      
      console.log('Sending comment data:', commentData);
      
      const response = await axios.post(`http://localhost:5002/api/comments/post/${post._id || post.id}`, commentData);
      
      console.log('Comment creation response:', response.data);
      
      if (response.data) {
        if (response.data) {
          setComments([response.data, ...comments]);
          setNewComment("");
          // Update post comment count
          if (post) {
            setPost({ ...post, comments: (post.comments || 0) + 1 });
          }
        }
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      console.error("Error details:", error.response?.data);
      alert(`Failed to add comment: ${error.response?.data?.message || error.message}`);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const response = await axios.post(`http://localhost:5002/api/posts/${post._id || post.id}/like`);
      if (response.data) {
        setPost({ ...post, likes: response.data.likes });
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDeletePost = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await api.delete(`/api/admin/posts/${post._id || post.id}`);
      alert('Post deleted successfully');
      setCurrentPage('home');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const isAdmin = () => {
    const user = localStorage.getItem('user');
    const userData = user ? JSON.parse(user) : null;
    return userData?.role === 'admin';
  };

  if (loading) {
    return (
      <main className="p-4 max-w-3xl mx-auto">
        <p>Loading post...</p>
      </main>
    );
  }

  if (!post) {
    return (
      <main className="p-4 max-w-3xl mx-auto">
        <button
          onClick={() => setCurrentPage('home')}
          className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          ← Back to Posts
        </button>
        <p>Post not found</p>
      </main>
    );
  }

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
      >
        ← Back to Posts
      </button>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6 border dark:border-slate-700">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-slate-100">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600 dark:text-slate-400 mb-4 pb-4 border-b dark:border-slate-600">
          <div>
            <p className="font-semibold text-gray-800 dark:text-slate-200">{post.author}</p>
            <p className="text-sm">{post.date}</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
            >
              Like ({post.likes || 0})
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition">
              Bookmark
            </button>
            {isAdmin() && (
              <button 
                onClick={handleDeletePost}
                className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition font-medium"
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-700 dark:text-slate-300 whitespace-pre-line leading-relaxed">{post.content}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 border dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-slate-100">Comments ({comments.length})</h2>
        
        <div className="mb-6 p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-cyan-500 resize-none bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder-gray-500 dark:placeholder-slate-400"
            rows="4"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim() || commentLoading}
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {commentLoading ? 'Posting...' : 'Post Comment'}
          </button>
        </div>

        <div>
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-slate-400 text-center py-4">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <Comment key={comment._id || comment.id || Math.random()} comment={{
                ...comment,
                author: comment.author || comment.userId?.username || 'Anonymous',
                content: comment.content || '',
                createdAt: comment.createdAt || comment.date
              }} />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
