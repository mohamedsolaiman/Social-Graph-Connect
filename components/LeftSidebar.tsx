
import React from 'react';
import { User } from '../types';
import { UsersIcon, TvIcon, StoreIcon } from './icons';

interface LeftSidebarProps {
  currentUser: User;
}

const SidebarLink: React.FC<{icon: React.ReactNode, label: string}> = ({ icon, label }) => (
    <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        {icon}
        <span className="font-semibold">{label}</span>
    </a>
);

const LeftSidebar: React.FC<LeftSidebarProps> = ({ currentUser }) => {
  return (
    <div className="space-y-4 sticky top-20">
      <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        <img src={currentUser.profilePicture} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
        <span className="font-semibold">{currentUser.name}</span>
      </a>
      <SidebarLink icon={<UsersIcon className="w-8 h-8 text-primary dark:text-primary-dark" />} label="Friends" />
      <SidebarLink icon={<TvIcon className="w-8 h-8 text-primary dark:text-primary-dark" />} label="Watch" />
      <SidebarLink icon={<StoreIcon className="w-8 h-8 text-primary dark:text-primary-dark" />} label="Marketplace" />
       <SidebarLink icon={<UsersIcon className="w-8 h-8 text-primary dark:text-primary-dark" />} label="Groups" />
      
      <hr className="border-slate-300 dark:border-slate-600" />

      <h3 className="font-bold text-slate-600 dark:text-slate-400">Your Shortcuts</h3>
      {/* Placeholder for shortcuts */}
      <div className="flex items-center space-x-3 p-2">
        <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
        <span>Design Community</span>
      </div>
      <div className="flex items-center space-x-3 p-2">
        <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-lg"></div>
        <span>React Developers</span>
      </div>
    </div>
  );
};

export default LeftSidebar;
