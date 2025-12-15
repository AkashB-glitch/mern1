import React from "react";

export default function Comment({ comment }) {
  return (
    <div className="card animate-fade-in border-l-4 border-green-500 hover:shadow-lg mb-4 group transition duration-300">
      <div className="flex justify-between items-start mb-3">
        <div>
          <p className="font-bold text-gray-800 dark:text-slate-100 group-hover:text-green-600 transition duration-200">
            {comment.author}
          </p>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">⏱️ {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : comment.date ? new Date(comment.date).toLocaleDateString() : 'Recently'}</p>
        </div>
        <button className="text-gray-400 dark:text-slate-400 hover:text-red-500 transition text-xl font-bold">×</button>
      </div>
      <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-4">{comment.content}</p>
      <div className="flex space-x-4 pt-3 border-t border-gray-200 dark:border-slate-600">
        <button className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center space-x-1 group">
          <span>👍</span>
          <span className="group-hover:font-semibold">Like</span>
        </button>
        <button className="text-sm text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center space-x-1 group">
          <span>💬</span>
          <span className="group-hover:font-semibold">Reply</span>
        </button>
        <button className="text-sm text-gray-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition flex items-center space-x-1 group">
          <span></span>
          <span className="group-hover:font-semibold">Report</span>
        </button>
      </div>
    </div>
  );
}
