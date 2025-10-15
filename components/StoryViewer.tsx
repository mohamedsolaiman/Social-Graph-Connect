import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Story } from '../types';
import { CloseIcon, ChevronLeftIcon, ChevronRightIcon, HeartIcon } from './icons';

interface StoryViewerProps {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [progress, setProgress] = useState(0);

  const currentStory = useMemo(() => stories[currentIndex], [stories, currentIndex]);

  const goToNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  useEffect(() => {
    const duration = currentStory.duration;
    const intervalTime = 50; // Update progress every 50ms
    let timer: number;
    
    if (progress < 100) {
        timer = window.setInterval(() => {
            setProgress(prev => prev + (intervalTime / duration) * 100);
        }, intervalTime);
    } else {
        goToNext();
    }

    return () => {
      clearInterval(timer);
    };
  }, [progress, currentStory.duration, goToNext]);

  useEffect(() => {
    // Reset progress when story changes
    setProgress(0);
  }, [currentIndex]);
  
  const handleReaction = (reaction: string) => {
    console.log(`Reacted with ${reaction} on story ${currentStory.id}`);
    // Here you would typically send this reaction to a server
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-sm h-[90vh] bg-slate-800 rounded-lg overflow-hidden shadow-2xl">
        <img src={currentStory.imageUrl} alt={`Story by ${currentStory.user.name}`} className="w-full h-full object-cover" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-4">
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div className="bg-white h-full" style={{ width: `${progress}%`, transition: 'width 50ms linear' }}></div>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-2">
              <img src={currentStory.user.profilePicture} alt={currentStory.user.name} className="w-10 h-10 rounded-full object-cover" />
              <span className="text-white font-bold">{currentStory.user.name}</span>
            </div>
            <button onClick={onClose} className="text-white/80 hover:text-white transition-colors" aria-label="Close story viewer">
              <CloseIcon className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <button onClick={goToPrev} disabled={currentIndex === 0} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white disabled:opacity-0 transition-all" aria-label="Previous story">
            <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 text-white disabled:opacity-0 transition-all" aria-label="Next story">
            <ChevronRightIcon className="w-6 h-6" />
        </button>

        {/* Footer for Reactions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center space-x-4">
            <button onClick={() => handleReaction('❤️')} className="transform hover:scale-125 transition-transform text-2xl" aria-label="React with heart">❤️</button>
            <button onClick={() => handleReaction('😂')} className="transform hover:scale-125 transition-transform text-2xl" aria-label="React with laughing face">😂</button>
            <button onClick={() => handleReaction('😮')} className="transform hover:scale-125 transition-transform text-2xl" aria-label="React with wow face">😮</button>
            <button onClick={() => handleReaction('😢')} className="transform hover:scale-125 transition-transform text-2xl" aria-label="React with sad face">😢</button>
            <button onClick={() => handleReaction('🔥')} className="transform hover:scale-125 transition-transform text-2xl" aria-label="React with fire">🔥</button>
        </div>
      </div>
    </div>
  );
};

export default StoryViewer;
