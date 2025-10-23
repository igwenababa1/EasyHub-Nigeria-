import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { SparklesIcon, SpinnerIcon } from './Icons';

export const Hero: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>('https://images.unsplash.com/photo-1620712943543-26fc76334a19?q=80&w=1920&auto=format&fit=crop'); // Default image
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: `${prompt}, product photography, studio lighting, hyperrealistic, 8k`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '16:9',
        },
      });

      const base64ImageBytes = response.generatedImages[0]?.image?.imageBytes;
      if (base64ImageBytes) {
        const imageUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
        setGeneratedImage(imageUrl);
      } else {
        throw new Error('No image data received from API.');
      }
    } catch (e) {
      console.error('AI Image Generation Error:', e);
      setError('Failed to generate image. The model may have refused the prompt. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
        e.preventDefault();
        handleGenerate();
    }
  };

  return (
    <section id="hero" className="relative h-[90vh] min-h-[700px] flex items-center justify-center text-center overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 w-full h-full">
        {generatedImage && (
          <img
            key={generatedImage}
            src={generatedImage}
            alt="AI generated background"
            className="w-full h-full object-cover animate-fade-in-slow"
          />
        )}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      <div className="relative z-10 p-6 max-w-4xl mx-auto animate-fade-in-up">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg">
          Visualize Your Perfect Tech
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300 drop-shadow-md">
          Use our AI Image Studio to bring your dream product concepts to life. Describe what you want to see.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., A sleek transparent iPhone on a marble desk"
            className="flex-grow w-full bg-gray-900/50 border-2 border-gray-700 rounded-full py-4 px-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-lg backdrop-blur-md"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex-shrink-0 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <SpinnerIcon className="w-6 h-6" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <SparklesIcon className="w-6 h-6" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
        {error && <p className="mt-4 text-red-400">{error}</p>}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        @keyframes fade-in-slow {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-slow {
          animation: fade-in-slow 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
};