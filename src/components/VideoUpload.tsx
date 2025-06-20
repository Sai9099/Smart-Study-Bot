import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, FileText, Loader } from 'lucide-react';

interface VideoUploadProps {
  onVideoUpload: (file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));
    
    if (videoFile) {
      setIsProcessing(true);
      setTimeout(() => {
        onVideoUpload(videoFile);
        setIsProcessing(false);
      }, 1000);
    }
  }, [onVideoUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setIsProcessing(true);
      setTimeout(() => {
        onVideoUpload(file);
        setIsProcessing(false);
      }, 1000);
    }
  }, [onVideoUpload]);

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Upload Your Lecture Video
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Drop your video file here and let our AI analyze it to generate comprehensive notes, 
          detect student doubts, and create an interactive Q&A experience.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl border-2 border-dashed border-slate-300 p-12 text-center relative overflow-hidden"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <motion.div
          animate={{
            scale: isDragging ? 1.05 : 1,
            backgroundColor: isDragging ? '#f1f5f9' : '#ffffff'
          }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-2xl"
        />
        
        <div className="relative z-10">
          {isProcessing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center"
            >
              <Loader className="w-16 h-16 text-blue-500 animate-spin mb-4" />
              <p className="text-lg font-medium text-slate-700">Processing your video...</p>
              <p className="text-sm text-slate-500 mt-2">This may take a few moments</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                animate={{ y: isDragging ? -10 : 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6"
              >
                <Video className="w-20 h-20 text-blue-500 mx-auto mb-4" />
                <Upload className="w-12 h-12 text-slate-400 mx-auto" />
              </motion.div>
              
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {isDragging ? 'Drop your video here!' : 'Drag & drop your lecture video'}
              </h3>
              
              <p className="text-slate-600 mb-6">
                Supports MP4, AVI, MOV, and other common video formats
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <motion.label
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-medium cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Choose File
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </motion.label>
                
                <span className="text-slate-400">or</span>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-slate-100 text-slate-700 px-8 py-3 rounded-xl font-medium hover:bg-slate-200 transition-colors duration-200"
                >
                  Paste URL
                </motion.button>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Features Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-12 grid md:grid-cols-3 gap-8"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <FileText className="w-12 h-12 text-blue-500 mb-4" />
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Smart Notes</h3>
          <p className="text-slate-600">
            Automatically generate structured, comprehensive notes from your lecture content.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <Video className="w-12 h-12 text-purple-500 mb-4" />
          </motion.div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Doubt Detection</h3>
          <p className="text-slate-600">
            Identify student questions and provide clarification video suggestions.
          </p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          >
            <Upload className="w-12 h-12 text-green-500 mb-4" />
          </motion.div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Assistant</h3>
          <p className="text-slate-600">
            Chat with an AI that understands your lecture content and can answer questions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VideoUpload;