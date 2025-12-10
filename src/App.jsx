import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import Explore from './pages/Explore';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPost, setSelectedPost] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState(null);

  useEffect(() => {
    // If URL hash is present (e.g. #explore), set page accordingly so new tabs can open directly
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setCurrentPage(hash);
    }
    const onHashChange = () => {
      const h = window.location.hash.replace('#', '');
      if (h) setCurrentPage(h);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} categoryFilter={categoryFilter} />;
      case 'postDetail':
        return <PostDetail setCurrentPage={setCurrentPage} selectedPost={selectedPost} />;
      case 'profile':
        return <Profile setCurrentPage={setCurrentPage} />;
      case 'auth':
        return <Auth setCurrentPage={setCurrentPage} />;
      case 'explore':
        return <Explore setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} categoryFilter={categoryFilter} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header setCurrentPage={setCurrentPage} setSelectedPost={setSelectedPost} />
      <div className="flex bg-gray-50">
        <Sidebar setCurrentPage={setCurrentPage} setCategoryFilter={setCategoryFilter} />
        <div className="flex-1">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;
