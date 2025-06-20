import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, HelpCircle, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { TabType, LectureData } from '../App';

interface DashboardProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  lectureData: LectureData | null;
}

const Dashboard: React.FC<DashboardProps> = ({ activeTab, setActiveTab, lectureData }) => {
  const tabs = [
    { id: 'upload' as TabType, label: 'Upload Video', icon: Upload },
    { id: 'notes' as TabType, label: 'Notes', icon: FileText },
    { id: 'doubts' as TabType, label: 'Doubts', icon: HelpCircle },
    { id: 'chat' as TabType, label: 'AI Chat', icon: MessageSquare },
  ];

  const getStatusIcon = () => {
    if (!lectureData) return null;
    
    switch (lectureData.processingStatus) {
      case 'processing':
        return <Clock className="w-5 h-5 text-amber-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/50 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Status Section */}
        <div className="flex items-center space-x-4">
          {lectureData && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center space-x-3 bg-slate-50 rounded-xl p-3"
            >
              {getStatusIcon()}
              <div>
                <p className="font-semibold text-slate-800 truncate max-w-48">
                  {lectureData.title}
                </p>
                <p className="text-sm text-slate-600 capitalize">
                  {lectureData.processingStatus === 'processing' ? 'Processing...' : 
                   lectureData.processingStatus === 'completed' ? 'Ready' : 
                   lectureData.processingStatus}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            // Only disable notes and doubts tabs when no lecture data exists
            const isDisabled = !lectureData && (tab.id === 'notes' || tab.id === 'doubts');
            
            return (
              <motion.button
                key={tab.id}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && setActiveTab(tab.id)}
                disabled={isDisabled}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                    : isDisabled 
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      {lectureData && lectureData.processingStatus === 'completed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">{lectureData.notes.length}</p>
            <p className="text-sm text-blue-700">Notes Generated</p>
          </div>
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-600">{lectureData.doubts.length}</p>
            <p className="text-sm text-purple-700">Doubts Detected</p>
          </div>
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-600">
              {lectureData.doubts.filter(d => d.answered).length}
            </p>
            <p className="text-sm text-green-700">Resolved</p>
          </div>
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {lectureData.doubts.filter(d => !d.answered).length}
            </p>
            <p className="text-sm text-amber-700">Need Clarity</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;