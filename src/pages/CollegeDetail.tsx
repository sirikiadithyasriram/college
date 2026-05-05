import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCollegeDetail, toggleShortlist, useShortlists } from '../lib/api';
import { useAppStore } from '../store';
import { MapPin, Globe, CheckCircle2, Bookmark, Scale, ArrowLeft, Building2 } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';

export default function CollegeDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { college, isLoading } = useCollegeDetail(slug as string);
  
  const userId = useAppStore(state => state.userId);
  const { shortlists, mutate } = useShortlists();
  const isShortlisted = college ? shortlists.some(s => s.id === college.id) : false;
  
  const compareIds = useAppStore(state => state.compareIds);
  const addToCompare = useAppStore(state => state.addToCompare);
  const removeFromCompare = useAppStore(state => state.removeFromCompare);
  const isComparing = college ? compareIds.includes(college.id) : false;

  const handleShortlist = async () => {
    if (!college) return;
    await toggleShortlist(college.id, isShortlisted, userId);
    mutate();
  };

  const handleCompare = () => {
    if (!college) return;
    if (isComparing) removeFromCompare(college.id);
    else addToCompare(college.id);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-serif font-bold">College Not Found</h2>
        <button onClick={() => navigate('/discover')} className="mt-4 underline text-gray-500 hover:text-black">
          Back to directory
        </button>
      </div>
    );
  }

  return (
      <div className="flex-1 bg-white">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh] xl:h-[60vh] bg-slate-900">
        <img 
          src={college.imageUrl} 
          alt={college.name} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="absolute top-6 left-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="absolute bottom-0 w-full">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                
                <div className="flex items-end gap-6 flex-1">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl p-2 md:p-3 shadow-xl flex-shrink-0 relative -bottom-4 border border-slate-200">
                    <img src={college.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                  <div className="mb-2">
                    <p className="text-slate-300 font-bold text-xs tracking-[0.2em] uppercase mb-2">
                      {college.type} Institute
                    </p>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl text-white font-bold max-w-3xl leading-tight">
                      {college.name}
                    </h1>
                  </div>
                </div>

                <div className="flex gap-3 mb-2 shrink-0 self-start md:self-end">
                  <button 
                    onClick={handleShortlist}
                    className="flex text-sm items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-5 py-3 rounded-full font-bold transition-colors"
                  >
                    <Bookmark className={cn("w-4 h-4", isShortlisted && "fill-white")} />
                    {isShortlisted ? 'Saved' : 'Save'}
                  </button>
                  <button 
                    onClick={handleCompare}
                    className={cn(
                      "flex text-sm items-center gap-2 backdrop-blur-md px-5 py-3 rounded-full font-bold transition-colors",
                      isComparing ? "bg-indigo-600 text-white" : "bg-white/10 hover:bg-white/20 text-white"
                    )}
                  >
                    <Scale className="w-4 h-4" />
                    {isComparing ? 'Added to Compare' : 'Compare'}
                  </button>
                </div>
                
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-slate-900">About</h2>
              <p className="text-slate-600 leading-relaxed text-lg font-medium">
                {college.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-slate-900">Programs & Courses</h2>
              <div className="space-y-4">
                {college.courses.map((course) => (
                  <div key={course.id} className="border border-slate-200 p-5 rounded-2xl flex justify-between items-center group hover:border-indigo-600 transition-colors shadow-sm">
                    <div>
                      <h4 className="font-bold text-[15px] text-slate-800">{course.name}</h4>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 uppercase tracking-widest font-bold">
                        <span>{course.degree}</span>
                        <span>•</span>
                        <span>{course.durationYears} Years</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-900">{formatCurrency(course.feesAnnual)}</p>
                      <p className="text-xs text-slate-400 mt-0.5 font-medium">per year</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold mb-6 text-slate-900">Quick Facts</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                    <MapPin className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-bold">Location</p>
                    <p className="font-bold text-sm text-slate-800">{college.location}, {college.state}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                    <Building2 className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-bold">Institution Type</p>
                    <p className="font-bold text-sm text-slate-800">{college.type}</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                    <span className="font-bold text-sm text-slate-500">#</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-bold">Ranking (NIRF)</p>
                    <p className="font-bold text-sm text-slate-800">{college.ranking || 'N/A'}</p>
                  </div>
                </li>
                {college.website && (
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                      <Globe className="w-4 h-4 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5 font-bold">Website</p>
                      <a href={college.website} target="_blank" rel="noreferrer" className="font-bold text-sm text-indigo-600 hover:text-indigo-700 hover:underline">Visit official site</a>
                    </div>
                  </li>
                )}
              </ul>
            </div>

            <div className="border border-slate-200 p-8 rounded-2xl shadow-sm bg-white">
              <h3 className="text-xl font-bold mb-6 text-slate-900">Placements</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">Average Package</p>
                  <p className="text-3xl font-bold tracking-tight text-slate-900">{college.placementAverageLpa} <span className="text-base text-slate-400">LPA</span></p>
                </div>
                {college.placementHighestLpa && (
                  <div className="pt-6 border-t border-slate-100">
                    <p className="text-xs text-slate-400 uppercase tracking-wider mb-1 font-bold">Highest Package</p>
                    <p className="text-2xl font-bold tracking-tight text-slate-900">{college.placementHighestLpa} <span className="text-base text-slate-400">LPA</span></p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-indigo-600 text-white p-8 rounded-2xl shadow-lg border border-indigo-500">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-400 text-xl">★</span>
                <span className="text-4xl font-bold">{college.rating.toFixed(1)}</span>
                <span className="text-indigo-200 text-sm mt-2 font-bold">/ 10</span>
              </div>
              <p className="text-sm text-indigo-100 font-medium">Overall Rating based on academic excellence, placements, and student reviews.</p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
