import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Scale, Target, Compass, ArrowRight } from 'lucide-react';

export default function ToolsHub() {
  const tools = [
    {
      id: 'compare',
      title: 'College Compare',
      description: 'Side-by-side technical analysis of placement rates, fees, and infrastructure.',
      icon: Scale,
      path: '/compare',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      id: 'predictor',
      title: 'Rank Predictor',
      description: 'Calculate your admission probability based on JEE, NEET, or CAT scores.',
      icon: Target,
      path: '/tools/predictor',
      color: 'bg-amber-50 text-amber-600',
    },
    {
      id: 'finder',
      title: 'College Finder',
      description: 'Multi-step smart discovery based on your preferences and budget.',
      icon: Compass,
      path: '/tools/finder',
      color: 'bg-emerald-50 text-emerald-600',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3 text-slate-900">Academic Decision Tools</h1>
        <p className="text-slate-500 text-lg">Leverage data-driven insights to make informed decisions about your future career path.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={tool.path}
              className="block group h-full bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:border-indigo-600"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 \${tool.color}`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tool.title}</h3>
              <p className="text-slate-500 mb-8 font-medium">{tool.description}</p>
              
              <div className="flex items-center text-sm font-bold text-indigo-600 group-hover:text-indigo-700 mt-auto">
                Launch Tool
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
