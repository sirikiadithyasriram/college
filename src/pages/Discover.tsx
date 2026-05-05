import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, IndianRupee } from 'lucide-react';
import { useColleges } from '../lib/api';
import CollegeCard from '../components/ui/CollegeCard';
import { formatCurrency, cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Discover() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query') || '';
  
  const [query, setQuery] = useState(queryParam);
  const [localState, setLocalState] = useState(searchParams.get('state') || '');
  const [localType, setLocalType] = useState(searchParams.get('type') || '');
  const [maxFees, setMaxFees] = useState(searchParams.get('maxFees') || '1000000');
  const [page, setPage] = useState(1);

  const { colleges, isLoading } = useColleges({
    query: searchParams.get('query') || undefined,
    state: searchParams.get('state') || undefined,
    type: searchParams.get('type') || undefined,
    maxFees: searchParams.get('maxFees') || undefined,
  });

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('query') || '');
    setLocalState(searchParams.get('state') || '');
    setLocalType(searchParams.get('type') || '');
    setMaxFees(searchParams.get('maxFees') || '1000000');
  }, [searchParams]);

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (localState) params.set('state', localState);
    if (localType) params.set('type', localType);
    if (maxFees && maxFees !== '1000000') params.set('maxFees', maxFees);
    
    setSearchParams(params);
    setPage(1);
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setQuery('');
    setLocalState('');
    setLocalType('');
    setMaxFees('1000000');
    setPage(1);
    setIsMobileFiltersOpen(false);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') applyFilters();
  };

  const STATE_OPTIONS = ['Maharashtra', 'Delhi', 'Tamil Nadu', 'Karnataka', 'Telangana', 'Rajasthan'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col md:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden flex gap-2">
        <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
           <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             onKeyDown={handleSearchKeyPress}
             placeholder="Search..."
             className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black"
           />
        </div>
        <button 
          onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          className="px-4 py-2 bg-slate-100 rounded-lg text-sm font-medium flex items-center gap-2 text-slate-700"
        >
          <SlidersHorizontal className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Sidebar Filters */}
      <aside className={cn(
        "md:w-64 flex-shrink-0 flex flex-col gap-8",
        isMobileFiltersOpen ? "block" : "hidden md:block"
      )}>
        <div className="hidden md:block relative">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input
             type="text"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
             onKeyDown={handleSearchKeyPress}
             placeholder="Search colleges..."
             className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-slate-700"
           />
        </div>

        <div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-200 pb-2">Institution Type</h3>
          <div className="space-y-3">
            {['All', 'Public', 'Private'].map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="type" 
                  value={type === 'All' ? '' : type}
                  checked={localType === (type === 'All' ? '' : type)}
                  onChange={(e) => {
                    setLocalType(e.target.value);
                  }}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 pointer-events-none"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
           <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 border-b border-slate-200 pb-2">State</h3>
           <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
             <label className="flex items-center gap-2 cursor-pointer group">
                <input 
                  type="radio" 
                  name="state" 
                  value=""
                  checked={localState === ''}
                  onChange={(e) => setLocalState(e.target.value)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300"
                />
                <span className="text-sm text-slate-600 group-hover:text-slate-900">All States</span>
              </label>
             {STATE_OPTIONS.map(state => (
               <label key={state} className="flex items-center gap-2 cursor-pointer group">
                 <input 
                   type="radio" 
                   name="state" 
                   value={state}
                   checked={localState === state}
                   onChange={(e) => setLocalState(e.target.value)}
                   className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 cursor-pointer"
                 />
                 <span className="text-sm text-slate-600 group-hover:text-slate-900">{state}</span>
               </label>
             ))}
           </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">Max Fees</h3>
            <span className="text-xs font-medium text-slate-500">{formatCurrency(parseInt(maxFees))}</span>
          </div>
          <input 
            type="range" 
            min="100000" 
            max="1000000" 
            step="50000"
            value={maxFees}
            onChange={(e) => setMaxFees(e.target.value)}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-2">
            <span>1L</span>
            <span>10L+</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={applyFilters}
            className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 transition shadow-sm"
          >
            Apply
          </button>
          <button 
            onClick={clearFilters}
            className="flex-1 bg-white border border-slate-200 text-slate-600 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition"
          >
            Reset
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        <div className="mb-6 flex justify-between items-baseline border-b border-slate-200 pb-4">
          <h1 className="text-2xl font-bold text-slate-800">Directory</h1>
          <span className="text-sm text-slate-500">{colleges?.length || 0} results</span>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          colleges && colleges.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {colleges.slice(0, page * 20).map((college) => (
                  <CollegeCard key={college.id} college={college} />
                ))}
              </div>
              {colleges.length > page * 20 && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setPage(p => p + 1)}
                    className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition shadow-sm"
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-12">
              <Filter className="w-12 h-12 mb-4 text-slate-300" />
              <p className="text-lg font-bold text-slate-800 mb-1">No colleges found</p>
              <p className="text-sm mb-4">Try adjusting your filters to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-bold"
              >
                Clear all filters
              </button>
            </div>
          )
        )}
      </main>
    </div>
  );
}
