import React from "react";

export default function PostCard({ post }) {
  return (
    <div className="card animate-fade-in border-l-4 border-blue-500 hover:shadow-xl cursor-pointer group mb-4 transform transition duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition duration-200">
            {post.title}
          </h3>
          <p className="text-gray-500 text-sm mt-1">👤 {post.author}</p>
        </div>
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {post.date}
        </span>
      </div>
      <p className="text-gray-700 mb-4 line-clamp-2">{post.content}</p>
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div className="flex space-x-6 text-sm text-gray-600">
          <button className="hover:text-blue-600 transition flex items-center space-x-1 group">
            <span>👍</span>
            <span className="group-hover:font-bold">{post.likes}</span>
          </button>
          <button className="hover:text-blue-600 transition flex items-center space-x-1 group">
            <span>💬</span>
            <span className="group-hover:font-bold">{post.comments?.length || 0}</span>
          </button>
        </div>
        <button className="text-gray-400 hover:text-red-500 transition text-lg">
          ♡
        </button>
      </div>
    </div>
  );
}