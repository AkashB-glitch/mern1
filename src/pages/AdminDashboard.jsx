import React, { useState, useEffect } from 'react';
import api from '../api/config';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'posts') fetchPosts();
    if (activeTab === 'comments') fetchComments();
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/comments');
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/api/admin/users/${userId}`);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const deletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/api/admin/posts/${postId}`);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        await api.delete(`/api/admin/comments/${commentId}`);
        fetchComments();
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-red-600 dark:text-red-400">Admin Dashboard</h1>
      
      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        {['overview', 'users', 'posts', 'comments'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium capitalize ${
              activeTab === tab 
                ? 'text-red-600 border-b-2 border-red-600' 
                : 'text-gray-600 hover:text-red-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-100">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.totalUsers || 0}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-100">Total Posts</h3>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">{stats.totalPosts || 0}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border dark:border-slate-700">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-slate-100">Total Comments</h3>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalComments || 0}</p>
          </div>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border dark:border-slate-700">
          <div className="p-4 border-b dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">User Management</h2>
          </div>
          {loading ? (
            <p className="p-4 text-gray-900 dark:text-slate-100">Loading users...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-slate-100">Username</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-slate-100">Email</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-slate-100">Role</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-slate-100">Joined</th>
                    <th className="px-4 py-3 text-left text-gray-900 dark:text-slate-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className="border-b dark:border-slate-700">
                      <td className="px-4 py-3 text-gray-900 dark:text-slate-100">{user.username}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-slate-100">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-gray-100 text-gray-800 dark:bg-slate-600 dark:text-slate-200'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-slate-100">{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        {user.role !== 'admin' && (
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border dark:border-slate-700">
          <div className="p-4 border-b dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Post Management</h2>
          </div>
          {loading ? (
            <p className="p-4 text-gray-900 dark:text-slate-100">Loading posts...</p>
          ) : (
            <div className="space-y-4 p-4">
              {posts.map(post => (
                <div key={post._id} className="border dark:border-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-slate-100">{post.title}</h3>
                      <p className="text-gray-600 dark:text-slate-400 text-sm">By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}</p>
                      <p className="text-gray-700 dark:text-slate-300 mt-2">{post.content?.substring(0, 200)}...</p>
                    </div>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm ml-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Comments Tab */}
      {activeTab === 'comments' && (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md border dark:border-slate-700">
          <div className="p-4 border-b dark:border-slate-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-100">Comment Management</h2>
          </div>
          {loading ? (
            <p className="p-4 text-gray-900 dark:text-slate-100">Loading comments...</p>
          ) : (
            <div className="space-y-4 p-4">
              {comments.map(comment => (
                <div key={comment._id} className="border dark:border-slate-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="text-gray-700 dark:text-slate-300">{comment.content}</p>
                      <p className="text-gray-600 dark:text-slate-400 text-sm mt-2">By {comment.author?.username} • {new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm ml-4"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}