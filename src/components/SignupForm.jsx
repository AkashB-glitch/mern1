import React, { useState } from "react";
import api from "../api/config";

export default function SignupForm({ onSubmit }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    setLoading(true);
    try {
      const response = await api.post('/api/auth/signup', {
        username,
        email,
        password
      });
      
      if (response.data && response.data.user) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (onSubmit) {
          onSubmit({ username, email, password, user: response.data.user });
        }
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      console.error("Full signup error:", err);
      console.error("Error response:", err.response);
      console.error("Error message:", err.message);
      
      if (err.code === 'ECONNREFUSED') {
        setError("Cannot connect to server. Please make sure the backend is running on port 5001.");
      } else if (err.response?.status === 400) {
        setError(err.response.data.message || "Invalid signup data.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError(err.response?.data?.message || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-orange-100 mb-2">Join CommunityHub</h2>
        <p className="text-orange-200 dark:text-slate-300">Create your account and start connecting</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-white/90 dark:text-slate-200 font-medium mb-2 text-sm">
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-xl text-white placeholder-white/60 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-cyan-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                placeholder="Choose a username"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white/40 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-white/90 dark:text-slate-200 font-medium mb-2 text-sm">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/20 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-xl text-white placeholder-white/60 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-cyan-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                placeholder="your@email.com"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-white/40 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/90 dark:text-slate-200 font-medium mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/20 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-xl text-white placeholder-white/60 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-cyan-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-white/40 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-white/90 dark:text-slate-200 font-medium mb-2 text-sm">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/20 dark:bg-slate-700/50 border border-white/30 dark:border-slate-600/50 rounded-xl text-white placeholder-white/60 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white/50 dark:focus:ring-cyan-500/50 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-white/40 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-100 dark:text-red-200 text-sm p-4 rounded-xl backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}
        
        <div className="bg-white/10 dark:bg-slate-700/30 rounded-xl p-4 backdrop-blur-sm border border-white/20 dark:border-slate-600/30">
          <label className="flex items-start space-x-3 text-sm">
            <input 
              type="checkbox" 
              required 
              className="w-4 h-4 mt-0.5 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-white/50 focus:ring-2" 
            />
            <span className="text-white/80 dark:text-slate-300 leading-relaxed">
              I agree to the <a href="#" className="text-white hover:underline font-medium">Terms of Service</a> and <a href="#" className="text-white hover:underline font-medium">Privacy Policy</a>
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-white/30 hover:bg-white/40 dark:bg-slate-600/50 dark:hover:bg-slate-500/50 text-white font-medium rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/40 dark:border-slate-500/50 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Creating account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </div>
  );
}
