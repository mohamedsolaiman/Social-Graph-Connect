import React from 'react';
import { Story } from '../types';

interface StoryReelProps {
  stories: Story[];
  onViewStory: (index: number) => void;
}

const StoryCard: React.FC<{ story: Story; onClick: () => void }> = ({ story, onClick }) => (
    <button onClick={onClick} className="relative w-28 h-48 rounded-xl overflow-hidden shadow-md cursor-pointer transform hover:scale-105 hover:shadow-lg transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-slate-900">
        <img src={story.imageUrl} alt={`${story.user.name}'s story`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <img src={story.user.profilePicture} alt={story.user.name} className="absolute top-2 left-2 w-10 h-10 rounded-full border-4 border-primary dark:border-primary-dark object-cover" />
        <span className="absolute bottom-2 left-2 right-2 text-white font-semibold text-sm truncate text-left">{story.user.name}</span>
    </button>
);

const StoryReel: React.FC<StoryReelProps> = ({ stories, onViewStory }) => {
  return (
    <div className="w-full">
      <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
        {stories.map((story, index) => (
          <StoryCard key={story.id} story={story} onClick={() => onViewStory(index)} />
        ))}
      </div>
    </div>
  );
};

// A simple utility to hide the scrollbar if needed, Tailwind doesn't have a built-in one
const style = document.createElement('style');
style.innerHTML = `.scrollbar-hide::-webkit-scrollbar { display: none; } .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }`;
document.head.appendChild(style);


export default StoryReel;