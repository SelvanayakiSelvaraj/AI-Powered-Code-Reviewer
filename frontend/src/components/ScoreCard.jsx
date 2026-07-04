import React from 'react';
import { Activity } from 'lucide-react';

export default function ScoreCard({ score }) {
  const getScoreColor = () => {
    if (score >= 90) return 'text-success border-success/30';
    if (score >= 70) return 'text-warning border-warning/30';
    return 'text-error border-error/30';
  };

  const getScoreRing = () => {
    if (score >= 90) return 'stroke-success';
    if (score >= 70) return 'stroke-warning';
    return 'stroke-error';
  };

  const circumference = 2 * Math.PI * 36; // r=36
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card p-6 flex items-center justify-between col-span-1 md:col-span-2 lg:col-span-1">
      <div>
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <Activity className="w-5 h-5" />
          <h3 className="font-semibold">Quality Score</h3>
        </div>
        <p className="text-sm text-slate-500 max-w-[200px]">
          Based on readability, maintainability, and best practices.
        </p>
      </div>

      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="36"
            className="stroke-slate-800"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="36"
            className={`${getScoreRing()} transition-all duration-1000 ease-out`}
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className={`absolute text-2xl font-bold ${getScoreColor().split(' ')[0]}`}>
          {score}
        </div>
      </div>
    </div>
  );
}
