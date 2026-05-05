import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link to="/" className="text-indigo-600 font-bold text-xl tracking-tight uppercase italic">Lumina.</Link>
            <p className="mt-2 text-sm text-slate-500 max-w-sm font-medium">
              A refined approached to discovering, comparing, and deciding on the next step of your education.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-bold text-slate-500">
            <Link to="/discover" className="hover:text-indigo-600 transition-colors">Discover</Link>
            <Link to="/exams" className="hover:text-indigo-600 transition-colors">Exams</Link>
            <Link to="/compare" className="hover:text-indigo-600 transition-colors">Compare</Link>
            <Link to="/tools" className="hover:text-indigo-600 transition-colors">Tools</Link>
            <Link to="/saved" className="hover:text-indigo-600 transition-colors">Saved</Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 flex justify-between items-center text-xs text-slate-400 font-medium">
          <p>© {new Date().getFullYear()} Lumina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
