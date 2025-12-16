import React, { useState } from "react";
import api from "../api/config";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password
      });
      
      if (response.data && response.data.user) {
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        if (onSubmit) {
          onSubmit({ email, password, user: response.data.user });
        }
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-white/70 dark:text-slate-300">Sign in to continue to CommunityHub</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-4">
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

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-white/80 dark:text-slate-300">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-white/30 bg-white/20 text-blue-600 focus:ring-white/50 focus:ring-2" 
            />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="#forgot" className="text-white/80 dark:text-slate-300 hover:text-white dark:hover:text-slate-100 transition-colors">
            Forgot password?
          </a>
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
              <span>Signing in...</span>
            </div>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;