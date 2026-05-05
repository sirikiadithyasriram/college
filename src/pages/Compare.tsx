import { Link } from 'react-router-dom';
import { useCompareColleges } from '../lib/api';
import { useAppStore } from '../store';
import { Scale, X, Check, MapPin, IndianRupee } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function Compare() {
  const compareIds = useAppStore(state => state.compareIds);
  const removeFromCompare = useAppStore(state => state.removeFromCompare);
  const clearCompare = useAppStore(state => state.clearCompare);
  
  const { colleges, isLoading } = useCompareColleges(compareIds);

    if (compareIds.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex-1 flex flex-col items-center justify-center">
        <Scale className="w-16 h-16 text-slate-300 mb-6" />
        <h1 className="text-3xl font-bold mb-3 text-slate-800">Compare Institutions</h1>
        <p className="text-slate-500 mb-8 max-w-md text-center">
          Add up to 3 colleges from the directory to compare their features, fees, and placements side-by-side.
        </p>
        <Link to="/discover" className="bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
          Go to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-3 text-slate-900">Compare</h1>
          <p className="text-slate-500">Evaluating {compareIds.length} institutions.</p>
        </div>
        <button 
          onClick={clearCompare}
          className="text-sm font-bold text-red-600 hover:text-red-700 hover:underline"
        >
          Clear all
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-20">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="w-full overflow-x-auto pb-8 custom-scrollbar">
          <div className="min-w-[800px]">
            {/* Header / Images */}
            <div className="grid grid-cols-4 gap-6 border-b border-slate-300 pb-8">
              <div className="col-span-1 pt-8">
                <p className="text-sm uppercase tracking-widest font-bold text-slate-400">At a glance</p>
              </div>
              {colleges.map(college => (
                <div key={college.id} className="col-span-1 relative">
                  <button 
                    onClick={() => removeFromCompare(college.id)}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 text-slate-400 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-200 z-10 transition-colors shadow-sm"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Link to={`/college/${college.slug}`} className="block group">
                    <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden mb-4 border border-slate-200 shadow-sm">
                      <img src={college.imageUrl} alt={college.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 shrink-0 bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
                         <img src={college.logoUrl} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="font-bold text-lg leading-tight group-hover:text-indigo-600 text-slate-800">
                        {college.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
              {/* Fill empty spots if less than 3 */}
              {[...Array(3 - colleges.length)].map((_, i) => (
                <div key={`empty-${i}`} className="col-span-1 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center aspect-[4/3] bg-slate-50">
                  <Link to="/discover" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-2">
                    <span className="text-2xl">+</span> Add another
                  </Link>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="divide-y divide-slate-100 text-sm">
              
              <div className="grid grid-cols-4 gap-6 py-6 group hover:bg-slate-50 transition-colors">
                <div className="col-span-1 font-bold text-slate-400 flex items-center">Rating</div>
                {colleges.map(c => (
                  <div key={c.id} className="col-span-1 font-bold text-lg flex items-center gap-1 text-slate-900">
                    <span className="text-amber-500 text-base mb-1">★</span> {c.rating.toFixed(1)} <span className="text-xs text-slate-400 font-medium ml-1">/ 10</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-6 py-6 group hover:bg-slate-50 transition-colors">
                <div className="col-span-1 font-bold text-slate-400 flex items-center">Type & Ranking</div>
                {colleges.map(c => (
                  <div key={c.id} className="col-span-1">
                    <p className="font-bold text-slate-800">{c.type}</p>
                    <p className="text-slate-500 text-xs mt-1 font-medium">NIRF Rank: {c.ranking || 'N/A'}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-6 py-6 group hover:bg-slate-50 transition-colors">
                <div className="col-span-1 font-bold text-slate-400 flex items-center">Location</div>
                {colleges.map(c => (
                  <div key={c.id} className="col-span-1 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                    <div>
                      <p className="font-bold text-slate-800">{c.location}</p>
                      <p className="text-slate-500 text-xs font-medium">{c.state}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-6 py-6 group hover:bg-slate-50 transition-colors">
                <div className="col-span-1 font-bold text-slate-400 flex items-center">Annual Fees</div>
                {colleges.map(c => (
                  <div key={c.id} className="col-span-1">
                    <p className="font-mono text-base font-bold text-slate-900">{formatCurrency(c.feesAnnual)}</p>
                    <p className="text-slate-500 text-xs mt-1 font-medium">per year</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-6 py-6 group hover:bg-slate-50 transition-colors">
                <div className="col-span-1 font-bold text-slate-400 flex items-center">Placements</div>
                {colleges.map(c => (
                  <div key={c.id} className="col-span-1">
                    <p className="text-base font-bold text-emerald-600">{c.placementAverageLpa} LPA <span className="text-xs text-slate-400 font-sans font-medium ml-1">Avg</span></p>
                    {c.placementHighestLpa && (
                       <p className="text-slate-500 text-xs font-medium mt-1">Highest: {c.placementHighestLpa} LPA</p>
                    )}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
