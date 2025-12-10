import React, { useState } from 'react';

function ThreadDetail({ thread }) {
  const [replies, setReplies] = useState([
    {
      id: 1,
      author: 'Sarah Chen',
      avatar: '👩‍💼',
      content: 'Great question! I\'ve been using React for 3 years now and I think the best practice is to keep components small and focused. Try breaking down complex components into smaller, reusable ones.',
      date: '2 hours ago',
      likes: 23,
      replies: 5,
    },
    {
      id: 2,
      author: 'Mike Wilson',
      avatar: '👨‍💻',
      content: 'Don\'t forget to use React.memo for performance optimization. It can make a huge difference in large applications.',
      date: '1 hour ago',
      likes: 18,
      replies: 3,
    },
  ]);

  const [replyText, setReplyText] = useState('');

  const handleReplySubmit = () => {
    if (replyText.trim()) {
      const newReply = {
        id: replies.length + 1,
        author: 'You',
        avatar: '😊',
        content: replyText,
        date: 'now',
        likes: 0,
        replies: 0,
      };
      setReplies([...replies, newReply]);
      setReplyText('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Thread Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{thread.title}</h1>
        <div className="flex items-center justify-between text-sm text-gray-600 pb-4 border-b">
          <div className="flex items-center space-x-4">
            <span className="text-xl">👤 Started by User</span>
            <span>📅 {thread.lastPost}</span>
          </div>
          <div className="flex space-x-4">
            <span>💬 {thread.replies} replies</span>
            <span>👁️ {thread.views} views</span>
          </div>
        </div>
      </div>

      {/* Original Post */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-blue-500">
        <div className="flex items-start space-x-4">
          <div className="text-4xl">👤</div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-gray-800">John Developer</h3>
                <p className="text-sm text-gray-600">Posted 3 hours ago</p>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Original Post</span>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hey everyone! I'm working on a large React application and I'm struggling with best practices. 
              Could someone share their approach to structuring components and managing state? 
              I've been using Redux but I'm not sure if that's the best choice anymore.
            </p>
            <div className="flex space-x-4 pt-4 border-t">
              <button className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1">
                <span>👍</span>
                <span>Helpful</span>
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1">
                <span>💬</span>
                <span>Reply</span>
              </button>
              <button className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1">
                <span>🔖</span>
                <span>Bookmark</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{replies.length} Replies</h2>
        {replies.map((reply) => (
          <div key={reply.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{reply.avatar}</div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-gray-800">{reply.author}</h3>
                    <p className="text-sm text-gray-600">{reply.date}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {reply.content}
                </p>
                <div className="flex space-x-4 pt-4 border-t">
                  <button className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1">
                    <span>👍</span>
                    <span>{reply.likes}</span>
                  </button>
                  <button className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1">
                    <span>💬</span>
                    <span>Reply</span>
                  </button>
                  <button className="text-gray-600 hover:text-blue-600 transition flex items-center space-x-1">
                    <span>🔖</span>
                    <span>Bookmark</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Form */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Post a Reply</h3>
        <textarea
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Share your thoughts and insights..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows="5"
        />
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm text-gray-600">Markdown formatting is supported</p>
          <button
            onClick={handleReplySubmit}
            disabled={!replyText.trim()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Post Reply
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreadDetail;
