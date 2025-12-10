import React from "react";
import avatarImg from "../assets/avatar.jpg";

export default function Profile({ setCurrentPage }) {
  const user = {
    username: "Akash",
    email: "akash004@gmail.com",
    joinDate: "2023-01-15",
    bio: "normal guy who loves coding and community building.",
    posts: 24,
    comments: 156,
    likes: 40,
    avatar: avatarImg,
  };

  const userPosts = [
    { id: 1, title: "React Hooks Tutorial", date: "2024-12-01", likes: 45 },
    { id: 2, title: "Web Performance Tips", date: "2024-11-25", likes: 32 },
    { id: 3, title: "CSS Flexbox Guide", date: "2024-11-15", likes: 28 },
  ];

  return (
    <main className="flex-1 p-6 max-w-4xl">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in animate-slide-in"> 
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-6">
            <img
              src={user.avatar}
              alt="Profile avatar"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-transparent-100 shadow-md"
            />
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{user.username}</h1>
              <p className="text-white-600 font-medium mb-2">{user.email}</p>
              <p className="text-gray-700 text-lg max-w-md mb-3">{user.bio}</p>
              <p className="text-gray-600 text-sm">Joined {user.joinDate}</p>
            </div>
          </div>
            <button className="px-6 py-3 bg-transparent text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium">
              Edit Profile
            </button>
        </div>
      </div>

     

      {/* Recent Posts */}
      <div className="card animate-fade-in animate-slide-in">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center space-x-2">
          <span></span>
          <span>Recent Posts</span>
        </h2>
        <div className="space-y-4">
          {userPosts.map((post) => (
            <button
              key={post.id} 
              onClick={() => setCurrentPage('home')}
              className="w-full text-left p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-lg border-l-4 border-blue-500 hover:shadow-lg cursor-pointer transition duration-300 group animate-slide-in"
            >
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition duration-300 text-lg">{post.title}</h3>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{post.date}</span>
                <span className="font-semibold"> {post.likes} likes</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
