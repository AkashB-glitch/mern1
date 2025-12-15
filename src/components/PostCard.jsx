import React from 'react';

export default function PostCard({ post, onClick, onDelete, isAdmin }) {
  return (
    <div 
      onClick={onClick}
      className="flex gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 transition cursor-pointer border-b border-gray-100"
    >
      {/* Vote Section - Hidden on mobile */}
      <div className="hidden sm:flex flex-col items-center gap-1 pt-1">
        <button className="text-gray-400 hover:text-orange-500 transition text-lg p-1">
          ▲
        </button>
        <span className="font-semibold text-gray-900 text-sm">{post.likes || 0}</span>
        <button className="text-gray-400 hover:text-blue-500 transition text-lg p-1">
          ▼
        </button>
        {isAdmin && (
          <button 
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition text-sm p-1 mt-2"
            title="Delete Post"
          >
            Delete
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
            post.tagColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            post.tagColor === 'blue' ? 'bg-blue-100 text-blue-800' :
            post.tagColor === 'green' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {post.tag === 'Question' ? '?' : '•'} {post.tag || 'Discussion'}
          </span>
          <span className="text-gray-900 text-sm font-medium">{post.author || 'Anonymous'}</span>
          <span className="hidden sm:inline text-gray-600 text-xs">{post.username || '@user'}</span>
          <span className="text-gray-500 text-xs">• {post.timeAgo || new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 hover:text-teal-600 transition line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-gray-700 text-sm mb-3 line-clamp-2 hidden sm:block">
          {post.content?.substring(0, 150)}...
        </p>
        
        <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            💬 {post.comments || 0}
          </span>
          <span className="flex items-center gap-1">
            👁️ {post.views || 0}
          </span>
          {/* Mobile vote buttons */}
          <div className="flex sm:hidden items-center gap-2 ml-auto">
            <button className="text-gray-400 hover:text-orange-500 transition p-1">
              ▲ {post.likes || 0}
            </button>
            {isAdmin && (
              <button 
                onClick={onDelete}
                className="text-red-500 hover:text-red-700 transition p-1 text-xs"
                title="Delete Post"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}