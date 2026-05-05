import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Discover from './pages/Discover';
import CollegeDetail from './pages/CollegeDetail';
import Exams from './pages/Exams';
import Compare from './pages/Compare';
import Saved from './pages/Saved';
import ToolsHub from './pages/ToolsHub';
import RankPredictor from './pages/RankPredictor';
import CollegeFinder from './pages/CollegeFinder';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<PageWrapper key="/"><Home /></PageWrapper>} />
        <Route path="/discover" element={<PageWrapper key="/discover"><Discover /></PageWrapper>} />
        <Route path="/exams" element={<PageWrapper key="/exams"><Exams /></PageWrapper>} />
        <Route path="/college/:slug" element={<PageWrapper key="collegedetail"><CollegeDetail /></PageWrapper>} />
        <Route path="/compare" element={<PageWrapper key="/compare"><Compare /></PageWrapper>} />
        <Route path="/saved" element={<PageWrapper key="/saved"><Saved /></PageWrapper>} />
        <Route path="/tools" element={<PageWrapper key="/tools"><ToolsHub /></PageWrapper>} />
        <Route path="/tools/predictor" element={<PageWrapper key="/tools/predictor"><RankPredictor /></PageWrapper>} />
        <Route path="/tools/finder" element={<PageWrapper key="/tools/finder"><CollegeFinder /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper key="/login"><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper key="/signup"><Signup /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col min-h-screen"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full flex flex-col">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
