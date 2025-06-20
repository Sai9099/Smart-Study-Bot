import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, Download, Copy, CheckCircle } from 'lucide-react';
import { LectureData } from '../App';

interface NotesDisplayProps {
  lectureData: LectureData;
}

const NotesDisplay: React.FC<NotesDisplayProps> = ({ lectureData }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const handleCopyNote = (note: string, index: number) => {
    navigator.clipboard.writeText(note);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownloadNotes = () => {
    const notesContent = lectureData.notes.join('\n\n');
    const blob = new Blob([notesContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${lectureData.title}-notes.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (lectureData.processingStatus === 'processing') {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4"
          >
            <Clock className="w-16 h-16 text-blue-500" />
          </motion.div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Generating Your Notes...
          </h3>
          <p className="text-slate-600">
            Our AI is analyzing your lecture and creating comprehensive notes. This may take a few minutes.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 rounded-full p-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Lecture Notes
                </h2>
                <p className="text-slate-600">
                  {lectureData.title}
                </p>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadNotes}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Notes</span>
            </motion.button>
          </div>
        </div>

        {/* Notes Content */}
        <div className="p-6">
          <div className="space-y-4">
            {lectureData.notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-slate-50 rounded-xl p-6 hover:bg-slate-100 transition-colors duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        Note {index + 1}
                      </h3>
                    </div>
                    <p className="text-slate-700 leading-relaxed pl-11">
                      {note}
                    </p>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleCopyNote(note, index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-4 p-2 rounded-lg hover:bg-white"
                  >
                    {copiedIndex === index ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5 text-slate-400" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm text-slate-600">
            <span>Generated {lectureData.notes.length} comprehensive notes</span>
            <span>Ready for download and sharing</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotesDisplay;