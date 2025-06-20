import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import VideoUpload from './components/VideoUpload';
import NotesDisplay from './components/NotesDisplay';
import DoubtsPanel from './components/DoubtsPanel';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';

export type TabType = 'upload' | 'notes' | 'doubts' | 'chat';

export interface LectureData {
  id: string;
  title: string;
  transcript: string;
  notes: string[];
  doubts: {
    question: string;
    timestamp: string;
    answered: boolean;
    suggestions: string[];
  }[];
  processingStatus: 'idle' | 'processing' | 'completed' | 'error';
}

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('upload');
  const [lectureData, setLectureData] = useState<LectureData | null>(null);

  const handleVideoUpload = (file: File) => {
    const newLecture: LectureData = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ""),
      transcript: '',
      notes: [],
      doubts: [],
      processingStatus: 'processing'
    };
    
    setLectureData(newLecture);
    
    // Simulate processing
    setTimeout(() => {
      const processedLecture: LectureData = {
        ...newLecture,
        transcript: "Sample transcript content would be generated here from the uploaded video using speech-to-text technology.",
        notes: [
          "Introduction to Neural Networks",
          "Types of activation functions: ReLU, Sigmoid, Tanh",
          "Backpropagation algorithm explanation",
          "Gradient descent optimization techniques",
          "Overfitting and regularization methods"
        ],
        doubts: [
          {
            question: "What is the intuition behind backpropagation?",
            timestamp: "15:30",
            answered: false,
            suggestions: [
              "Backpropagation Intuition - 3Blue1Brown",
              "Neural Network Training Explained",
              "Gradient Descent Visualization"
            ]
          },
          {
            question: "How do we prevent overfitting?",
            timestamp: "28:45",
            answered: true,
            suggestions: []
          }
        ],
        processingStatus: 'completed'
      };
      setLectureData(processedLecture);
      setActiveTab('notes');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Dashboard 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          lectureData={lectureData}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8"
          >
            {activeTab === 'upload' && (
              <VideoUpload onVideoUpload={handleVideoUpload} />
            )}
            
            {activeTab === 'notes' && lectureData && (
              <NotesDisplay lectureData={lectureData} />
            )}
            
            {activeTab === 'doubts' && lectureData && (
              <DoubtsPanel doubts={lectureData.doubts} />
            )}
            
            {activeTab === 'chat' && (
              <ChatInterface lectureData={lectureData} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;