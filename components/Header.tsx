
import React from 'react';
import { User } from '../types';
import { BellIcon } from './icons';

interface HeaderProps {
  currentUser: User;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-md z-50">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-bold text-primary dark:text-primary-dark">
            Connect
          </div>
          <div className="hidden sm:block">
            <input
              type="text"
              placeholder="Search Connect"
              className="bg-slate-100 dark:bg-slate-700 rounded-full py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
            <BellIcon className="h-6 w-6" />
          </button>
          <div className="flex items-center space-x-2">
            <img
              src={currentUser.profilePicture}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover"
            />
             <span className="font-semibold hidden sm:block">{currentUser.name}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
