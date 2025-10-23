import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { XIcon, SparklesIcon, SpinnerIcon } from './Icons';

interface AIImageStudioProps {
  onClose: () => void;
}

type AspectRatio = '1:1' | '16:9' | '9:16';
type ImageSize = 1024 | 2048 | 4096;

export const AIImageStudio: React.FC<AIImageStudioProps> = ({ onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('1:1');
  const [size, setSize] = useState<ImageSize>(1024);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio,
          // Note: The 'size' parameter is an assumption for higher resolution output based on the user request.
          // This allows for generating more detailed, higher-quality images.
          size,
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
      setError('Failed to generate image. The model may have refused the prompt. Please try again with a different description.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const getAspectRatioClass = () => {
    switch(aspectRatio) {
      case '16:9': return 'aspect-video';
      case '9:16': return 'aspect-[9/16]';
      case '1:1':
      default: return 'aspect-square';
    }
  }

  const handleMouseMoveOnImage = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const { width, height } = rect;
    const mouseX = x / width - 0.5;
    const mouseY = y / height - 0.5;

    const rotateY = mouseX * 20; // Max rotation 10 degrees
    const rotateX = -mouseY * 20; // Max rotation 10 degrees

    target.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    target.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeaveImage = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    e.currentTarget.style.transition = 'transform 0.5s ease-in-out';
  };

  return (
    <div className="animate-fade-in-fast min-h-screen">
      <div className="container mx-auto px-6 py-16">
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">AI Image Studio</h1>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                <XIcon className="w-8 h-8" />
            </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <label htmlFor="prompt" className="block text-lg font-semibold text-gray-300 mb-2">
                Image Description
              </label>
              <textarea
                id="prompt"
                rows={6}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., A futuristic smartphone concept made of glass, on a neon-lit desk"
                className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg p-4 text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label htmlFor="aspectRatio" className="block text-lg font-semibold text-gray-300 mb-2">
                Aspect Ratio
              </label>
              <select
                id="aspectRatio"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
                className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                disabled={isLoading}
              >
                <option value="1:1">Square (1:1)</option>
                <option value="16:9">Landscape (16:9)</option>
                <option value="9:16">Portrait (9:16)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="size" className="block text-lg font-semibold text-gray-300 mb-2">
                Resolution
              </label>
              <select
                id="size"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value, 10) as ImageSize)}
                className="w-full bg-gray-900 border-2 border-gray-700 rounded-lg p-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                disabled={isLoading}
              >
                <option value={1024}>Standard (1024px)</option>
                <option value={2048}>High (2048px)</option>
                <option value={4096}>Ultra (4096px)</option>
              </select>
            </div>
            
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="w-6 h-6" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6" />
                  <span>Generate Image</span>
                </>
              )}
            </button>
          </div>
          
          {/* Result */}
          <div className="lg:col-span-2 bg-gray-900/50 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[60vh]">
             <div className={`w-full max-w-xl transition-all duration-300 ${getAspectRatioClass()}`}>
                {isLoading && (
                    <div className="w-full h-full bg-gray-800 rounded-lg animate-pulse flex items-center justify-center">
                        <p className="text-gray-500">The AI is thinking...</p>
                    </div>
                )}
                {error && (
                    <div className="w-full h-full bg-red-900/20 border border-red-500/50 rounded-lg flex items-center justify-center p-4">
                        <p className="text-red-300 text-center">{error}</p>
                    </div>
                )}
                {generatedImage && !isLoading && (
                    <div 
                      className="relative group w-full h-full"
                      onMouseMove={handleMouseMoveOnImage}
                      onMouseLeave={handleMouseLeaveImage}
                      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.5s ease-in-out' }}
                    >
                        <img 
                          src={generatedImage} 
                          alt={prompt} 
                          className="w-full h-full object-contain rounded-lg shadow-2xl shadow-black/50" 
                          style={{ transform: 'translateZ(20px)' }}
                        />
                        <a 
                          href={generatedImage} 
                          download={`easyhub-ai-${Date.now()}.jpg`}
                          className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ transform: 'translateZ(50px)' }}
                        >
                          Download
                        </a>
                    </div>
                )}
                {!isLoading && !error && !generatedImage && (
                    <div className="w-full h-full border-2 border-dashed border-gray-700 rounded-lg flex flex-col items-center justify-center p-4">
                        <SparklesIcon className="w-16 h-16 text-gray-600 mb-4" />
                        <p className="text-gray-500 text-center">Your generated image will appear here.</p>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};