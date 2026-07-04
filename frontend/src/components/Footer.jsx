export default function Footer() {
  return (
    <footer className="bg-surface py-6 border-t border-slate-700/50 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} AI Powered Code Debugger. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs flex items-center gap-1">
          Powered by <span className="font-semibold text-slate-300">Google Gemini</span> &amp; React
        </p>
      </div>
    </footer>
  );
}
