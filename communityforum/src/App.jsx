import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Explore from './pages/Explore';
import About from './pages/About';
import NewPost from './pages/NewPost';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('auth');
  const [selectedPost, setSelectedPost] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
      setIsAuthenticated(true);
      setCurrentPage('home');
    }
    
    // If URL hash is present (e.g. #explore), set page accordingly so new tabs can open directly
    const hash = window.location.hash.replace('#', '');
    if (hash && isAuthenticated) {
      setCurrentPage(hash);
    }
    const onHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h && isAuthenticated) setCurrentPage(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [isAuthenticated]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} categoryFilter={categoryFilter} />;
      case 'postDetail':
        return <PostDetail setCurrentPage={setCurrentPage} selectedPost={selectedPost} />;
      case 'profile':
        return <Profile setCurrentPage={setCurrentPage} key={currentUser?.id || currentUser?.email} />;
      case 'auth':
        return <Auth setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />;
      case 'explore':
        return <Explore setCurrentPage={setCurrentPage} setCategoryFilter={setCategoryFilter} />;
      case 'newpost':
        return <NewPost setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'admin':
        return <AdminDashboard setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} categoryFilter={categoryFilter} />;
    }
  };

  // If not authenticated, show only the auth page
  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-white">
        <Auth setCurrentPage={setCurrentPage} setIsAuthenticated={setIsAuthenticated} />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-white">
      <Header setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} setCategoryFilter={setCategoryFilter} setIsAuthenticated={setIsAuthenticated} setCurrentUser={setCurrentUser} />
      <div className="flex bg-gray-50">
        <Sidebar setCurrentPage={setCurrentPage} setCategoryFilter={setCategoryFilter} />
          <div className="flex-1">
            <div id="page-container">
              {renderPage()}
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
