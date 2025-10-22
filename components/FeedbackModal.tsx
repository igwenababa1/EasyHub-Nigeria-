import React, { useState, useEffect } from 'react';
import { XIcon, CheckCircleIcon } from './Icons';

interface FeedbackModalProps {
  onClose: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState('General');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback Submitted:', { type: feedbackType, message });
    setIsSubmitted(true);
    // Simulate API call and close after a delay
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in-fast"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-lg m-4 p-8 relative transform transition-transform animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <XIcon className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 id="feedback-title" className="text-2xl font-bold mb-6 text-white">Provide Feedback</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="feedbackType" className="block text-sm font-medium text-gray-400 mb-2">
                  Feedback Category
                </label>
                <select
                  id="feedbackType"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full bg-gray-800 border-gray-600 rounded p-2 text-white"
                >
                  <option>General</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Website Experience</option>
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you think..."
                  className="w-full bg-gray-800 border-gray-600 rounded p-2 text-white resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-full hover:from-orange-400 hover:to-amber-400 transition-all"
              >
                Submit Feedback
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Thank You!</h2>
            <p className="text-gray-400 mt-2">Your feedback has been received.</p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        @keyframes scale-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scale-in { animation: scale-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};