import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Community Forum</h1>
      <div className="space-x-4">
        <button className="hover:bg-blue-500 px-3 py-1 rounded">Home</button>
        <button className="hover:bg-blue-500 px-3 py-1 rounded">Create Post</button>
        <button className="hover:bg-blue-500 px-3 py-1 rounded">Login</button>
      </div>
    </nav>
  );
}
