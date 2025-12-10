import React, { useState } from "react";
import PostCard from "../components/PostCard";

export default function Home({ setCurrentPage, setSelectedPost, categoryFilter }) {
  const [activeFilter, setActiveFilter] = useState('new');
  
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: "What's the best approach for state management in React 2024?", 
      author: "Alex Chen",
      username: "@alexchen",
      content: "I'm working on a large-scale React application and wondering about the best state management solutions in 2024.", 
      likes: 142, 
      comments: 45,
      views: 1205,
      tag: "Question",
      tagColor: "yellow",
      date: "2 hours ago",
      timeAgo: "2 hours ago"
      ,category: 'Web Development'
    },
    { 
      id: 2, 
      title: "React 19 new features discussion", 
      author: "Sarah Miller", 
      username: "@sarahmiller",
      content: "Let's discuss the exciting new features coming in React 19 and how they'll impact our development workflow!", 
      likes: 234, 
      comments: 67,
      views: 2340,
      tag: "Discussion",
      tagColor: "blue",
      date: "5 hours ago",
      timeAgo: "5 hours ago"
      ,category: 'General Discussion'
    },
    { 
      id: 3, 
      title: "Best practices for Tailwind CSS in large projects", 
      author: "Mike Johnson", 
      username: "@mikej",
      content: "After working with Tailwind CSS on multiple large-scale projects, here are my top recommendations.", 
      likes: 189, 
      comments: 52,
      views: 1876,
      tag: "Guide",
      tagColor: "green",
      date: "1 day ago",
      timeAgo: "1 day ago"
      ,category: 'Web Development'
    },
    { 
      id: 4, 
      title: "AI in software development - The future is here", 
      author: "Emma Davis", 
      username: "@emmad",
      content: "Exploring how AI tools are revolutionizing the way we write code and solve problems.", 
      likes: 312, 
      comments: 89,
      views: 3450,
      tag: "Discussion",
      tagColor: "purple",
      date: "2 days ago",
      timeAgo: "2 days ago"
      ,category: 'AI & Machine Learning'
    },
  ]);

  const trendingTopics = [
    { id: 1, title: "React 19 new features discussion", posts: 234 },
    { id: 2, title: "Best practices for Tailwind CSS", posts: 189 },
    { id: 3, title: "AI in software development", posts: 156 },
    { id: 4, title: "TypeScript tips and tricks", posts: 143 },
    { id: 5, title: "Web performance optimization", posts: 128 },
  ];

  return (
    <main className="w-full bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative px-8 py-16 overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(120deg, rgba(255, 0, 0, 0.3), rgba(0, 0, 255, 0.3)),url("https://img.freepik.com/premium-vector/three-hands-holding-each-other-join-hands-together-teamwork-friendship-concept-vector_274258-543.jpg?w=1480")',
          backgroundSize: 'contain',
          backgroundPosition: 'right',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="max-w-7xl mx-auto relative">
          <h1 className="text-5xl font-bold text-white mb-4">Join the Conversation</h1>
          <p className="text-white text-lg mb-8 max-w-2xl">
            Connect with thousands of passionate people. Share ideas, ask questions, and build meaningful connections in our thriving community.
          </p>
          <div className="flex gap-4 mb-12">
            <button
              onClick={() => {
                // navigate to explore in the same tab and sync URL hash so direct links work
                window.location.hash = 'explore';
                setCurrentPage('explore');
              }}
              className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              About US
            </button>
            
          </div>
          
          {/* Stats */}
          <div className="flex gap-16">
            <div>
              <div className="flex items-center gap-2 text-white mb-1">
                <span className="text-2xl"></span>
                <span className="text-3xl font-bold">24</span>
              </div>
              <p className="text-teal-100 text-sm">Active Members</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white mb-1">
                <span className="text-2xl"></span>
                <span className="text-3xl font-bold">128</span>
              </div>
              <p className="text-teal-100 text-sm">Discussions</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white mb-1">
                <span className="text-2xl"></span>
                <span className="text-3xl font-bold">98%</span>
              </div>
              <p className="text-teal-100 text-sm">Response Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Posts Section */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Posts</h2>
            
            {/* Filter Tabs */}
            <div className="flex gap-6 mb-6 border-b border-gray-200 pb-0">
              <button 
                onClick={() => setActiveFilter('hot')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-large transition relative ${
                  activeFilter === 'hot' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  Hot
                </span>
                {activeFilter === 'hot' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900 "></div>}
              </button>
              <button 
                onClick={() => setActiveFilter('new')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-medium transition relative ${
                  activeFilter === 'new' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                   New
                </span>
                {activeFilter === 'new' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900"></div>}
              </button>
              <button 
                onClick={() => setActiveFilter('top')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-medium transition relative ${
                  activeFilter === 'top' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  Top
                </span>
                {activeFilter === 'top' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900"></div>}
              </button>
              <button 
                onClick={() => setActiveFilter('rising')}
                style={{backgroundColor:'transparent'}}
                className={`pb-3 font-medium transition relative ${
                  activeFilter === 'rising' 
                    ? 'text-red-500' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="flex items-center gap-2">
                   Rising
                </span>
                {activeFilter === 'rising' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900"></div>}
              </button>
            </div>

            {/* Posts List */}
            <div className="space-y-0 bg-white rounded-lg border border-gray-200 overflow-hidden">
              {posts
                .filter((p) => !categoryFilter || p.category === categoryFilter)
                .map((post, index) => (
                <div 
                  key={post.id} 
                  onClick={() => {
                    setSelectedPost && setSelectedPost(post);
                    setCurrentPage('postDetail');
                  }}
                  className={`flex gap-4 p-4 hover:bg-gray-50 transition cursor-pointer ${
                    index !== posts.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  {/* Vote Section */}
                  <div className="flex flex-col items-center gap-1 pt-1">
                    <button className="text-gray-400 hover:text-orange-500 transition text-lg">▲</button>
                    <span className="font-semibold text-gray-700 text-sm">{post.likes}</span>
                    <button className="text-gray-400 hover:text-blue-500 transition text-lg">▼</button>
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
                        {post.tag === 'Question' ? '?' : post.tag === 'Discussion' ? '•' : '•'} {post.tag}
                      </span>
                      <span className="text-gray-700 text-sm font-medium">{post.author}</span>
                      <span className="text-gray-400 text-xs">{post.username}</span>
                      <span className="text-gray-400 text-xs">• {post.timeAgo}</span>
                    </div>
                    
                    <h3 className="text-base font-semibold text-gray-900 mb-3 hover:text-teal-600 transition">
                      {post.title}
                    </h3>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        {post.comments}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Sidebar */}
          <div className="w-80">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden sticky top-20">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  <span></span>
                  Trending Now
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={topic.id}
                    onClick={() => setCurrentPage('explore')}
                    className="w-full text-left p-4 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-semibold text-gray-400 min-w-[20px]">{index + 1}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm mb-1 hover:text-teal-600 transition">
                          {topic.title}
                        </h4>
                        <p className="text-xs text-gray-500">{topic.posts} posts</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
