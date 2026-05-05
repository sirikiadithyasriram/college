import { Link } from 'react-router-dom';
import { useShortlists } from '../lib/api';
import CollegeCard from '../components/ui/CollegeCard';
import { BookmarkMinus } from 'lucide-react';
import { motion } from 'motion/react';

export default function Saved() {
  const { shortlists, isLoading } = useShortlists();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3 text-slate-900">Saved Institutions</h1>
        <p className="text-slate-500 text-lg">Your curated list of potential destinations.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-20">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : shortlists.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {shortlists.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-32 bg-slate-50 rounded-2xl border border-slate-200">
          <BookmarkMinus className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 text-slate-900">No saved colleges yet</h2>
          <p className="text-slate-500 mb-6 font-medium">Keep track of interesting institutions by adding them to your shortlist.</p>
          <Link to="/discover" className="bg-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-indigo-700 transition-colors shadow-sm">
            Start Exploring
          </Link>
        </div>
      )}
    </div>
  );
}
