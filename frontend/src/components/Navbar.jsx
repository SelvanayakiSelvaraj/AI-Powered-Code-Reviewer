import React, { useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Code2, History, LayoutDashboard, User, LogOut, LogIn, UserPlus, BarChart2, Sun, Moon } from "lucide-react";
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isActive = (path) => {
    return location.pathname === path 
      ? "bg-slate-800 text-white" 
      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800/50";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-surface/80 backdrop-blur-md border-b border-slate-300 dark:border-slate-800 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary hover:text-blue-500 transition-colors">
          <Code2 className="w-6 h-6" />
          <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">AI Reviewer</span>
        </Link>
        
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link to="/dashboard" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive('/dashboard')}`}>
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link to="/history" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive('/history')}`}>
                <History className="w-4 h-4" />
                <span className="hidden sm:inline">History</span>
              </Link>
              <Link to="/analytics" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive('/analytics')}`}>
                <BarChart2 className="w-4 h-4" />
                <span className="hidden sm:inline">Analytics</span>
              </Link>
              <div className="w-px h-6 bg-slate-300 dark:bg-slate-700 mx-2"></div>
              
              <button onClick={toggleTheme} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <Link to="/profile" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${isActive('/profile')}`}>
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </Link>
              <button onClick={logout} className="px-3 py-2 rounded-lg text-sm font-medium text-error hover:bg-error/10 transition-all flex items-center gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <button onClick={toggleTheme} className="p-2 mr-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors">
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <Link to="/login" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Log in
              </Link>
              <Link to="/signup" className="btn-primary text-sm py-2 flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
