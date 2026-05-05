import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Target, Search, BarChart3, Clock, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RankPredictor() {
  const [exam, setExam] = useState('JEE Main');
  const [category, setCategory] = useState('General');
  const [scorePattern, setScorePattern] = useState('Rank');
  const [score, setScore] = useState('');
  
  const [submittedInfo, setSubmittedInfo] = useState<{exam: string, score: string} | null>(null);
  
  const [predictions, setPredictions] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!submittedInfo) return;
    let isMounted = true;
    
    const fetchPredictions = async () => {
      setIsLoading(true);
      // In a real app we'd call an API. Mocking here.
      await new Promise(r => setTimeout(r, 800)); // fake delay
      
      const mockData = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        college: `Simulated College ${i + 1}`,
        branch: ['Computer Science', 'Electronics', 'Mechanical', 'Civil'][Math.floor(Math.random() * 4)],
        chance: Math.floor(Math.random() * 40) + 50, // 50 to 90
        type: ['Public', 'Private'][Math.floor(Math.random() * 2)],
        closingRank: parseInt(submittedInfo.score) + Math.floor(Math.random() * 2000) - 500,
      })).sort((a, b) => b.chance - a.chance);
      
      if (isMounted) {
        setPredictions(mockData);
        setIsLoading(false);
      }
    };
    
    fetchPredictions();
    return () => { isMounted = false; };
  }, [submittedInfo]);

  const calculateResults = (e: React.FormEvent) => {
    e.preventDefault();
    if (!score) return;
    setSubmittedInfo({ exam, score });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1 flex flex-col items-center">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-100">
          <Target className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-4xl font-bold mb-3 text-slate-900">Rank Predictor</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Predict your admission probability across top institutions based on historic cutoff trends.</p>
      </div>

      <div className="w-full max-w-4xl grid md:grid-cols-[350px_1fr] gap-8 items-start">
        {/* Input Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <form onSubmit={calculateResults} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Exam</label>
              <select 
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              >
                <option>JEE Main</option>
                <option>JEE Advanced</option>
                <option>NEET</option>
                <option>CAT</option>
                <option>GATE</option>
                <option>CUET</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              >
                <option>General</option>
                <option>OBC-NCL</option>
                <option>EWS</option>
                <option>SC</option>
                <option>ST</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Input Type</label>
              <div className="grid grid-cols-2 gap-2">
                {['Rank', 'Percentile/Score'].map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setScorePattern(t)}
                    className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors ${scorePattern === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Your {scorePattern}</label>
              <input 
                type="number" 
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder={`Enter ${scorePattern.toLowerCase()}...`}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold rounded-lg py-3 hover:bg-indigo-700 transition flex justify-center items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" /> Calculate Chances
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="flex-1">
          {!submittedInfo ? (
            <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl h-full min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
              <Search className="w-12 h-12 text-slate-300 mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Awaiting Parameters</h3>
              <p className="text-slate-500 font-medium max-w-sm">
                Enter your prospective or actual scores on the left to see historical data-backed admission probabilities.
              </p>
            </div>
          ) : isLoading ? (
            <div className="bg-white border border-slate-200 rounded-2xl min-h-[400px] flex flex-col justify-center items-center">
               <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-slate-500 font-medium">Crunching historical data...</p>
            </div>
          ) : predictions ? (
            <div className="space-y-4">
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <h2 className="text-xl font-bold text-slate-900">Your Probabilities</h2>
                   <p className="text-sm text-slate-500 font-medium">Based on {submittedInfo.exam} {scorePattern}: {submittedInfo.score}</p>
                 </div>
                 <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-700">
                    <Share2 className="w-4 h-4" /> Share
                 </button>
               </div>

               {predictions.map((p, i) => (
                 <motion.div 
                   key={p.id}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.05 }}
                   className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row gap-6 sm:items-center justify-between"
                 >
                   <div>
                     <div className="flex items-center gap-2 mb-1">
                       <span className="text-xs font-bold uppercase tracking-wider text-slate-400">{p.type}</span>
                       <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                       <span className="text-xs font-bold text-slate-400">Est. Cutoff: {p.closingRank}</span>
                     </div>
                     <h3 className="font-bold text-lg text-slate-900 leading-tight">{p.college}</h3>
                     <p className="text-sm font-medium text-slate-600">{p.branch}</p>
                   </div>
                   
                   <div className="flex items-center gap-4">
                     <div className="flex flex-col items-end">
                       <span className="text-xs font-bold text-slate-500 mb-1">Probability</span>
                       <div className="flex items-center gap-2">
                         <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                           <div 
                             className={`h-full rounded-full ${p.chance > 75 ? 'bg-emerald-500' : p.chance > 60 ? 'bg-amber-400' : 'bg-red-400'}`} 
                             style={{ width: `${p.chance}%` }}
                           ></div>
                         </div>
                         <span className="font-bold text-lg text-slate-900 w-12 text-right">{p.chance}%</span>
                       </div>
                     </div>
                     <Link to="/discover" className="p-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-slate-600 transition">
                       <Search className="w-5 h-5" />
                     </Link>
                   </div>
                 </motion.div>
               ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
