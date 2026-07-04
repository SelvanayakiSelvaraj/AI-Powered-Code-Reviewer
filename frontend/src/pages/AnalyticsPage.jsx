import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAnalytics } from '../services/api';
import { BarChart2, TrendingUp, Bug } from 'lucide-react';

export default function AnalyticsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const result = await getAnalytics();
        setData(result);
      } catch (err) {
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 mt-10">
        <div className="bg-error/10 border border-error/20 text-error p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center mt-20">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">No Analytics Data</h2>
        <p className="text-slate-500">Run some code reviews to see your progress here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20 animate-fade-in">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-primary/10 rounded-xl">
          <BarChart2 className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Performance Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your code quality improvements over your last {data.length} analyses.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Quality Score Chart */}
        <div className="card p-6 bg-white dark:bg-surface/40">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
            <TrendingUp className="w-5 h-5 text-green-500" />
            Quality Score Trend
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="qualityScore" name="Quality Score" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Issue Counts Chart */}
        <div className="card p-6 bg-white dark:bg-surface/40">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-800 dark:text-white">
            <Bug className="w-5 h-5 text-red-500" />
            Issues Detected
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="bugCount" name="Bugs" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="securityCount" name="Security" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimizationCount" name="Optimizations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
