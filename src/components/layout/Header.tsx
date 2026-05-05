import { Link, useLocation } from 'react-router-dom';
import { useAppStore } from '../../store';
import { Map, Bookmark, Scale, Wand2, FileText, UserCircle, LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'motion/react';

export default function Header() {
  const location = useLocation();
  const compareCount = useAppStore((state) => state.compareIds.length);
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);

  const navItems = [
    { name: 'Discover', path: '/discover', icon: Map },
    { name: 'Exams', path: '/exams', icon: FileText },
    { name: 'Compare', path: '/compare', icon: Scale, badge: compareCount },
    { name: 'Tools', path: '/tools', icon: Wand2 },
    { name: 'Saved', path: '/saved', icon: Bookmark },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-indigo-600 font-bold text-xl tracking-tight uppercase italic">Lumina.</span>
            </Link>
            
            <nav className="hidden md:flex gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative flex items-center gap-2 text-sm font-medium transition-colors hover:text-indigo-600",
                    location.pathname === item.path ? "text-indigo-600" : "text-slate-600"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 inline-flex items-center justify-center bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-[21px] h-[2px] bg-indigo-600"
                    />
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-700">
                  <UserCircle className="w-5 h-5 text-indigo-600" />
                  <span>{user.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition shadow-sm"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
