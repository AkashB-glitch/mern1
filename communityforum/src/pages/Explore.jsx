import React, { useState, useEffect } from "react";
import api from "../api/config";

export default function Explore({ setCurrentPage, setCategoryFilter }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingTopics();
  }, []);

  const fetchTrendingTopics = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/posts?sort=hot&limit=10');
      const trendingPosts = response.data.map(post => ({
        id: post._id,
        title: post.title,
        posts: (post.likes || 0) + (post.comments || 0) + Math.floor((post.views || 0) / 10),
        category: post.category || 'General Discussion'
      }));
      setTopics(trendingPosts);
    } catch (error) {
      console.error('Error fetching trending topics:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">Trending Topics</h2>
          <button 
            onClick={fetchTrendingTopics}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8 text-gray-500 dark:text-slate-400">Loading trending topics...</div>
        ) : topics.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-slate-400">No trending topics found</div>
        ) : (
          <div className="grid gap-4">
            {topics.map((t, index) => (
              <button
                key={t.id}
                onClick={() => {
                  setCategoryFilter && setCategoryFilter(t.category);
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full text-left p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-md transition flex justify-between items-center"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold text-blue-500 dark:text-cyan-400">#{index + 1}</div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-slate-100">{t.title}</div>
                    <div className="text-sm text-gray-500 dark:text-slate-400">Category: {t.category}</div>
                  </div>
                </div>
                <div className="text-xs bg-blue-100 dark:bg-slate-700 text-blue-700 dark:text-cyan-400 px-2.5 py-1 rounded-full font-bold">
                  {t.posts} engagement
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
