import React, { useState, useEffect } from "react";
import api from "../api/config";
import PostCard from "../components/PostCard";
import EmojiReactions from "../components/EmojiReactions";

export default function Home({ setCurrentPage, setSelectedPost, categoryFilter }) {
  const [activeFilter, setActiveFilter] = useState('new');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ members: 0, discussions: 0, responseRate: 0 });
  
  useEffect(() => {
    fetchPosts();
    fetchStats();
    fetchTrendingTopics();
  }, [categoryFilter, activeFilter]);

  // Refresh posts when returning to home page
  useEffect(() => {
    const handleFocus = () => {
      if (window.location.hash === '#home' || !window.location.hash) {
        fetchPosts();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);
  
  const fetchPosts = async () => {
    try {
      setLoading(true);
      let url = '/api/posts';
      const params = new URLSearchParams();
      
      if (categoryFilter) {
        params.append('category', categoryFilter);
      }
      
      // Add sorting parameter based on active filter
      switch (activeFilter) {
        case 'hot':
          params.append('sort', 'hot'); // Sort by likes + comments + views
          break;
        case 'new':
          params.append('sort', 'new'); // Sort by creation date (newest first)
          break;
        case 'top':
          params.append('sort', 'top'); // Sort by likes (highest first)
          break;
        case 'rising':
          params.append('sort', 'rising'); // Sort by recent activity
          break;
        default:
          params.append('sort', 'new');
      }
      
      if (params.toString()) {
        url += '?' + params.toString();
      }
      
      const response = await api.get(url);
      if (response.data) {
        setPosts(response.data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchStats = async () => {
    try {
      const [usersRes, postsRes] = await Promise.all([
        api.get('/api/users/count'),
        api.get('/api/posts/count')
      ]);
      
      const memberCount = usersRes.data?.count || 0;
      const discussionCount = postsRes.data?.count || 0;
      const responseRate = discussionCount > 0 ? Math.min(95, Math.round((discussionCount * 0.8) + 15)) : 0;
      
      setStats({
        members: memberCount,
        discussions: discussionCount,
        responseRate: responseRate
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ members: 0, discussions: 0, responseRate: 0 });
    }
  };

  const handleDeletePost = async (postId, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    
    try {
      await api.delete(`/api/admin/posts/${postId}`);
      fetchPosts(); // Refresh posts list
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
  
  const triggerAnimation = () => {
    const page = document.getElementById('page-container')
    if (!page) return

    // toggle the actual animation class defined in CSS
    page.classList.remove('puff-in-tl')
    void page.offsetWidth
    page.classList.add('puff-in-tl')
  }

  const [trendingTopics, setTrendingTopics] = useState([]);

  const fetchTrendingTopics = async () => {
    try {
      const response = await api.get('/api/posts?sort=hot&limit=5');
      const hotPosts = response.data.map(post => ({
        id: post._id,
        title: post.title,
        posts: (post.likes || 0) + (post.comments || 0) + Math.floor((post.views || 0) / 10)
      }));
      setTrendingTopics(hotPosts);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
    }
  };

  return (
    <main id="page-container" className="w-full bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(255, 0, 0, 0.3), rgba(0, 0, 255, 0.3)),url("https://img.freepik.com/premium-vector/three-hands-holding-each-other-join-hands-together-teamwork-friendship-concept-vector_274258-543.jpg?w=1480")',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto relative">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">Join the Conversation</h1>
          <p className="text-white text-base sm:text-lg mb-6 lg:mb-8 max-w-2xl">
            Connect with thousands of passionate people. Share ideas, ask questions, and build meaningful connections in our thriving community.
          </p>
          <div className="flex gap-4 mb-12">
            <button
              onClick={() => {
                // navigate to the About page and trigger the page animation
                window.location.hash = 'about';
                setCurrentPage('about');
                triggerAnimation();
              }}
              className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              About US
            </button>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap gap-8 sm:gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-2 text-white mb-1">
                <span className="text-xl sm:text-2xl font-bold">{stats.members}</span>
              </div>
              <p className="text-teal-100 text-xs sm:text-sm">Active Members</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white mb-1">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.discussions}</span>
              </div>
              <p className="text-teal-100 text-xs sm:text-sm">Discussions</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white mb-1">
                <span className="text-xl sm:text-2xl lg:text-3xl font-bold">{stats.responseRate}%</span>
              </div>
              <p className="text-teal-100 text-xs sm:text-sm">Response Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Posts Section */}
          <div className="flex-1">
            <div className="mb-4 lg:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Latest Posts</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex gap-4 sm:gap-6 mb-4 lg:mb-6 border-b border-gray-200 pb-0 overflow-x-auto">
              <button 
                onClick={() => setActiveFilter('hot')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-medium transition relative cursor-pointer ${
                  activeFilter === 'hot' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  🔥 Hot
                </span>
                {activeFilter === 'hot' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900"></div>}
              </button>
              <button 
                onClick={() => setActiveFilter('new')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-medium transition relative cursor-pointer ${
                  activeFilter === 'new' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  ✨ New
                </span>
                {activeFilter === 'new' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900"></div>}
              </button>
              <button 
                onClick={() => setActiveFilter('top')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-medium transition relative cursor-pointer ${
                  activeFilter === 'top' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  ⭐ Top
                </span>
                {activeFilter === 'top' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900"></div>}
              </button>
              <button 
                onClick={() => setActiveFilter('rising')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-medium transition relative cursor-pointer ${
                  activeFilter === 'rising' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  📈 Rising
                </span>
                {activeFilter === 'rising' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900"></div>}
              </button>
            </div>

            {/* Posts List */}
            <div className="space-y-0 bg-white rounded-lg border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="p-8 text-center text-gray-900">Loading posts...</div>
              ) : posts.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-900 mb-4">No posts found. Be the first to create one!</p>
                  <button 
                    onClick={() => setCurrentPage('newpost')}
                    className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-600 transition"
                  >
                    Create Post
                  </button>
                </div>
              ) : (
                posts.map((post, index) => (
                <div 
                  key={post._id || post.id} 
                  onClick={() => {
                    setSelectedPost && setSelectedPost(post);
                    setCurrentPage('postDetail');
                    window.location.hash = 'postDetail';
                  }}
                  className={`flex gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gray-50 transition cursor-pointer ${
                    index !== posts.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {/* Vote Section - Hidden on mobile */}
                  <div className="hidden sm:flex flex-col items-center gap-1 pt-1">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle upvote
                      }}
                      className="text-gray-400 hover:text-orange-500 transition text-lg p-1"
                    >
                      ▲
                    </button>
                    <span className="font-semibold text-gray-900 text-sm">{post.likes || 0}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle downvote
                      }}
                      className="text-gray-400 hover:text-blue-500 transition text-lg p-1"
                    >
                      ▼
                    </button>
                    {isAdmin() && (
                      <button 
                        onClick={(e) => handleDeletePost(post._id || post.id, e)}
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
                        {post.tag === 'Question' ? '?' : post.tag === 'Discussion' ? '•' : '•'} {post.tag || 'Discussion'}
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
                    
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-3 sm:gap-4 text-xs text-gray-600">
                        <span className="flex items-center gap-1">
                          💬 {post.comments || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          👁️ {post.views || 0}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPost && setSelectedPost(post);
                            setCurrentPage('postDetail');
                          }}
                          className="text-blue-500 hover:text-blue-700 dark:text-cyan-400 dark:hover:text-cyan-300 transition text-xs font-medium"
                        >
                          View Comments
                        </button>
                        {/* Mobile vote buttons */}
                        <div className="flex sm:hidden items-center gap-2 ml-auto">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              // Handle upvote
                            }}
                            className="text-gray-400 hover:text-orange-500 transition p-1"
                          >
                            ▲ {post.likes || 0}
                          </button>
                          {isAdmin() && (
                            <button 
                              onClick={(e) => handleDeletePost(post._id || post.id, e)}
                              className="text-red-500 hover:text-red-700 transition p-1 text-xs"
                              title="Delete Post"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Emoji Reactions */}
                      <div onClick={(e) => e.stopPropagation()}>
                        <EmojiReactions postId={post._id || post.id} />
                      </div>
                    </div>
                  </div>
                </div>
                ))
              )}
            </div>
          </div>

          {/* Trending removed: full-width posts section */}
        </div>
      </div>
      

      

    </main>
  );
}
