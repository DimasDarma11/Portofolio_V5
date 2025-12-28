import React, { useState, useEffect, useCallback } from "react";
import { Github, Linkedin, Instagram, Sparkles } from "lucide-react";

// Constants
const WORDS = ["Network & Telecom Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "JavaScript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/" },
  { icon: Instagram, link: "https://www.instagram.com/dimazdarmaa/?hl=id" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), 2000);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? 100 : 50);
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  return (
    <section
      id="Home"
      className="min-h-screen flex items-start justify-center bg-gradient-to-b from-slate-50 via-white to-slate-50 px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-20 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '1s' }} />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className={`flex flex-col items-center text-center space-y-6 sm:space-y-8 transition-all duration-1000 ${
          mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Status Badge */}
          <div className="inline-block">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm">
                <span className="flex items-center text-xs sm:text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-indigo-600" />
                  Ready to Innovate
                </span>
              </div>
            </div>
          </div>

          {/* Main Title */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
              <span className="block bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent">
                OWNER
              </span>
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                ARVORE GROUP
              </span>
            </h1>
          </div>

          {/* Typewriter */}
          <div className="h-8 sm:h-10 flex items-center justify-center">
            <span className="text-lg sm:text-xl md:text-2xl font-light text-slate-600">
              {text}
            </span>
            <span className="w-[2px] sm:w-[3px] h-5 sm:h-7 bg-gradient-to-t from-indigo-600 to-purple-600 ml-1 animate-pulse"></span>
          </div>

          {/* Description */}
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl px-4">
            Menciptakan Website Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
            {TECH_STACK.map((tech, idx) => (
              <div
                key={idx}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm
                         text-xs sm:text-sm font-medium text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 
                         transition-all duration-300 hover:scale-105"
              >
                {tech}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3 sm:gap-4 pt-2">
            {SOCIAL_LINKS.map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2.5 sm:p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200 shadow-sm
                         hover:border-indigo-400 hover:shadow-md hover:shadow-indigo-200
                         transition-all duration-300 hover:scale-110"
              >
                <social.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 group-hover:text-indigo-600 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
