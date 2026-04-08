import React, { useState, useEffect, useMemo } from 'react';
import Background from './components/Background';
import LinkCard from './components/LinkCard';
import SearchBar from './components/SearchBar';
import { ThemeProvider } from './ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import { MOCK_LINKS, CATEGORIES } from './constants';
import { CategoryType } from './types';
import { Compass, Grid, Layers, Cpu, Clock, GraduationCap, Map } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(CategoryType.ALL);
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  // Clock effect
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filtering Logic
  const filteredLinks = useMemo(() => {
    return MOCK_LINKS.filter(link => {
      const matchesCategory = selectedCategory === CategoryType.ALL || link.category === selectedCategory;
      const matchesSearch = link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const greeting = useMemo(() => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  }, [time]);

  return (
    <ThemeProvider>
      <div className="bg-slate-50 selection:bg-cyan-500/30 dark:bg-[#0f172a] min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-500">
        <Background />

        {/* Header / Status Bar */}
        <header className={`fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center space-x-3 text-slate-800 hover:text-cyan-600 dark:hover:text-cyan-300 dark:text-white transition-colors cursor-default">
            <Map className="w-8 h-8" />
            <span className="font-display font-bold text-xl tracking-wider">OurTaiko</span>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-2 bg-white/80 dark:bg-white/5 shadow-lg backdrop-blur-md px-4 py-1.5 border border-slate-200 dark:border-white/10 rounded-full">
              <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="font-mono font-semibold text-slate-700 dark:text-slate-200 text-sm">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Main Content */}
        <main className="z-10 relative mx-auto px-4 pt-32 pb-20 container">

          {/* Hero Section */}
          <div className={`text-center mb-16 transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="bg-clip-text bg-gradient-to-b from-slate-900 dark:from-white via-slate-800 dark:via-white to-slate-500 dark:to-slate-400 mb-4 font-display font-bold text-transparent text-5xl md:text-7xl tracking-tight">
              {greeting}, Donder.
            </h1>
            <p className="flex justify-center items-center gap-2 mx-auto max-w-2xl font-light text-slate-500 dark:text-slate-400 text-lg md:text-xl">
              <span className="bg-cyan-500 rounded-full w-2 h-2 animate-pulse"></span>
              Managed by OurTaiko
            </p>
          </div>

          {/* Search */}
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />

          {/* Category Pills */}
          <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`
                px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300
                ${selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg dark:bg-white dark:text-black dark:shadow-[0_0_20px_rgba(255,255,255,0.4)] scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white dark:border-white/5 dark:hover:border-white/20'}
              `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filteredLinks.length > 0 ? (
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredLinks.map((item, index) => (
                <LinkCard key={item.hash} item={item} index={index} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center animate-fade-in-up">
              <div className="inline-flex justify-center items-center bg-slate-200 dark:bg-white/5 mb-4 rounded-full w-16 h-16">
                <Layers className="w-8 h-8 text-slate-500 dark:text-slate-400" />
              </div>
              <h3 className="font-medium text-slate-700 dark:text-slate-300 text-xl">No modules found</h3>
              <p className="text-slate-500">Adjust your search criteria.</p>
            </div>
          )}

        </main>

        <footer className="bottom-0 z-0 fixed bg-gradient-to-t from-slate-100 dark:from-[#0f172a] to-transparent py-6 w-full text-slate-500 text-xs text-center pointer-events-none">
          <div className="flex justify-center items-center gap-2 opacity-70">
            <span className="font-semibold text-cyan-700 dark:text-cyan-800/80 tracking-widest">OurTaiko</span>
            <span className="bg-slate-400 dark:bg-slate-700 rounded-full w-1 h-1"></span>
            <span>Designed for Donders</span>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
};

export default App;