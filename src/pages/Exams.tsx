import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Calendar, GraduationCap, Globe, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const EXAMS = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination - Main',
    category: 'Engineering',
    level: 'Undergraduate',
    mode: 'Online (CBT)',
    status: 'Registration Open',
    date: 'Jan 2026 - Apr 2026',
    description: 'National level undergraduate engineering entrance exam for admission to NITs, IIITs, and CFTIs.',
    website: 'https://jeemain.nta.nic.in/',
    tags: ['B.Tech', 'B.E.', 'B.Arch']
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination - Advanced',
    category: 'Engineering',
    level: 'Undergraduate',
    mode: 'Online (CBT)',
    status: 'Upcoming',
    date: 'May 2026',
    description: 'The sole prerequisite for admission to the Indian Institutes of Technology (IITs).',
    website: 'https://jeeadv.ac.in/',
    tags: ['IIT', 'B.Tech', 'Engineering']
  },
  {
    id: 'neet-ug',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    category: 'Medical',
    level: 'Undergraduate',
    mode: 'Offline (Pen & Paper)',
    status: 'Upcoming',
    date: 'May 2026',
    description: 'Single national level medical entrance exam for admission to MBBS/BDS courses.',
    website: 'https://neet.nta.nic.in/',
    tags: ['MBBS', 'BDS', 'Medical']
  },
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    category: 'Management',
    level: 'Postgraduate',
    mode: 'Online (CBT)',
    status: 'Upcoming',
    date: 'Nov 2026',
    description: 'National level management entrance exam for admission to IIMs and other top B-schools.',
    website: 'https://iimcat.ac.in/',
    tags: ['MBA', 'PGDM', 'Management']
  },
  {
    id: 'gate',
    name: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    category: 'Engineering',
    level: 'Postgraduate',
    mode: 'Online (CBT)',
    status: 'Registration Closed',
    date: 'Feb 2026',
    description: 'National level exam that primarily tests the comprehensive understanding of various undergraduate subjects in engineering and science.',
    website: 'https://gate.iitk.ac.in/',
    tags: ['M.Tech', 'Ph.D.', 'PSU Jobs']
  },
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    category: 'Law',
    level: 'Undergraduate / Postgraduate',
    mode: 'Offline (Pen & Paper)',
    status: 'Upcoming',
    date: 'Dec 2026',
    description: 'National level entrance exam for admissions to undergraduate and postgraduate law programmes at National Law Universities.',
    website: 'https://consortiumofnlus.ac.in/',
    tags: ['BA LLB', 'LLM', 'Law']
  },
  {
    id: 'bitsat',
    name: 'BITSAT',
    fullName: 'BITS Admission Test',
    category: 'Engineering',
    level: 'Undergraduate',
    mode: 'Online (CBT)',
    status: 'Upcoming',
    date: 'May - Jun 2026',
    description: 'University level entrance exam for admission to BITS Pilani, Goa, and Hyderabad campuses.',
    website: 'https://bitsadmission.com/',
    tags: ['B.E.', 'B.Pharm', 'M.Sc.']
  },
  {
    id: 'cuet',
    name: 'CUET UG',
    fullName: 'Common University Entrance Test',
    category: 'General',
    level: 'Undergraduate',
    mode: 'Online (CBT)',
    status: 'Upcoming',
    date: 'May 2026',
    description: 'Common entrance exam for admission to undergraduate programmes in Central Universities and other participating universities.',
    website: 'https://cuet.samarth.ac.in/',
    tags: ['B.A.', 'B.Sc.', 'B.Com.']
  }
];

export default function Exams() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(EXAMS.map(e => e.category)))];

  const filteredExams = EXAMS.filter(exam => {
    const matchesQuery = exam.name.toLowerCase().includes(query.toLowerCase()) || 
                         exam.fullName.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || exam.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 w-full">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Entrance Exams</h1>
          <p className="text-lg text-slate-500 max-w-2xl font-medium mb-8">
            Stay updated with the latest information on top entrance exams. Track registration dates, eligibility, and direct links to official websites.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search exams (e.g., JEE, NEET)..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-3.5 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                    category === cat 
                      ? 'bg-slate-900 text-white shadow-sm' 
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExams.map((exam, i) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:border-indigo-600 hover:shadow-md transition-all flex flex-col h-full group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                      {exam.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      exam.status === 'Registration Open' ? 'bg-emerald-50 text-emerald-600' :
                      exam.status === 'Upcoming' ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {exam.status}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {exam.name}
                  </h2>
                  <p className="text-sm font-bold text-slate-400 mt-1">{exam.fullName}</p>
                </div>
              </div>

              <p className="text-slate-600 font-medium mb-8 flex-1">
                {exam.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-slate-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                    <Calendar className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Exam Date</span>
                    <span className="text-sm font-bold text-slate-800">{exam.date}</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                    <GraduationCap className="w-4 h-4 text-slate-500" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">Level</span>
                    <span className="text-sm font-bold text-slate-800">{exam.level}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex gap-2 flex-wrap max-w-[60%]">
                  {exam.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={exam.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-bold text-white bg-slate-900 hover:bg-indigo-600 px-4 py-2.5 rounded-lg transition-colors"
                >
                  <Globe className="w-4 h-4" /> Official Site
                </a>
              </div>
            </motion.div>
          ))}
          
          {filteredExams.length === 0 && (
            <div className="col-span-1 lg:col-span-2 text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
               <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
               <h3 className="text-xl font-bold text-slate-800 mb-2">No exams found</h3>
               <p className="text-slate-500 font-medium">Try adjusting your search query or category filter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
