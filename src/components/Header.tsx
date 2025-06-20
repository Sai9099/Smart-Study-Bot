import React from 'react';
import { motion } from 'framer-motion';
import { Brain, GraduationCap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Brain className="w-8 h-8 text-blue-600" />
              <GraduationCap className="w-4 h-4 text-purple-600 absolute -top-1 -right-1" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart StudyBot
              </h1>
              <p className="text-sm text-slate-600">AI-Powered Lecture Analysis & Q&A Assistant</p>
            </div>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            Beta Version
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;