import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CollegeFinder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Selection state
  const [degree, setDegree] = useState('B.Tech');
  const [statePref, setStatePref] = useState('Any');
  const [budget, setBudget] = useState('500000');
  
  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));
  
  const handleFinish = () => {
    // Navigate to discover page, could pass params in a real implementation
    navigate('/discover');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex-1 flex flex-col items-center">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
          <Compass className="w-8 h-8 text-emerald-600" />
        </div>
        <h1 className="text-4xl font-bold mb-3 text-slate-900">College Finder</h1>
        <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">Answer a few questions and let our smart algorithm curate a personalized list.</p>
      </div>

      <div className="w-full bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-sm min-h-[400px] flex flex-col relative overflow-hidden">
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 flex h-1.5 bg-slate-100">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: '33%' }}
            animate={{ width: `${(step / 3) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="flex-1">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">Step 1 of 3</span>
                  <h2 className="text-2xl font-bold text-slate-900">What are you looking to study?</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {['B.Tech', 'MBA', 'BBA', 'B.Sc Physics', 'MBBS', 'BA Economics'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setDegree(opt)}
                      className={`p-4 text-left border rounded-xl flex items-center justify-between transition-all ${degree === opt ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                    >
                      <span className="font-bold text-slate-800">{opt}</span>
                      {degree === opt && <Check className="w-5 h-5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">Step 2 of 3</span>
                  <h2 className="text-2xl font-bold text-slate-900">Preferred Location</h2>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {['Any', 'Maharashtra', 'Karnataka', 'Delhi', 'Tamil Nadu', 'Telangana'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setStatePref(opt)}
                      className={`p-4 text-center border rounded-xl transition-all ${statePref === opt ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                    >
                      <span className="font-bold text-slate-800">{opt}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2 block">Step 3 of 3</span>
                  <h2 className="text-2xl font-bold text-slate-900">What is your annual budget limit?</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    { val: '200000', label: 'Under ₹2 Lakhs / year' },
                    { val: '500000', label: 'Under ₹5 Lakhs / year' },
                    { val: '1000000', label: 'Under ₹10 Lakhs / year' },
                    { val: '9999999', label: 'No Limit' }
                  ].map(opt => (
                    <button 
                      key={opt.val}
                      onClick={() => setBudget(opt.val)}
                      className={`p-5 text-left border rounded-xl flex items-center justify-between transition-all ${budget === opt.val ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' : 'border-slate-200 hover:border-slate-300 bg-white'}`}
                    >
                      <span className="font-bold text-slate-800">{opt.label}</span>
                      {budget === opt.val && <Check className="w-5 h-5 text-emerald-600" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center">
          <button 
            onClick={handlePrev}
            className={`flex items-center gap-2 text-sm font-bold ${step === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:text-slate-900'}`}
            disabled={step === 1}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          {step < 3 ? (
            <button 
              onClick={handleNext}
              className="bg-slate-900 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-800 transition flex items-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="bg-emerald-600 text-white px-8 py-2.5 rounded-lg text-sm font-bold hover:bg-emerald-700 transition flex items-center gap-2 shadow-sm"
            >
              Show Results <Compass className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
