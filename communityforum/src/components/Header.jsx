import React from "react";
import profileImg from "../assets/avatar.jpg";

export default function Header({ setCurrentPage, setSelectedPost }) {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-6 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center gap-8">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setSelectedPost && setSelectedPost(null);
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-500 text-white rounded-lg flex items-center justify-center font-bold text-xl">
            <img src="https://img.freepik.com/premium-vector/logo-community-service_695276-3141.jpg" alt="logo" className="w-20 h-20" />
          </div>
         <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
  Forumpage
</h1>

        </div>
        
        <nav className="flex items-center gap-1">
         

          <button
  onClick={() => {
    setSelectedPost && setSelectedPost(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }}
  className="px-4 py-2  text-yellow-600 hover:bg-gray-900 font-medium transition border-b-2 border-teal-500 rounded-lg shadow-sm nav-btn"
>
  Home
</button>

            <button className="px-4 py-2 text-gray-800 hover:text-teal-600 font-medium transition bg-white rounded-lg shadow-sm nav-btn">
              Categories
            </button>
            <button className="px-4 py-2 text-gray-800 hover:text-teal-600 font-medium transition bg-white rounded-lg shadow-sm nav-btn">
              Trending
            </button>
            <button className="px-4 py-2 text-gray-800 hover:text-teal-600 font-medium transition bg-white rounded-lg shadow-sm nav-btn">
              Recent
            </button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search discussions"
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-64 text-gray-700"
          />
          
        </div>
        
        <button
        style={{backgroundColor:'white'}}
         className="relative p-2 text-yellow-600 hover:text-teal-600 transition">
          <span className="text-xl">notifications</span>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button 
          onClick={() => setCurrentPage('newpost')}
          style={{ backgroundColor: '#ffffff' }}
          className="bg-teal-500 text-yellow px-4 py-2 rounded-lg font-semibold hover:bg-teal-600 transition shadow-sm flex items-center gap-2"
        >
          New Post
        </button>
        
        <img
          src={profileImg}
          alt="Profile"
          onClick={() => setCurrentPage('profile')}
          className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 ring-teal-900 transition"
        />
      </div>
    </header>
  );
}