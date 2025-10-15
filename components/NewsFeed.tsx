import React, { useRef, useEffect, useCallback } from 'react';
import { Post as PostType, User } from '../types';
import CreatePost from './CreatePost';
import Post from './Post';
import StoryReel from './StoryReel';
import { mockStories } from '../data/mockData';

interface NewsFeedProps {
  posts: PostType[];
  currentUser: User;
  onCreatePost: (content: string, image?: string) => void;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onViewStory: (index: number) => void;
  loadMorePosts: () => void;
  isLoading: boolean;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center p-4">
        <div className="w-10 h-10 border-4 border-slate-200 border-t-primary dark:border-slate-600 dark:border-t-primary-dark rounded-full animate-spin"></div>
    </div>
);

const NewsFeed: React.FC<NewsFeedProps> = ({ 
    posts, 
    currentUser, 
    onCreatePost, 
    onLikePost, 
    onAddComment, 
    onViewStory,
    loadMorePosts,
    isLoading
}) => {
  const observer = useRef<IntersectionObserver>();
  const lastPostElementRef = useCallback(node => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
              loadMorePosts();
          }
      });
      if (node) observer.current.observe(node);
  }, [isLoading, loadMorePosts]);

  return (
    <div className="space-y-6 pb-10">
      <StoryReel stories={mockStories} onViewStory={onViewStory} />
      <CreatePost currentUser={currentUser} onCreatePost={onCreatePost} />
      {posts.map((post, index) => {
          if (posts.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post.id}>
                    <Post 
                      post={post} 
                      currentUser={currentUser}
                      onLikePost={onLikePost}
                      onAddComment={onAddComment}
                    />
                </div>
              )
          } else {
            return (
                <Post 
                    key={post.id} 
                    post={post} 
                    currentUser={currentUser}
                    onLikePost={onLikePost}
                    onAddComment={onAddComment}
                />
            )
          }
      })}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default NewsFeed;