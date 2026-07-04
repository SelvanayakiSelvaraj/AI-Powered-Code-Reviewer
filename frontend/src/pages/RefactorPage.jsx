import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getReviewById } from '../services/api';
import CodeMirror from '@uiw/react-codemirror';
import { jsPDF } from 'jspdf';
import { ArrowLeft, Copy, Download, FileCode2, Check } from 'lucide-react';

export default function RefactorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const data = await getReviewById(id);
        setReview(data);
      } catch (err) {
        console.error('Failed to fetch review:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  const handleCopy = () => {
    if (review?.refactoredCode) {
      navigator.clipboard.writeText(review.refactoredCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generatePDF = () => {
    if (!review) return;
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.width;
    
    doc.setFontSize(20);
    doc.text('AI Code Review Report', margin, 20);
    
    doc.setFontSize(12);
    doc.text(`Language: ${review.language}`, margin, 35);
    doc.text(`Quality Score: ${review.qualityScore}/100`, margin, 45);
    doc.text(`Time Complexity: ${review.timeComplexity}`, margin, 55);
    doc.text(`Space Complexity: ${review.spaceComplexity}`, margin, 65);
    
    let yPos = 80;
    const addSection = (title, items) => {
      if (!items || items.length === 0) return;
      if (yPos > 270) { doc.addPage(); yPos = 20; }
      doc.setFontSize(14);
      doc.text(title, margin, yPos);
      yPos += 10;
      doc.setFontSize(10);
      items.forEach(item => {
        const splitText = doc.splitTextToSize(`• ${item}`, pageWidth - 20);
        if (yPos + splitText.length * 5 > 280) { doc.addPage(); yPos = 20; }
        doc.text(splitText, margin, yPos);
        yPos += splitText.length * 5 + 2;
      });
      yPos += 5;
    };

    addSection('Bugs Detected', review.bugs);
    addSection('Security Issues', review.securityIssues);
    addSection('Optimization Suggestions', review.optimizationSuggestions);

    if (review.refactoredCode) {
      if (yPos > 250) { doc.addPage(); yPos = 20; }
      doc.setFontSize(14);
      doc.text('Refactored Code:', margin, yPos);
      yPos += 10;
      doc.setFontSize(9);
      const splitCode = doc.splitTextToSize(review.refactoredCode, pageWidth - 20);
      doc.text(splitCode, margin, yPos);
    }
    
    doc.save(`code-review-${id}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="max-w-7xl mx-auto p-6 text-center mt-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Review Not Found</h2>
        <button onClick={() => navigate('/history')} className="btn-primary">Go to History</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 pb-20 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1">Refactored Code Viewer</h1>
            <p className="text-slate-600 dark:text-slate-400">Detailed comparison and analysis report.</p>
          </div>
        </div>
        <button onClick={generatePDF} className="btn-primary flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download PDF Report
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)] min-h-[600px]">
        {/* Original Code */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/50 rounded-t-xl px-4 py-3">
            <span className="text-slate-700 dark:text-slate-300 font-medium flex items-center gap-2">
              <FileCode2 className="w-4 h-4" /> Original Code
            </span>
            <span className="px-2 py-1 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs rounded-md border border-slate-300 dark:border-slate-700">
              {review.language}
            </span>
          </div>
          <div className="flex-grow border border-t-0 border-slate-700/50 rounded-b-xl overflow-hidden bg-[#282a36]">
            <CodeMirror
              value={review.code}
              readOnly={true}
              theme="dark"
              height="100%"
              className="h-full text-sm font-mono"
            />
          </div>
        </div>

        {/* Refactored Code */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700/50 rounded-t-xl px-4 py-3">
            <span className="text-primary font-medium flex items-center gap-2">
              <FileCode2 className="w-4 h-4" /> Refactored Code
            </span>
            <button 
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded-md border border-slate-300 dark:border-slate-600 transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy Code'}
            </button>
          </div>
          <div className="flex-grow border border-t-0 border-slate-700/50 rounded-b-xl overflow-hidden bg-[#282a36]">
            <CodeMirror
              value={review.refactoredCode || '// No refactored code available'}
              readOnly={true}
              theme="dark"
              height="100%"
              className="h-full text-sm font-mono"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
