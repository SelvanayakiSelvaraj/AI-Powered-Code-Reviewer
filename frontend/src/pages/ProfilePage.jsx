import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Mail, Hash, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  // Generate a gradient based on first letter for avatar
  const avatarGradients = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-cyan-500 to-blue-600',
  ];
  const gradientIndex = user.name.charCodeAt(0) % avatarGradients.length;
  const avatarGradient = avatarGradients[gradientIndex];

  return (
    <div className="max-w-2xl mx-auto p-6 pb-20 animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Profile</h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">

        <div className="px-8 py-8">
          <div className="flex items-center gap-5 mb-6">
            {/* Circular Avatar */}
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${avatarGradient} flex items-center justify-center text-white text-4xl font-extrabold shadow-lg border-4 border-white dark:border-slate-800 flex-shrink-0`}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{user.email}</p>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-semibold rounded-full border border-green-100 dark:border-green-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active Account
            </span>
          </div>

          {/* Info Fields */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Email Address</p>
                <p className="text-slate-900 dark:text-white font-medium">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-100 dark:border-slate-700">
                <Hash className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-0.5">Account ID</p>
                <p className="text-slate-900 dark:text-white font-mono text-sm break-all">{user._id}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
