import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, Cpu, Globe, Tv, BrainCircuit, 
  Share2, Zap, AlertTriangle, Lock, Unlock, 
  RefreshCw, DollarSign, Activity, Eye
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Matrix Rain Component
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()*&^%+-/~{[|`]}';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    window.addEventListener('resize', resize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20 pointer-events-none" />;
}

const TABS = [
  { id: 'wealth', label: 'Zero-Cost Wealth', icon: DollarSign },
  { id: 'inventions', label: 'Futuristic Inventions', icon: Cpu },
  { id: 'prompts', label: 'God Mode Prompts', icon: Terminal },
  { id: 'matrix', label: 'Matrix Map & Feeds', icon: Globe },
  { id: 'tv', label: 'AI TV', icon: Tv },
  { id: 'science', label: 'Neuralink & Math', icon: BrainCircuit },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('wealth');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [showTopSecret, setShowTopSecret] = useState(false);
  const [reportData, setReportData] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charityAmount, setCharityAmount] = useState(1337.42);

  useEffect(() => {
    const interval = setInterval(() => {
      setCharityAmount(prev => prev + Math.random() * 10);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => {
      setIsGlitching(false);
      setShowTopSecret(true);
      generateContent('top_secret');
    }, 1500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Matrix Wealth System',
        text: 'I just unlocked the God Mode Wealth System.',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Share feature not supported on this browser. Copy the URL instead!');
    }
  };

  const generateContent = async (topic: string) => {
    setIsGenerating(true);
    setError(null);
    setReportData(null);

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('Gemini API key is missing.');
      }

      const ai = new GoogleGenAI({ apiKey });

      let prompt = '';
      switch (topic) {
        case 'wealth':
          prompt = 'Generate a highly unconventional, zero-cost method to generate wealth using only a smartphone. Do not use existing intellectual property. Focus on futuristic, untapped digital arbitrage or attention-economy mechanics. Make it sound like a hacker manifesto.';
          break;
        case 'inventions':
          prompt = 'Describe 3 futuristic inventions that do not exist yet but could go viral on social media. Focus on consumer tech, augmented reality, or bio-hacking. Make them sound mind-blowing and highly profitable.';
          break;
        case 'prompts':
          prompt = 'Provide 3 "God Mode" AI prompts for algorithmic trading, solving complex equations, and leveraging online systems. Make them sound highly advanced, using terms like "quantum heuristics" and "neural arbitrage".';
          break;
        case 'science':
          prompt = 'Write a dense, highly technical explanation of how neuralink inputs, machine learning, virtual machines within virtual machines, and nano-particles interact to create a simulated reality. Use advanced mathematics and physics terminology.';
          break;
        case 'top_secret':
          prompt = 'REVEAL TOP SECRET PASSIVE INCOME GLITCH. Explain a theoretical glitch in the global financial matrix that allows for infinite passive income generation. Use cryptic, hypnotic, and highly technical language.';
          break;
        default:
          prompt = 'Generate futuristic matrix data.';
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      if (response.text) {
        setReportData(response.text);
      } else {
        throw new Error('Failed to generate data.');
      }
    } catch (err: any) {
      console.error('Error generating report:', err);
      setError(err.message || 'An unexpected error occurred in the matrix.');
      setReportData(`> SYSTEM ERROR: ${err.message}\n> FALLBACK PROTOCOL ENGAGED.\n\n**Zero-Cost Wealth Vector Identified:**\n1. Leverage attention arbitrage across decentralized nodes.\n2. Synthesize digital assets using recursive AI generation.\n3. Deploy septillion agenic agents to micro-trade attention spans.\n\n*Awaiting further input...*`);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    if (!showTopSecret && activeTab !== 'matrix' && activeTab !== 'tv') {
      generateContent(activeTab);
    }
  }, [activeTab, showTopSecret]);

  return (
    <div 
      className={cn(
        "min-h-screen bg-black text-green-500 font-mono overflow-x-hidden transition-transform duration-1000",
        isFlipped ? "rotate-180" : "",
        isGlitching ? "animate-pulse blur-sm hue-rotate-90" : ""
      )}
    >
      <MatrixRain />

      {/* Glitch Overlay */}
      {isGlitching && (
        <div className="fixed inset-0 z-50 pointer-events-none bg-white/10 mix-blend-overlay flex items-center justify-center">
          <div className="text-6xl font-bold text-red-500 animate-bounce tracking-widest">
            SYSTEM OVERRIDE
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto p-4 md:p-6 flex flex-col h-screen">
        
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-green-500/30 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <Eye className="w-8 h-8 animate-pulse text-green-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter uppercase glitch-text" data-text="NEXUS_OS_v9.9.9">
                NEXUS_OS_v9.9.9
              </h1>
              <div className="text-xs text-green-400/70 flex items-center gap-2">
                <Activity className="w-3 h-3 animate-spin" />
                Septillion Agents Active | Charity Pool: ${charityAmount.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFlipped(!isFlipped)}
              className="p-2 border border-green-500/50 hover:bg-green-500/20 rounded transition-colors"
              title="Invert Reality"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 border border-green-500/50 hover:bg-green-500/20 rounded transition-colors"
              title="Broadcast to Network"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={triggerGlitch}
              className="flex items-center gap-2 px-4 py-2 bg-red-900/50 border border-red-500 text-red-400 hover:bg-red-900/80 rounded transition-colors font-bold uppercase tracking-widest"
            >
              <AlertTriangle className="w-4 h-4" />
              Glitch Matrix
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
          
          {/* Sidebar Navigation */}
          <nav className="lg:col-span-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
            <div className="text-xs text-green-400/50 uppercase tracking-widest mb-2 border-b border-green-500/20 pb-1">
              Main Directives
            </div>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !showTopSecret;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowTopSecret(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 text-left border transition-all duration-300",
                    isActive 
                      ? "bg-green-500/20 border-green-500 text-green-300 shadow-[0_0_15px_rgba(0,255,0,0.2)]" 
                      : "border-transparent hover:border-green-500/30 text-green-500/70 hover:text-green-400"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm uppercase tracking-wider">{tab.label}</span>
                </button>
              );
            })}

            {showTopSecret && (
              <div className="mt-4 p-3 border border-red-500 bg-red-500/10 text-red-400 flex items-center gap-3 animate-pulse">
                <Unlock className="w-5 h-5" />
                <span className="text-sm uppercase tracking-wider">Top Secret Access</span>
              </div>
            )}

            <div className="mt-auto pt-6">
              <div className="p-4 border border-green-500/30 bg-black/50 backdrop-blur">
                <div className="text-xs text-green-400/50 uppercase mb-2">System Status</div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>CPU Load:</span>
                    <span className="text-green-300">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantum Coherence:</span>
                    <span className="text-green-300">Stable</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Matrix Integrity:</span>
                    <span className="text-red-400 animate-pulse">Compromised</span>
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Content Area */}
          <main className="lg:col-span-3 border border-green-500/30 bg-black/80 backdrop-blur-md p-4 md:p-6 overflow-y-auto custom-scrollbar relative">
            
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-green-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-green-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-green-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-green-500" />

            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-green-500/70 space-y-4"
                >
                  <RefreshCw className="w-12 h-12 animate-spin" />
                  <div className="text-sm uppercase tracking-widest animate-pulse">
                    Decrypting Data Streams...
                  </div>
                </motion.div>
              ) : activeTab === 'matrix' && !showTopSecret ? (
                <motion.div key="matrix" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                  <h2 className="text-xl uppercase tracking-widest mb-4 border-b border-green-500/30 pb-2">Global Matrix Feed</h2>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div className="border border-green-500/30 p-4 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/map/800/600')] bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:scale-110 transition-transform duration-1000" />
                      <div className="relative z-10">
                        <h3 className="text-sm uppercase text-green-300 mb-2">Node Map</h3>
                        <div className="space-y-1 text-xs">
                          <p>Tokyo: Active</p>
                          <p>New York: Active</p>
                          <p>London: Active</p>
                          <p>Singapore: Active</p>
                        </div>
                      </div>
                    </div>
                    <div className="border border-green-500/30 p-4 flex flex-col">
                      <h3 className="text-sm uppercase text-green-300 mb-2">Live Ticker</h3>
                      <div className="flex-1 space-y-2 text-xs font-mono overflow-hidden">
                        <p className="text-green-400">BTC/USD: $94,231 <span className="text-green-500">▲</span></p>
                        <p className="text-red-400">ETH/USD: $3,102 <span className="text-red-500">▼</span></p>
                        <p className="text-green-400">SOL/USD: $142 <span className="text-green-500">▲</span></p>
                        <p className="text-green-400">NEXUS: $0.004 <span className="text-green-500">▲</span></p>
                        <p className="text-green-400">QNTM: $12.44 <span className="text-green-500">▲</span></p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : activeTab === 'tv' && !showTopSecret ? (
                <motion.div key="tv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                  <h2 className="text-xl uppercase tracking-widest mb-4 border-b border-green-500/30 pb-2">AI Generated Broadcast</h2>
                  <div className="flex-1 border border-green-500/30 relative overflow-hidden flex flex-col">
                    <div className="flex-1 bg-black relative flex items-center justify-center">
                      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/cyberpunk/800/400')] bg-cover bg-center opacity-40 mix-blend-screen" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="relative z-10 text-center">
                        <Tv className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm uppercase tracking-widest animate-pulse">Live Feed Generating...</p>
                      </div>
                    </div>
                    <div className="p-4 border-t border-green-500/30 bg-black/90">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex gap-4">
                          <button className="text-xs uppercase hover:text-green-300">Like (1.2M)</button>
                          <button className="text-xs uppercase hover:text-green-300">Comment (45K)</button>
                          <button className="text-xs uppercase hover:text-green-300">Share</button>
                        </div>
                        <button className="px-3 py-1 border border-green-500 text-xs uppercase hover:bg-green-500/20">
                          Upload Feed
                        </button>
                      </div>
                      <div className="space-y-2">
                        <div className="text-xs"><span className="text-green-300">Agent_007:</span> This new reality simulation is flawless.</div>
                        <div className="text-xs"><span className="text-green-300">Neo_X:</span> How do I extract the passive income data?</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "prose prose-invert max-w-none",
                    showTopSecret ? "prose-red" : "prose-green"
                  )}
                >
                  <div className={cn(
                    "markdown-body font-mono text-sm leading-relaxed",
                    showTopSecret ? "text-red-400" : "text-green-400"
                  )}>
                    {reportData ? (
                      <ReactMarkdown>{reportData}</ReactMarkdown>
                    ) : (
                      <p>Awaiting data...</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 255, 0, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 255, 0, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 255, 0, 0.5);
        }
        
        .prose-green h1, .prose-green h2, .prose-green h3, .prose-green h4 {
          color: #4ade80;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .prose-green strong {
          color: #86efac;
        }
        .prose-green a {
          color: #4ade80;
          text-decoration: underline;
          text-decoration-style: dashed;
        }
        
        .prose-red h1, .prose-red h2, .prose-red h3, .prose-red h4 {
          color: #f87171;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .prose-red strong {
          color: #fca5a5;
        }
        .prose-red p {
          color: #f87171;
        }

        .glitch-text {
          position: relative;
        }
        .glitch-text::before, .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: black;
        }
        .glitch-text::before {
          left: 2px;
          text-shadow: -1px 0 red;
          clip: rect(24px, 550px, 90px, 0);
          animation: glitch-anim-2 3s infinite linear alternate-reverse;
        }
        .glitch-text::after {
          left: -2px;
          text-shadow: -1px 0 blue;
          clip: rect(85px, 550px, 140px, 0);
          animation: glitch-anim 2.5s infinite linear alternate-reverse;
        }
        @keyframes glitch-anim {
          0% { clip: rect(11px, 9999px, 81px, 0); }
          20% { clip: rect(65px, 9999px, 97px, 0); }
          40% { clip: rect(10px, 9999px, 20px, 0); }
          60% { clip: rect(44px, 9999px, 88px, 0); }
          80% { clip: rect(90px, 9999px, 11px, 0); }
          100% { clip: rect(33px, 9999px, 55px, 0); }
        }
        @keyframes glitch-anim-2 {
          0% { clip: rect(65px, 9999px, 100px, 0); }
          20% { clip: rect(3px, 9999px, 20px, 0); }
          40% { clip: rect(88px, 9999px, 11px, 0); }
          60% { clip: rect(10px, 9999px, 90px, 0); }
          80% { clip: rect(44px, 9999px, 55px, 0); }
          100% { clip: rect(11px, 9999px, 81px, 0); }
        }
      `}</style>
    </div>
  );
}
