import React, { useState, useEffect } from 'react';
import api from '../api/config';

export default function EmojiReactions({ postId }) {
  const [reactions, setReactions] = useState({
    '👍': 0,
    '❤️': 0,
    '😂': 0,
    '😮': 0,
    '😢': 0,
    '🔥': 0
  });
  
  const [userReaction, setUserReaction] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (postId) {
      fetchReactions();
    }
  }, [postId]);

  const fetchReactions = async () => {
    try {
      const response = await api.get(`/api/posts/${postId}/reactions`);
      if (response.data) {
        setReactions(response.data.reactions);
      }
    } catch (error) {
      console.error('Error fetching reactions:', error);
    }
  };

  const handleReaction = async (emoji) => {
    try {
      const action = userReaction === emoji ? 'remove' : 'add';
      const response = await api.post(`/api/posts/${postId}/reactions`, {
        emoji,
        action
      });
      
      if (response.data) {
        setReactions(response.data.reactions);
        setUserReaction(action === 'add' ? emoji : null);
      }
    } catch (error) {
      console.error('Error updating reaction:', error);
    }
    setShowPicker(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2 flex-wrap">
        {Object.entries(reactions).map(([emoji, count]) => (
          <button
            key={emoji}
            onClick={() => handleReaction(emoji)}
            className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs transition-all duration-200 ${
              userReaction === emoji
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500 scale-110'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <span className={userReaction === emoji ? 'animate-bounce' : ''}>{emoji}</span>
            <span className="text-gray-600 dark:text-gray-300 font-medium">{count}</span>
          </button>
        ))}
        
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <span className="text-gray-500 dark:text-gray-400">+</span>
        </button>
      </div>

      {showPicker && (
        <div className="absolute top-full left-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-600 p-2 z-10">
          <div className="flex space-x-1">
            {Object.keys(reactions).map(emoji => (
              <button
                key={emoji}
                onClick={() => handleReaction(emoji)}
                className="w-8 h-8 rounded hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center transition-all duration-200 hover:scale-125"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}