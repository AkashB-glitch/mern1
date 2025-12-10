import React from "react";

function Sidebar({ setCurrentPage, setCategoryFilter }) {
  const categories = [
    { id: 1, name: "General Discussion",count: 1240 },
    { id: 2, name: "Web Development",count: 856 },
    { id: 3, name: "Mobile Apps",count: 645 },
    { id: 4, name: "AI & Machine Learning",count: 923 },
    { id: 5, name: "DevOps", count: 432 },
    { id: 6, name: "Off Topic", count: 2100 },
  ];

  return (
    <aside className="w-72 bg-white shadow-2xl h-screen p-6 sticky top-16 overflow-y-auto border-r border-gray-200">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Categories</h2>
        <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
      </div>

      {/* Category list */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => { setCategoryFilter && setCategoryFilter(cat.name); setCurrentPage('home'); }}
              className="w-full text-left flex items-center justify-between p-3 rounded-lg 
              bg-gradient-to-r from-gray-50 to-transparent
              hover:from-blue-50 hover:to-blue-100 
              hover:border-l-4 hover:border-blue-600
              transition duration-300 group cursor-pointer border-l-4 border-transparent"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl group-hover:scale-110 transition duration-300">{cat.icon}</span>
                <span className="font-medium text-gray-800 group-hover:text-blue-600 transition duration-300">
                  {cat.name}
                </span>
              </div>

              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-bold group-hover:bg-blue-200 transition duration-300">
                {cat.count}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="my-6 border-t border-gray-200"></div>

      {/* Quick Links */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center space-x-2">
          <span></span>
          <span>Quick Links</span>
        </h3>
        <ul className="space-y-2">
            <li>
              <button
                onClick={() => setCurrentPage('profile')}
                className="w-full text-left p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300 font-medium"
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentPage('profile')}
                className="w-full text-left p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300 font-medium"
              >
                Settings
              </button>
            </li>
        </ul>
      </div>

      {/* Stats */}
      
    </aside>
  );
}

export default Sidebar;
