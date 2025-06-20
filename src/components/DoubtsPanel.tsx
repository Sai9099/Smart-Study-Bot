import React from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Clock, CheckCircle, ExternalLink, Youtube, AlertCircle } from 'lucide-react';

interface Doubt {
  question: string;
  timestamp: string;
  answered: boolean;
  suggestions: string[];
}

interface DoubtsPanelProps {
  doubts: Doubt[];
}

const DoubtsPanel: React.FC<DoubtsPanelProps> = ({ doubts }) => {
  const answeredDoubts = doubts.filter(d => d.answered);
  const unansweredDoubts = doubts.filter(d => !d.answered);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 border-b border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="bg-amber-500 rounded-full p-3">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Student Doubts & Clarifications
              </h2>
              <p className="text-slate-600">
                Detected questions and suggested resources for clarity
              </p>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="p-6 bg-slate-50 border-b border-slate-200">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-8 h-8 text-blue-500" />
                <div>
                  <p className="text-2xl font-bold text-slate-800">{doubts.length}</p>
                  <p className="text-sm text-slate-600">Total Doubts</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-8 h-8 text-green-500" />
                <div>
                  <p className="text-2xl font-bold text-slate-800">{answeredDoubts.length}</p>
                  <p className="text-sm text-slate-600">Resolved</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-8 h-8 text-amber-500" />
                <div>
                  <p className="text-2xl font-bold text-slate-800">{unansweredDoubts.length}</p>
                  <p className="text-sm text-slate-600">Need Clarity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doubts List */}
        <div className="p-6">
          {/* Unanswered Doubts */}
          {unansweredDoubts.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-amber-500" />
                <span>Needs Clarification ({unansweredDoubts.length})</span>
              </h3>
              
              <div className="space-y-4">
                {unansweredDoubts.map((doubt, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-amber-50 border border-amber-200 rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">
                          {doubt.question}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span>Timestamp: {doubt.timestamp}</span>
                        </div>
                      </div>
                    </div>
                    
                    {doubt.suggestions.length > 0 && (
                      <div>
                        <h5 className="font-medium text-slate-700 mb-3 flex items-center space-x-2">
                          <Youtube className="w-4 h-4 text-red-500" />
                          <span>Suggested Clarification Videos:</span>
                        </h5>
                        <div className="space-y-2">
                          {doubt.suggestions.map((suggestion, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              className="w-full bg-white border border-slate-200 rounded-lg p-3 text-left hover:bg-slate-50 transition-colors duration-200 flex items-center justify-between group"
                            >
                              <span className="text-slate-700">{suggestion}</span>
                              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Answered Doubts */}
          {answeredDoubts.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Resolved in Lecture ({answeredDoubts.length})</span>
              </h3>
              
              <div className="space-y-4">
                {answeredDoubts.map((doubt, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (unansweredDoubts.length + index) * 0.1 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-slate-800 mb-2">
                          {doubt.question}
                        </h4>
                        <div className="flex items-center space-x-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4" />
                          <span>Answered at: {doubt.timestamp}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {doubts.length === 0 && (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                No Doubts Detected
              </h3>
              <p className="text-slate-500">
                No student questions were found in this lecture.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DoubtsPanel;