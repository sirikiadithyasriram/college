import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { useColleges } from '../lib/api';
import CollegeCard from '../components/ui/CollegeCard';
import { motion } from 'motion/react';

export default function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  // Fetch top colleges (high placement/rating) simply by getting all and slicing for demo
  const { colleges, isLoading } = useColleges();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/discover?query=${encodeURIComponent(query.trim())}`);
    } else {
      navigate(`/discover`);
    }
  };

  const featured = colleges ? colleges.slice(0, 3) : [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-24 md:py-32 overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-white to-white" />
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
              Discover clarity <br className="hidden md:block" />
              <span className="text-slate-400 italic font-light">in your education.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 mb-10 font-medium">
              A refined approach to finding, comparing, and deciding on your next academic destination. Leave the clutter behind.
            </p>

            <form onSubmit={handleSearch} className="max-w-xl mx-auto relative flex items-center shadow-lg rounded-2xl">
              <div className="absolute text-slate-400 left-5">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search colleges, courses, or states..."
                className="w-full pl-14 pr-32 py-5 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-900 placeholder:text-slate-400"
              />
              <button 
                type="submit"
                className="absolute right-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                Search
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-indigo-600 mb-2">Curated Selection</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Featured Institutions</h2>
            </div>
            <button 
              onClick={() => navigate('/discover')}
              className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              View all directory <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {!isLoading && colleges && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featured.map((college, idx) => (
                <CollegeCard key={college.id} college={college} featured />
              ))}
            </div>
          )}
          
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="animate-pulse bg-slate-100 rounded-2xl aspect-[3/4] w-full border border-slate-200"></div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Career Paths Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-indigo-600 mb-2">Explore By Domain</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Career Paths</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Engineering', desc: 'B.Tech, M.Tech, BE', icon: '💻', query: 'Engineering' },
              { title: 'Medicine', desc: 'MBBS, BDS, BAMS', icon: '⚕️', query: 'Medical' },
              { title: 'Management', desc: 'MBA, BBA, PGDM', icon: '📈', query: 'Management' },
              { title: 'Law', desc: 'LLB, LLM, BA LLB', icon: '⚖️', query: 'Law' },
            ].map((path) => (
              <div 
                key={path.title}
                onClick={() => navigate(`/discover?query=${path.query}`)} 
                className="cursor-pointer group bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-indigo-600 hover:shadow-md transition-all text-center"
              >
                 <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{path.icon}</div>
                 <h3 className="text-xl font-bold text-slate-900 mb-2">{path.title}</h3>
                 <p className="text-sm text-slate-500 font-medium">{path.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-indigo-600 mb-2">Smart Decision</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">Academic Tools</h2>
            </div>
            <button 
              onClick={() => navigate('/tools')}
              className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              View all tools <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div onClick={() => navigate('/compare')} className="cursor-pointer group bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-600 hover:shadow-lg transition-all">
               <h3 className="text-xl font-bold text-slate-900 mb-3">College Compare</h3>
               <p className="text-slate-500 font-medium mb-8">Side-by-side technical analysis of placement rates, fees, and infrastructure.</p>
               <div className="text-sm font-bold text-indigo-600 flex items-center group-hover:translate-x-1 transition-transform">
                 Launch Tool <ArrowRight className="w-4 h-4 ml-1" />
               </div>
            </div>
            <div onClick={() => navigate('/tools/predictor')} className="cursor-pointer group bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-600 hover:shadow-lg transition-all">
               <h3 className="text-xl font-bold text-slate-900 mb-3">Rank Predictor</h3>
               <p className="text-slate-500 font-medium mb-8">Calculate your admission probability based on JEE, NEET, or CAT scores.</p>
               <div className="text-sm font-bold text-indigo-600 flex items-center group-hover:translate-x-1 transition-transform">
                 Launch Tool <ArrowRight className="w-4 h-4 ml-1" />
               </div>
            </div>
            <div onClick={() => navigate('/tools/finder')} className="cursor-pointer group bg-white border border-slate-200 rounded-3xl p-8 hover:border-indigo-600 hover:shadow-lg transition-all">
               <h3 className="text-xl font-bold text-slate-900 mb-3">College Finder</h3>
               <p className="text-slate-500 font-medium mb-8">Multi-step smart discovery based on your preferences and budget.</p>
               <div className="text-sm font-bold text-indigo-600 flex items-center group-hover:translate-x-1 transition-transform">
                 Launch Tool <ArrowRight className="w-4 h-4 ml-1" />
               </div>
            </div>
          </div>
          
          <button 
             onClick={() => navigate('/tools')}
             className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors py-4 border border-slate-200 rounded-2xl"
          >
            View all tools <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
