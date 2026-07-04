import { Link } from 'react-router-dom';
import { Bot, Zap, Shield, FileSearch, Sparkles, Code2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <Bot className="w-8 h-8 text-primary drop-shadow-glow-primary" />,
      title: "Intelligent Bug Detection",
      description: "Instantly spot syntax and logical errors in your code with Gemini-powered AI."
    },
    {
      icon: <Zap className="w-8 h-8 text-warning drop-shadow-glow-secondary" />,
      title: "Performance Optimization",
      description: "Receive actionable suggestions for better algorithms and lower time complexity."
    },
    {
      icon: <Shield className="w-8 h-8 text-success drop-shadow-glow-success" />,
      title: "Security Analysis",
      description: "Detect vulnerabilities like SQL injection or hardcoded secrets before deployment."
    },
    {
      icon: <FileSearch className="w-8 h-8 text-secondary drop-shadow-glow-secondary" />,
      title: "Auto-Refactoring",
      description: "Get clean, maintainable, and highly readable refactored versions of your scripts."
    }
  ];

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden flex flex-col items-center justify-center p-6 pb-20 animate-fade-in">
      
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/10 rounded-full blur-[150px] -z-10 rotate-45" />

      {/* Hero Section */}
      <div className="relative text-center mt-12 md:mt-20 max-w-4xl mx-auto z-10 animate-slide-up">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-sm font-medium mb-8 shadow-lg hover:border-primary/50 transition-colors cursor-default">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">
            Powered by Google Gemini AI
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6 leading-tight">
          Supercharge your <br className="hidden md:block" />
          <span className="relative inline-block mt-2">
            <span className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur-lg opacity-30"></span>
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Development Workflow
            </span>
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Paste your code and let our advanced AI instantly analyze bugs, optimize complexity, detect security vulnerabilities, and generate clean refactored logic.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/dashboard" className="btn-primary text-lg px-8 py-3.5 w-full sm:w-auto">
            <Code2 className="w-5 h-5 mr-1" />
            Start Analyzing Code
          </Link>
          <Link to="/history" className="btn-secondary text-lg px-8 py-3.5 w-full sm:w-auto group">
            View History
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="relative max-w-7xl mx-auto mt-24 md:mt-32 w-full z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent -z-10 h-32 bottom-0" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="glass-panel p-8 flex flex-col gap-5 group hover:-translate-y-2 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:border-white/20"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 border border-white/10">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
