import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReviewHistory, deleteReview } from '../services/api';
import { Clock, Bug, Trash2, Search, FileCode2, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const LANGUAGE_COLORS = {
  JavaScript: 'bg-yellow-100 text-yellow-700 border border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30',
  Python:     'bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30',
  Java:       'bg-purple-100 text-purple-700 border border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30',
  SQL:        'bg-indigo-100 text-indigo-700 border border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30',
  C:          'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/30',
  'C++':      'bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30',
};

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getReviewHistory(page, 6, searchTerm);
      setHistory(data.data);
      setTotalPages(data.pagination.pages);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch history');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => { fetchHistory(); }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, page]);

  const handleDelete = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await deleteReview(id);
      fetchHistory();
    } catch (err) {
      alert("Failed to delete review");
    }
  };

  const getScoreColor = (score) => {
    if (score <= 40) return 'text-red-500';
    if (score <= 70) return 'text-amber-500';
    return 'text-green-500';
  };

  const getLangClass = (lang) =>
    LANGUAGE_COLORS[lang] || 'bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-700/50 dark:text-slate-300';

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Analysis History</h1>
          <p className="text-slate-500 dark:text-slate-400">View your past code reviews and optimizations.</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by language..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-full md:w-64 shadow-sm"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-error/10 border border-red-200 dark:border-error/20 text-red-600 dark:text-error p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Skeleton Loader */}
      {loading && history.length === 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 p-6 animate-pulse shadow-sm">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2" />
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-6" />
              <div className="flex gap-4">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-16 mt-8">
          <FileCode2 className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
          <p className="text-xl font-semibold text-slate-500 dark:text-slate-400">No history found</p>
          <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">Submit some code for review to see it here.</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {history.map((review) => (
              <Link
                to={`/dashboard/refactor/${review._id}`}
                key={review._id}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-slate-300 dark:hover:border-primary/40 transition-all duration-200 block"
              >
                {/* Delete button */}
                <button
                  onClick={(e) => handleDelete(review._id, e)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-300 dark:text-slate-600 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Top row: language badge + date */}
                <div className="flex items-center justify-between mb-5">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getLangClass(review.language)}`}>
                    {review.language}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Score */}
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-1">Quality Score</p>
                <div className="flex items-end gap-1.5 mb-5">
                  <span className={`text-4xl font-extrabold leading-none ${getScoreColor(review.qualityScore)}`}>
                    {review.qualityScore}
                  </span>
                  <span className="text-sm text-slate-400 mb-1">/100</span>
                </div>

                {/* Bottom: complexity + bugs */}
                <div className="flex items-center gap-5 pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span className="font-mono">{review.timeComplexity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs">
                    <Bug className="w-3.5 h-3.5 text-blue-400" />
                    <span>{review.bugs?.length ?? 0} bug{review.bugs?.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-10">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                Page <span className="text-slate-900 dark:text-white font-bold">{page}</span> of <span className="text-slate-900 dark:text-white font-bold">{totalPages}</span>
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
