import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function Auth({ setCurrentPage, setIsAuthenticated, setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  
  console.log('Auth component props:', { setCurrentPage, setIsAuthenticated, setCurrentUser });

  const handleLoginSubmit = (data) => {
    console.log("Login successful:", data);
    // User is already stored in localStorage by LoginForm
    try {
      if (setCurrentUser && typeof setCurrentUser === 'function') {
        setCurrentUser(data.user);
      }
      setIsAuthenticated(true);
      setCurrentPage('home');
    } catch (error) {
      console.error('Error in handleLoginSubmit:', error);
      // Still proceed with authentication even if setCurrentUser fails
      setIsAuthenticated(true);
      setCurrentPage('home');
    }
  };

  const handleSignupSubmit = (data) => {
    console.log("Signup successful:", data);
    // User is already stored in localStorage by SignupForm
    try {
      if (setCurrentUser && typeof setCurrentUser === 'function') {
        setCurrentUser(data.user);
      }
      setIsAuthenticated(true);
      setCurrentPage('home');
    } catch (error) {
      console.error('Error in handleSignupSubmit:', error);
      // Still proceed with authentication even if setCurrentUser fails
      setIsAuthenticated(true);
      setCurrentPage('home');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-300 to-yellow-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main Container */}
        <div className="relative backdrop-blur-sm bg-white/10 dark:bg-slate-800/20 rounded-3xl border border-white/20 dark:border-slate-700/50 shadow-2xl p-8 animate-fade-in">
          {/* Logo Section */}
          <div className="text-center mb-10 animate-slide-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 dark:bg-slate-700/50 rounded-2xl mb-6 backdrop-blur-sm overflow-hidden">
              <img 
                src="http://timetoplay.com/wp-content/uploads/2016/12/community.jpg" 
                alt="CommunityHub Logo" 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">CommunityHub</h1>
            <p className="text-white/80 dark:text-slate-300">Connect with developers worldwide</p>
          </div>

          {/* Forms Container */}
          <div className="space-y-6">
            {isLogin ? (
              <>
                <LoginForm onSubmit={handleLoginSubmit} />
                <div className="text-center pt-6 border-t border-white/20 dark:border-slate-700/50">
                  <p className="text-white/80 dark:text-slate-300 mb-3">New to CommunityHub?</p>
                  <button
                    onClick={() => setIsLogin(false)}
                    className="inline-flex items-center px-6 py-2 bg-white/20 hover:bg-white/30 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 text-white rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/30 dark:border-slate-600/50"
                  >
                    Create Account
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </button>
                </div>
              </>
            ) : (
              <>
                <SignupForm onSubmit={handleSignupSubmit} />
                <div className="text-center pt-6 border-t border-white/20 dark:border-slate-700/50">
                  <p className="text-white/80 dark:text-slate-300 mb-3">Already have an account?</p>
                  <button
                    onClick={() => setIsLogin(true)}
                    className="inline-flex items-center px-6 py-2 bg-white/20 hover:bg-white/30 dark:bg-slate-700/50 dark:hover:bg-slate-600/50 text-white rounded-xl font-medium transition-all duration-300 backdrop-blur-sm border border-white/30 dark:border-slate-600/50"
                  >
                    Sign In
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-6 border-t border-white/20 dark:border-slate-700/50">
            <div className="flex items-center justify-center space-x-6 text-white/60 dark:text-slate-400 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Trusted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="text-center mt-6">
          <div className="flex justify-center space-x-6 text-white/60 dark:text-slate-400 text-sm">
            <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white dark:hover:text-slate-200 transition-colors">Help Center</a>
          </div>
        </div>
      </div>
    </main>
  );
}
