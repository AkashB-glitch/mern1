import React, { useState, useEffect } from "react";
import api from "../api/config";

function Sidebar({ setCurrentPage, setCategoryFilter }) {
  const [categories, setCategories] = useState([
    { name: "General Discussion", count: 0 },
    { name: "Web Development", count: 0 },
    { name: "Mobile Apps", count: 0 },
    { name: "AI & Machine Learning", count: 0 },
    { name: "DevOps", count: 0 },
    { name: "Off Topic", count: 0 },
  ]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    fetchCategoryStats();
  }, []);

  const fetchCategoryStats = async () => {
    try {
      const response = await api.get('/api/categories/stats');
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching category stats:', error);
    }
  };

  return (
    <aside className={`${isCollapsed ? 'w-16' : 'w-72'} bg-white shadow-2xl h-screen p-6 sticky top-16 overflow-y-auto border-r border-gray-200 transition-all duration-300`}>
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-4 right-4 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <span className="text-lg">{isCollapsed ? '→' : '←'}</span>
      </button>
      
      {/* Title */}
      {!isCollapsed && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Categories</h2>
          <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
        </div>
      )}

      {/* Category list */}
      <ul className="space-y-2">
        {categories.map((cat, index) => (
          <li key={index}>
            <button
              onClick={() => { setCategoryFilter && setCategoryFilter(cat.name); setCurrentPage('home'); }}
              className={`w-full text-left flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} p-3 rounded-lg 
              bg-gradient-to-r from-gray-50 to-transparent
              hover:from-blue-50 hover:to-blue-100 
              hover:border-l-4 hover:border-blue-600
              transition duration-300 group cursor-pointer border-l-4 border-transparent`}
              title={isCollapsed ? cat.name : ''}
            >
              <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
                <span className="text-2xl group-hover:scale-110 transition duration-300">{cat.icon}</span>
                {!isCollapsed && (
                  <span className="font-medium text-gray-800 group-hover:text-blue-600 transition duration-300">
                    {cat.name}
                  </span>
                )}
              </div>

              {!isCollapsed && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold group-hover:bg-blue-200 transition duration-300">
                  {cat.count}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200 dark:border-slate-700"></div>




      
    </aside>
  );
}

export default Sidebar;
