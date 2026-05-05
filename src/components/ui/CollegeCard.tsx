import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Scale, MapPin, IndianRupee, GraduationCap } from 'lucide-react';
import { College, toggleShortlist, useShortlists } from '../../lib/api';
import { useAppStore } from '../../store';
import { formatCurrency, cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function CollegeCard({ college, featured = false }: { college: College, featured?: boolean }) {
  const userId = useAppStore(state => state.userId);
  const { shortlists, mutate } = useShortlists();
  const isShortlisted = shortlists.some(s => s.id === college.id);
  
  const compareIds = useAppStore(state => state.compareIds);
  const addToCompare = useAppStore(state => state.addToCompare);
  const removeFromCompare = useAppStore(state => state.removeFromCompare);
  const isComparing = compareIds.includes(college.id);

  const handleShortlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleShortlist(college.id, isShortlisted, userId);
    mutate();
  };

  const handleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isComparing) {
      removeFromCompare(college.id);
    } else {
      addToCompare(college.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "group relative flex flex-col bg-white overflow-hidden transition-shadow duration-300",
        featured ? "rounded-2xl shadow-sm hover:shadow-md border border-slate-200" : "border border-slate-200 shadow-sm hover:shadow-md rounded-2xl"
      )}
    >
      <Link to={`/college/${college.slug}`} className={cn("block aspect-[4/3] bg-slate-100 relative overflow-hidden", featured ? "" : "sm:h-48 sm:w-full")}>
        <img 
          src={college.imageUrl} 
          alt={college.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleShortlist}
            className="p-2 bg-white/90 backdrop-blur-sm hover:bg-white text-slate-900 rounded-full shadow-lg transition-transform hover:scale-105"
          >
            <Bookmark className={cn("w-4 h-4", isShortlisted && "fill-slate-900")} />
          </button>
          <button 
            onClick={handleCompare}
            className={cn("p-2 backdrop-blur-sm rounded-full shadow-lg transition-transform hover:scale-105", isComparing ? "bg-indigo-600 text-white" : "bg-white/90 hover:bg-white text-slate-900")}
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>
        
        {/* Rating badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1 text-slate-700">
            <span className="text-amber-500">★</span> {college.rating.toFixed(1)}
          </span>
        </div>
      </Link>

      <div className={cn("flex flex-col flex-1 p-5", featured ? "p-6" : "")}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 border border-slate-100 rounded-lg p-1 bg-white shadow-sm shrink-0">
            <img src={college.logoUrl} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-0.5 truncate">
              {college.type} • {college.state}
            </p>
            <Link to={`/college/${college.slug}`} className="hover:underline">
              <h3 className="font-bold text-lg leading-tight truncate text-slate-800">
                {college.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-2 gap-y-3 gap-x-4 text-sm mt-4 border-t border-slate-100 pt-4">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-slate-600 font-medium line-clamp-1">{college.location}</span>
          </div>
          <div className="flex items-start gap-2">
            <GraduationCap className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-slate-600 font-medium">Avg {college.placementAverageLpa} LPA</span>
          </div>
          <div className="flex items-start gap-2 col-span-2">
            <IndianRupee className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <span className="text-slate-600 font-bold text-xs mt-0.5">{formatCurrency(college.feesAnnual)} / year</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
