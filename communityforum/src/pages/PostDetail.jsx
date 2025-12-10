import React, { useState } from "react";
import Comment from "../components/Comment";

export default function PostDetail({ setCurrentPage, selectedPost }) {
  const post = selectedPost || {
    id: 1,
    title: "Best Practices for Building React Applications",
    author: "Alice Johnson",
    date: "2024-12-08",
    content: `React is an amazing library for building user interfaces. When building applications, 
    it's important to follow best practices to ensure maintainability and performance. Some key practices include:
    
    1. Keep components small and focused
    2. Use hooks properly (useState, useEffect, etc.)
    3. Avoid prop drilling with Context API
    4. Use memoization when needed
    5. Keep your state as local as possible
    
    I've been using React for 5 years and these practices have helped me build scalable applications.`,
    likes: 45,
    comments: [
      {
        id: 1,
        author: "Bob Smith",
        date: "2024-12-08",
        content: "Great post! I especially agree with keeping components small. It makes testing much easier.",
      },
      {
        id: 2,
        author: "Charlie Brown",
        date: "2024-12-07",
        content: "Thanks for this! I'm new to React and these tips are really helpful.",
      },
    ],
  };

  const [comments, setComments] = useState(post.comments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        date: "now",
        content: newComment,
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <button
        onClick={() => setCurrentPage('home')}
        className="mb-6 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
      >
        ← Back to Posts
      </button>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{post.title}</h1>
        <div className="flex justify-between items-center text-gray-600 mb-4 pb-4 border-b">
          <div>
            <p className="font-semibold">{post.author}</p>
            <p className="text-sm">{post.date}</p>
          </div>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition">
              Like ({post.likes})
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition">
              Bookmark
            </button>
          </div>
        </div>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">{post.content}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Comments ({comments.length})</h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="4"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Comment
          </button>
        </div>

        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </main>
  );
}
