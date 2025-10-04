import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-700/20 via-purple-700/20 to-indigo-500/20 blur-3xl animate-fadeInSlow" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 blur-2xl animate-floatSlow" />
  </div>
);

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-50 transition duration-300" />
    <div className="relative p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center">
      <Icon className="w-6 h-6 text-white" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => onLoadingComplete?.(), 800);
    }, 3500);
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014] z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(8px)", transition: { duration: 0.7 } }}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
            {/* Icons */}
            <motion.div 
              className="flex gap-6 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ staggerChildren: 0.2, duration: 0.8 }}
            >
              {[Code2, User, Github].map((Icon, i) => (
                <div key={i} data-aos="fade-down" data-aos-delay={i * 200}>
                  <IconButton Icon={Icon} />
                </div>
              ))}
            </motion.div>

            {/* Welcome Text */}
            <motion.div
              className="text-center mb-8 max-w-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-indigo-300 to-purple-300 bg-clip-text text-transparent">
                  Designing Modern, Scalable,
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  and User-Friendly Web Platforms
                </span>
              </h1>
            </motion.div>

            {/* Website Link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="https://portofolio-v5-tau.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 group hover:scale-105 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                <Globe className="w-5 h-5 text-indigo-500 z-10" />
                <span className="text-lg font-medium z-10 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">
                  <TypewriterEffect texts={["dimaz-porto.vercel.app", "Visit My Portfolio"]} />
                </span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;

