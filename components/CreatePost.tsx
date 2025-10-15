
import React, { useState } from 'react';
import { User } from '../types';
import { CameraIcon, VideoIcon, SparklesIcon } from './icons';
import { generatePostIdea } from '../services/geminiService';

interface CreatePostProps {
  currentUser: User;
  onCreatePost: (content: string, image?: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ currentUser, onCreatePost }) => {
  const [postText, setPostText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postText.trim()) {
      onCreatePost(postText.trim());
      setPostText('');
    }
  };
  
  const handleGenerateIdea = async () => {
    setIsGenerating(true);
    const idea = await generatePostIdea();
    setPostText(idea);
    setIsGenerating(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
      <div className="flex items-start space-x-3">
        <img src={currentUser.profilePicture} alt={currentUser.name} className="w-12 h-12 rounded-full object-cover" />
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            className="w-full p-3 bg-slate-100 dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
            placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
          />
        </form>
      </div>
      <hr className="my-3 border-slate-200 dark:border-slate-700" />
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 sm:space-x-4">
           <button className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
            <VideoIcon className="w-6 h-6 text-red-500" />
            <span className="font-semibold hidden sm:block">Live Video</span>
          </button>
          <button className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors">
            <CameraIcon className="w-6 h-6 text-green-500" />
            <span className="font-semibold hidden sm:block">Photo/Video</span>
          </button>
           <button onClick={handleGenerateIdea} disabled={isGenerating} className="flex items-center space-x-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 p-2 rounded-lg transition-colors disabled:opacity-50">
            <SparklesIcon className="w-6 h-6 text-purple-500" />
            <span className="font-semibold hidden sm:block">{isGenerating ? 'Generating...' : 'Post Idea'}</span>
          </button>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!postText.trim()}
          className="bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 dark:hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
