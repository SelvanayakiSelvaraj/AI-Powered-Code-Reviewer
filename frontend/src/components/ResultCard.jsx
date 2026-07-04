import React from 'react';

export default function ResultCard({ title, icon, items, type }) {
  if (!items || items.length === 0) return null;

  const getStyleByType = () => {
    switch (type) {
      case 'error': return 'bg-error/10 border-error/20 text-error';
      case 'warning': return 'bg-warning/10 border-warning/20 text-warning';
      case 'success': return 'bg-success/10 border-success/20 text-success';
      case 'info': return 'bg-primary/10 border-primary/20 text-primary';
      default: return 'bg-slate-800/50 border-slate-700/50 text-slate-300';
    }
  };

  const getBadgeStyle = () => {
    switch (type) {
      case 'error': return 'bg-error text-white';
      case 'warning': return 'bg-warning text-white';
      case 'success': return 'bg-success text-white';
      case 'info': return 'bg-primary text-white';
      default: return 'bg-slate-600 text-white';
    }
  };

  return (
    <div className={`card border p-5 ${getStyleByType()}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-900/50 rounded-lg">
          {icon}
        </div>
        <h3 className="font-bold text-lg text-white">{title}</h3>
        <span className={`ml-auto text-xs font-bold px-2 py-1 rounded-full ${getBadgeStyle()}`}>
          {items.length} {items.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>
      
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-sm items-start">
            <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-70"></span>
            <span className="opacity-90">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
