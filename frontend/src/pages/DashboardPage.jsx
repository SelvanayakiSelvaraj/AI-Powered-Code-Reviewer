import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';
import { submitCodeReview } from '../services/api';
import { Bot, Bug, Clock, HardDrive, Shield, Zap, FileCode2, Code, Copy, Check, AlertTriangle, ExternalLink } from 'lucide-react';
import CodeMirror from '@uiw/react-codemirror';

const LANGUAGES = ['JavaScript', 'Python', 'Java', 'C', 'C++', 'SQL'];

// Dynamic color based on score
const getScoreColor = (score) => {
  if (score <= 40) return { ring: '#ef4444', text: 'text-red-400', bg: 'bg-red-400/20' };
  if (score <= 70) return { ring: '#f59e0b', text: 'text-yellow-400', bg: 'bg-yellow-400/20' };
  return { ring: '#22c55e', text: 'text-green-400', bg: 'bg-green-400/20' };
};

// Reusable analysis card
const AnalysisCard = ({ title, icon, items = [], type, emptyMessage }) => {
  const [copied, setCopied] = useState(false);

  const typeStyles = {
    error: 'border-red-500/30 bg-red-500/5',
    warning: 'border-yellow-500/30 bg-yellow-500/5',
    success: 'border-green-500/30 bg-green-500/5',
    info: 'border-blue-500/30 bg-blue-500/5',
  };
  const badgeStyles = {
    error: 'bg-red-500/20 text-red-400',
    warning: 'bg-yellow-500/20 text-yellow-400',
    success: 'bg-green-500/20 text-green-400',
    info: 'bg-blue-500/20 text-blue-400',
  };

  const hasItems = items && items.length > 0;

  const handleCopy = () => {
    if (!hasItems) return;
    navigator.clipboard.writeText(items.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border p-5 ${hasItems ? (typeStyles[type] || 'border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30') : 'border-green-500/30 bg-green-500/5'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900/60 rounded-lg">{hasItems ? icon : <Check className="w-4 h-4 text-green-400" />}</div>
          <h3 className="font-bold text-base text-slate-900 dark:text-white">{title}</h3>
        </div>
        {hasItems && (
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${badgeStyles[type] || 'bg-slate-700 text-slate-300'}`}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </span>
            <button onClick={handleCopy} className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        )}
      </div>
      
      {hasItems ? (
        <ul className="space-y-2">
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-3 text-sm items-start text-slate-700 dark:text-slate-300">
              <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-sm text-green-400 flex items-center gap-2">
          <span>{emptyMessage || "No issues detected. Looks great!"}</span>
        </div>
      )}
    </div>
  );
};

export default function DashboardPage() {
  const [code, setCode] = useState('// Paste your code here\n');
  const [language, setLanguage] = useState('JavaScript');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleReview = async () => {
    if (!code.trim() || code.trim() === '// Paste your code here') {
      setError("Please enter some code to review.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await submitCodeReview(language, code);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to analyze code");
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = result ? getScoreColor(result.qualityScore) : null;

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Code Reviewer</h1>
          <p className="text-slate-600 dark:text-slate-400">Analyze, optimize, and secure your code with AI.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-surface border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none"
          >
            {LANGUAGES.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          <button
            onClick={handleReview}
            disabled={loading}
            className="btn-primary min-w-[140px] flex items-center justify-center gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Bot className="w-5 h-5" /> Analyze</>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-lg mb-6 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
            <Code className="w-5 h-5 text-primary" />
            Source Code
          </div>
          <CodeEditor code={code} setCode={setCode} language={language} />
        </div>

        {/* Results */}
        <div className="flex flex-col gap-5 overflow-y-auto max-h-[80vh] pr-1">
          {!result && !loading && (
            <div className="flex flex-col items-center justify-center text-slate-500 bg-surface/30 rounded-xl border border-slate-800 border-dashed p-10 h-full min-h-[500px]">
              <FileCode2 className="w-16 h-16 text-slate-700 mb-4" />
              <p className="text-lg font-medium text-slate-800 dark:text-white">No results yet</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Click Analyze to get AI insights.</p>
            </div>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center text-primary bg-surface/30 rounded-xl border border-primary/20 border-dashed p-10 h-full min-h-[500px]">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                <Bot className="w-6 h-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <p className="text-lg font-medium text-slate-800 dark:text-white animate-pulse">AI is analyzing...</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Running deep code analysis.</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-5 animate-fade-in">
              {/* Score + Complexity */}
              <div className="grid grid-cols-2 gap-4">
                {/* Score Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 p-5 flex flex-col items-center justify-center gap-2 shadow-sm">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Quality Score</p>
                  <div className="relative flex items-center justify-center w-24 h-24">
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="10" fill="none" />
                      <circle
                        cx="50" cy="50" r="40"
                        stroke={scoreColor.ring}
                        strokeWidth="10"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.qualityScore / 100)}`}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 1s ease' }}
                      />
                    </svg>
                    <span className={`text-2xl font-bold z-10 ${scoreColor.text}`}>{result.qualityScore}</span>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${scoreColor.bg} ${scoreColor.text} font-medium`}>
                    {result.qualityScore <= 40 ? 'Poor' : result.qualityScore <= 70 ? 'Fair' : 'Good'}
                  </span>
                </div>

                {/* Complexity Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 p-5 flex flex-col justify-center gap-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-secondary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Time</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">{result.timeComplexity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Space</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white font-mono">{result.spaceComplexity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bug Detection */}
              <AnalysisCard
                type="error"
                title="Bug Detection"
                icon={<Bug className="w-4 h-4 text-red-400" />}
                items={result.bugs}
                emptyMessage="No bugs detected! Your logic looks solid."
              />

              {/* Security Analysis */}
              <AnalysisCard
                type="warning"
                title="Security Analysis"
                icon={<Shield className="w-4 h-4 text-yellow-400" />}
                items={result.securityIssues}
                emptyMessage="No security vulnerabilities found. Code is secure."
              />

              {/* Optimization Suggestions */}
              <AnalysisCard
                type="info"
                title="Optimization Suggestions"
                icon={<Zap className="w-4 h-4 text-blue-400" />}
                items={result.optimizationSuggestions}
                emptyMessage="Code is fully optimized! No further suggestions."
              />

              {/* View Refactored Code Button */}
              {result._id && result._id !== 'no-db-id' && result.refactoredCode && (
                <button
                  onClick={() => navigate(`/dashboard/refactor/${result._id}`)}
                  className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/15 text-primary font-medium transition-all group"
                >
                  <FileCode2 className="w-5 h-5" />
                  View Refactored Code & Download Report
                  <ExternalLink className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {/* If DB failed, show inline refactored code */}
              {(result._id === 'no-db-id' || !result._id) && result.refactoredCode && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <FileCode2 className="w-4 h-4 text-secondary" />
                      Refactored Code
                    </h3>
                  </div>
                  <div className="rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700/50">
                    <CodeMirror
                      value={result.refactoredCode}
                      readOnly={true}
                      theme="dark"
                      className="text-sm font-mono max-h-[300px] overflow-auto"
                    />
                  </div>
                  <p className="text-xs text-yellow-400/70 mt-3 text-center">⚠ Could not save to database. Connect MongoDB to enable the full Refactor page.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
