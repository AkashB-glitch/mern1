import React, { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ setCurrentPage, setSelectedPost, setCategoryFilter, setIsAuthenticated, setCurrentUser }) {
  const [isDark, setIsDark] = useState(() => {
    try { return document.documentElement.classList.contains('dark'); } catch (e) { return false; }
  });
  const [currentUser, setCurrentUserState] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Get current user from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUserState(JSON.parse(user));
    }
    
    // Listen for localStorage changes
    const handleStorageChange = () => {
      const updatedUser = localStorage.getItem('user');
      if (updatedUser) {
        setCurrentUserState(JSON.parse(updatedUser));
      } else {
        setCurrentUserState(null);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events when profile is updated
    const handleProfileUpdate = (event) => {
      if (event.detail) {
        setCurrentUserState(event.detail);
      }
    };
    
    window.addEventListener('profileUpdated', handleProfileUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const obs = new MutationObserver(() => {
      setIsDark(root.classList.contains('dark'));
    });
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => obs.disconnect();
  }, []);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const fetchNotifications = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;
      
      const userData = JSON.parse(user);
      const response = await fetch(`http://localhost:5001/api/posts?limit=5&sort=new`);
      const posts = await response.json();
      
      const recentNotifications = posts.slice(0, 3).map(post => ({
        id: post._id,
        message: `New post: ${post.title}`,
        time: new Date(post.createdAt).toLocaleString(),
        type: 'post'
      }));
      
      setNotifications(recentNotifications);
      setNotificationCount(recentNotifications.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={`${isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200 text-black'} py-3 px-4 lg:px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm`}>
      <div className="flex items-center gap-4 lg:gap-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setSelectedPost && setSelectedPost(null);
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg overflow-hidden">
            <img 
              src="http://timetoplay.com/wp-content/uploads/2016/12/community.jpg" 
              alt="CommunityHub Logo" 
              className="w-full h-full object-cover"
            />
          </div>
         <h1 className="text-2xl lg:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
  Forumpage
</h1>

        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => {
              setSelectedPost && setSelectedPost(null);
              setCategoryFilter && setCategoryFilter(null);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:text-teal-600 font-medium transition bg-white dark:bg-gray-700 rounded-lg shadow-sm nav-btn cursor-pointer"
          >
            Home
          </button>

          <button
            onClick={() => {
              setCategoryFilter && setCategoryFilter(null);
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:text-teal-600 font-medium transition bg-white dark:bg-gray-700 rounded-lg shadow-sm nav-btn cursor-pointer"
          >
            Categories
          </button>
          <button
            onClick={() => {
              setCategoryFilter && setCategoryFilter(null);
              setCurrentPage('explore');
              window.location.hash = 'explore';
            }}
            className="px-4 py-2 text-gray-800 dark:text-gray-200 hover:text-teal-600 font-medium transition bg-white dark:bg-gray-700 rounded-lg shadow-sm nav-btn cursor-pointer"
          >
            Trending
          </button>
        </nav>
      </div>
      
      <div className="flex items-center gap-2 lg:gap-4">
        {/* Search - Hidden on mobile */}
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search discussions"
            className="pl-10 pr-4 py-2 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-48 lg:w-64 text-gray-700 placeholder-gray-400"
          />
        </div>
        
        {/* Notification Button */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-yellow-600 hover:text-teal-600 transition bg-white dark:bg-gray-700 rounded-md cursor-pointer"
          >
            <span className="text-sm lg:text-base">🔔</span>
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          
          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                    No new notifications
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div key={notification.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600">
                      <p className="text-sm text-gray-900 dark:text-white">{notification.message}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                    </div>
                  ))
                )}
                <div className="p-4 text-center">
                  <button 
                    onClick={() => {
                      setNotifications([]);
                      setNotificationCount(0);
                      setShowNotifications(false);
                    }}
                    className="text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Desktop Buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage('newpost')}
            className="bg-teal-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition shadow-sm flex items-center gap-2 cursor-pointer"
          >
            New Post
          </button>
          
          {(() => {
            const user = localStorage.getItem('user');
            const userData = user ? JSON.parse(user) : null;
            return userData?.role === 'admin' ? (
              <button 
                onClick={() => setCurrentPage('admin')}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow-sm"
              >
                Admin
              </button>
            ) : null;
          })()}
          
          <button 
            onClick={() => {
              localStorage.removeItem('user');
              setCurrentUser(null);
              setIsAuthenticated(false);
              setCurrentPage('auth');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition shadow-sm"
          >
            Logout
          </button>
        </div>
        
        <ThemeToggle />

        {/* Profile Avatar */}
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="Profile"
            onClick={() => setCurrentPage('profile')}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full object-cover cursor-pointer hover:ring-2 ring-teal-900 transition"
          />
        ) : (
          <div 
            onClick={() => setCurrentPage('profile')}
            className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gray-300 flex items-center justify-center cursor-pointer hover:ring-2 ring-teal-900 transition"
          >
            <span className="text-xs lg:text-sm text-gray-600">{currentUser?.username?.charAt(0)?.toUpperCase() || '?'}</span>
          </div>
        )}
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden">
          <div className="flex flex-col p-4 space-y-2">
            <button
              onClick={() => {
                setSelectedPost && setSelectedPost(null);
                setCategoryFilter && setCategoryFilter(null);
                setCurrentPage('home');
                setShowMobileMenu(false);
              }}
              className="text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage('newpost');
                setShowMobileMenu(false);
              }}
              className="text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              New Post
            </button>
            <button
              onClick={() => {
                setCurrentPage('explore');
                setShowMobileMenu(false);
              }}
              className="text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Trending
            </button>
            {(() => {
              const user = localStorage.getItem('user');
              const userData = user ? JSON.parse(user) : null;
              return userData?.role === 'admin' ? (
                <button
                  onClick={() => {
                    setCurrentPage('admin');
                    setShowMobileMenu(false);
                  }}
                  className="text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                >
                  Admin Panel
                </button>
              ) : null;
            })()}
            <button
              onClick={() => {
                localStorage.removeItem('user');
                setCurrentUser(null);
                setIsAuthenticated(false);
                setCurrentPage('auth');
                setShowMobileMenu(false);
              }}
              className="text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}