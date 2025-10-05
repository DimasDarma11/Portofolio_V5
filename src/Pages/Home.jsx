import React, { useState, useEffect, useCallback, memo } from "react";
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-700"></div>
      <div className="relative px-4 py-2 rounded-full bg-black/30 backdrop-blur-md border border-white/10">
        <span className="flex items-center text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          <Sparkles className="w-4 h-4 mr-2" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold tracking-tight">
      <span className="bg-gradient-to-r from-white via-indigo-300 to-purple-300 bg-clip-text text-transparent">
        Full-Stack
      </span>
      <br />
      <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
        Developer
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative px-6 py-2 rounded-lg overflow-hidden border border-white/10 backdrop-blur-md bg-black/30 flex items-center justify-center gap-2 transition hover:bg-white/10">
      <span className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        {text}
      </span>
      <Icon className="w-4 h-4 text-gray-200 group-hover:text-white transition" />
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="group relative p-2 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center transition hover:bg-white/10">
      <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition" />
    </div>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Network & Telecom Student", "Tech Enthusiast"];
const TECH_STACK = ["React", "JavaScript", "Node.js", "Tailwind"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/" },
  { icon: Instagram, link: "https://www.instagram.com/dimazdarmaa/?hl=id" }
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // AOS Initialization
  useEffect(() => {
    AOS.init({ once: true, offset: 10 });
  }, []);

  // Typing Effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(handleTyping, isTyping ? TYPING_SPEED : ERASING_SPEED);
    return () => clearTimeout(timeout);
  }, [handleTyping, isTyping]);

  // Lottie Animation Options
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    style: { width: "100%", height: "100%", transition: "transform 0.5s ease" },
    className: `w-full h-full ${isHovering ? "scale-110 rotate-2" : "scale-100"}`
  };

  return (
    <div className="min-h-screen bg-[#030014] px-6 lg:px-24 flex items-center" id="Home">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left */}
        <div className="w-full lg:w-1/2 space-y-6 text-left" data-aos="fade-right" data-aos-delay="200">
          <StatusBadge />
          <MainTitle />
          <div className="h-8 flex items-center text-xl md:text-2xl font-light text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
            {text}
            <span className="w-[3px] h-6 bg-gradient-to-t from-indigo-500 to-purple-600 ml-1 animate-blink"></span>
          </div>
          <p className="text-gray-400 max-w-xl leading-relaxed">
            Menciptakan Website Inovatif, Fungsional, dan User-Friendly untuk Solusi Digital.
          </p>
          <div className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech, idx) => <TechStack key={idx} tech={tech} />)}
          </div>
          <div className="flex gap-3 mt-4">
            {SOCIAL_LINKS.map((s, idx) => <SocialLink key={idx} {...s} />)}
          </div>
        </div>

        {/* Right */}
        <div className="w-full lg:w-1/2 h-[500px] lg:h-[600px] relative flex items-center justify-center"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          data-aos="fade-left"
          data-aos-delay="400">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl transition-opacity duration-700"></div>
          <div className="relative w-full h-full">
            <DotLottieReact {...lottieOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);

