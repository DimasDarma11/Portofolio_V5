import React, { useState, useEffect, useRef } from 'react';
import { Code2, Github, Globe, User } from 'lucide-react';

const TypewriterEffect = ({ texts = [], speed = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = texts[wordIndex];
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          setDisplayText(prev => prev + currentWord[charIndex]);
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(prev => prev.slice(0, -1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };
    timeoutRef.current = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeoutRef.current);
  }, [charIndex, isDeleting, texts, wordIndex, speed]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

const IconButton = ({ Icon, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="relative p-3 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 
                    hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/20 
                    transition-all duration-300 hover:scale-110">
        <Icon className="w-6 h-6 text-slate-300 group-hover:text-indigo-400 transition-colors duration-300" />
      </div>
    </div>
  );
};

const WelcomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setIsLoading(false), 700);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 z-50 
                transition-all duration-700 ${fadeOut ? 'opacity-0 scale-105' : 'opacity-100'}`}
    >
      {/* Subtle animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Icons */}
        <div className="flex gap-6 mb-12">
          <IconButton Icon={Code2} delay={200} />
          <IconButton Icon={User} delay={400} />
          <IconButton Icon={Github} delay={600} />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-12 max-w-4xl opacity-0 animate-fadeIn" 
             style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-clip-text text-transparent">
              Designing Modern, Scalable,
            </span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              and User-Friendly Web Platforms
            </span>
          </h1>
        </div>

        {/* Website Link */}
        <div className="opacity-0 animate-fadeIn" 
             style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
          <a
            href="https://portofolio-v5-tau.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl 
                     bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 
                     hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/20
                     group transition-all duration-300 hover:scale-105"
          >
            <Globe className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            <span className="text-lg font-medium bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              <TypewriterEffect texts={["dimaz-porto.vercel.app", "Visit My Portfolio"]} />
            </span>
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WelcomeScreen;
