import React from 'react';
import { User, Page } from '../types';

interface RightSidebarProps {
  users: User[];
  pages: Page[];
}

const Contact: React.FC<{ user: User }> = ({ user }) => (
    <a href="#" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
        <div className="relative">
            <img src={user.profilePicture} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-slate-800"></span>
        </div>
        <span className="font-semibold">{user.name}</span>
    </a>
);

const PageToWatch: React.FC<{ page: Page }> = ({ page }) => (
    <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer">
        <img src={page.coverPhoto} alt={page.name} className="w-16 h-16 rounded-lg object-cover" />
        <div className="flex-1">
            <p className="font-bold">{page.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{page.category}</p>
            <button className="mt-1 text-xs bg-primary text-white font-bold py-1 px-3 rounded-md hover:bg-blue-600 dark:hover:bg-primary-dark transition-colors">
                Follow
            </button>
        </div>
    </div>
);


const RightSidebar: React.FC<RightSidebarProps> = ({ users, pages }) => {
  const onlineUsers = users.filter(u => u.id !== 'user-1');

  return (
    <div className="space-y-6 sticky top-20">
      <div>
        <h3 className="font-bold text-slate-600 dark:text-slate-400 mb-2">Sponsored</h3>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
          <img src="https://picsum.photos/seed/ad/300/200" alt="ad" className="rounded-lg mb-2"/>
          <p className="text-sm">A great product you should definitely check out. It's amazing!</p>
        </div>
      </div>

      <hr className="border-slate-300 dark:border-slate-600" />
      
      <div>
        <h3 className="font-bold text-slate-600 dark:text-slate-400 mb-2">Pages to Watch</h3>
        <div className="space-y-2">
            {pages.map(page => <PageToWatch key={page.id} page={page} />)}
        </div>
      </div>
      
      <hr className="border-slate-300 dark:border-slate-600" />

      <div>
        <h3 className="font-bold text-slate-600 dark:text-slate-400 mb-2">Contacts</h3>
        <div className="space-y-2">
          {onlineUsers.map(user => <Contact key={user.id} user={user} />)}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;