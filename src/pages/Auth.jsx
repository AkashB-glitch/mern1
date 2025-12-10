import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function Auth({ setCurrentPage }) {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginSubmit = (data) => {
    console.log("Login attempt:", data);
    alert("Login submitted! (This is a demo)");
    setTimeout(() => setCurrentPage('home'), 1000);
  };

  const handleSignupSubmit = (data) => {
    console.log("Signup attempt:", data);
    alert("Signup submitted! (This is a demo)");
    setTimeout(() => setCurrentPage('home'), 1000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-400 to-purple-500 p-4 flex items-center justify-center">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo Section */}
        <div className="text-center mb-8 text-white animate-slide-in">
          <div className="text-6xl mb-4">🌐</div>
          <h1 className="text-4xl font-bold mb-2">CommunityHub</h1>
          <p className="text-blue-100 text-lg">Join thousands of developers</p>
        </div>

        {/* Forms Container */}
        <div className="transform transition duration-300">
          {isLogin ? (
            <>
              <LoginForm onSubmit={handleLoginSubmit} />
              <div className="text-center mt-6 text-white">
                <p className="mb-2">Don't have an account?</p>
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-lg font-bold hover:underline transition duration-300"
                >
                  Create one now →
                </button>
              </div>
            </>
          ) : (
            <>
              <SignupForm onSubmit={handleSignupSubmit} />
              <div className="text-center mt-6 text-white">
                <p className="mb-2">Already have an account?</p>
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-lg font-bold hover:underline transition duration-300"
                >
                  Login here →
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-white text-sm">
          <p className="mb-2">Safe, Secure & Private</p>
          <div className="flex justify-center space-x-4 text-blue-100">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </main>
  );
}
