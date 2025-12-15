import React, { useState } from 'react';
import api from '../api/config';

export default function NewPost({ setCurrentPage }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General Discussion');
  const [tag, setTag] = useState('Discussion');
  const [tagColor, setTagColor] = useState('blue');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // Get user from localStorage
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : null;
      
      if (!user || !user._id) {
        setError('You must be logged in to create a post.');
        return;
      }
      
      const response = await api.post('/api/posts', {
        title,
        content,
        category,
        tag,
        tagColor,
        author: user.username || 'Anonymous',
        username: user.username ? `@${user.username.toLowerCase()}` : '@anonymous',
        userId: user._id
      });
      
      if (response.data) {
        alert('Post created successfully!');
        setTitle('');
        setContent('');
        setCategory('General Discussion');
        setTag('Discussion');
        setTagColor('blue');
        if (setCurrentPage) {
          setCurrentPage('home');
          window.location.hash = 'home';
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
      console.error('Error creating post:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 ring-1 ring-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Create New Post</h2>
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Title</label>
            <input 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required
              placeholder="Enter your post title..."
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Category</label>
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option>General Discussion</option>
              <option>Web Development</option>
              <option>Mobile Apps</option>
              <option>AI & Machine Learning</option>
              <option>DevOps</option>
              <option>Off Topic</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Post Type</label>
            <select 
              value={tag} 
              onChange={e => {
                setTag(e.target.value);
                const colors = {
                  'Question': 'yellow',
                  'Discussion': 'blue',
                  'Guide': 'green',
                  'Announcement': 'purple'
                };
                setTagColor(colors[e.target.value] || 'blue');
              }} 
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              <option>Question</option>
              <option>Discussion</option>
              <option>Guide</option>
              <option>Announcement</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Content</label>
            <textarea 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              rows={8} 
              required
              placeholder="Write your post content here..."
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-3 text-gray-900 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-vertical"
            ></textarea>
          </div>

          <div className="flex items-center gap-3">
            <button 
              type="submit" 
              disabled={loading} 
              className="px-6 py-3 bg-teal-500 text-white rounded-md hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition"
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
            <button 
              type="button" 
              onClick={() => setCurrentPage && setCurrentPage('home')} 
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
