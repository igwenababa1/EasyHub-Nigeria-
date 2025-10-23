import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { XIcon, LockClosedIcon } from './Icons';

interface AuthModalProps {
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would have separate logic for login and signup
    // Here, we just log the user in with the provided details
    login(isLoginView ? 'Returning User' : name, email);
    onClose();
  };
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center animate-fade-in-fast"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-title"
    >
      <div 
        className="bg-gray-900 rounded-lg shadow-2xl w-full max-w-md m-4 p-8 relative transform transition-transform animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <XIcon className="w-6 h-6" />
        </button>

        <div>
          <h2 id="auth-title" className="text-2xl font-bold mb-2 text-white">
            {isLoginView ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 mb-6">
            {isLoginView ? "Sign in to continue." : "Get started with EasyHub."}
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginView && (
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-gray-800 border-gray-600 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            )}
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 border-gray-600 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-gray-800 border-gray-600 rounded p-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-3 rounded-full hover:from-orange-400 hover:to-amber-400 transition-all"
            >
              {isLoginView ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-sm text-gray-400 mt-6">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => setIsLoginView(!isLoginView)} className="font-semibold text-orange-400 hover:text-orange-300 ml-1">
              {isLoginView ? 'Sign up' : 'Sign in'}
            </button>
          </p>
          <p className="text-xs text-gray-500 mt-4 text-center flex items-center justify-center gap-2">
            <LockClosedIcon className="w-4 h-4" /> All your information is securely encrypted.
          </p>
        </div>
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