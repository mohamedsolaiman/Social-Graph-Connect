import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import NewsFeed from './components/NewsFeed';
import StoryViewer from './components/StoryViewer';
import { Post as PostType, User as UserType, Comment as CommentType, Page } from './types';
import { mockPosts, currentUser as initialUser, mockUsers, mockStories, mockPages, generateMockPosts } from './data/mockData';

const App: React.FC = () => {
  const [posts, setPosts] = useState<PostType[]>(mockPosts);
  const [currentUser] = useState<UserType>(initialUser);
  const [users] = useState<UserType[]>(mockUsers);
  const [pages] = useState<Page[]>(mockPages);

  const [viewingStoryIndex, setViewingStoryIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = useCallback((content: string, image?: string) => {
    const newPost: PostType = {
      id: `post-${Date.now()}`,
      author: currentUser,
      timestamp: new Date().toISOString(),
      content,
      image,
      likes: [],
      comments: [],
      shares: 0,
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [currentUser]);

  const handleLikePost = useCallback((postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          const isLiked = post.likes.some(user => user.id === currentUser.id);
          if (isLiked) {
            return {
              ...post,
              likes: post.likes.filter(user => user.id !== currentUser.id),
            };
          } else {
            return { ...post, likes: [...post.likes, currentUser] };
          }
        }
        return post;
      })
    );
  }, [currentUser]);

  const handleAddComment = useCallback((postId: string, text: string) => {
    const newComment: CommentType = {
        id: `comment-${Date.now()}`,
        author: currentUser,
        text,
        timestamp: new Date().toISOString(),
    };
    setPosts(prevPosts => prevPosts.map(post => {
        if (post.id === postId) {
            return {
                ...post,
                comments: [...post.comments, newComment]
            };
        }
        return post;
    }));
  }, [currentUser]);

  const loadMorePosts = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    // Simulate network delay
    await new Promise(res => setTimeout(res, 1500));
    const newPosts = await generateMockPosts(5, users);
    setPosts(prevPosts => [...prevPosts, ...newPosts]);
    setIsLoading(false);
  }, [isLoading, users]);

  const handleViewStory = (index: number) => {
    setViewingStoryIndex(index);
  };

  const handleCloseStory = () => {
    setViewingStoryIndex(null);
  };

  return (
    <div className="min-h-screen text-slate-800 dark:text-slate-200">
      <Header currentUser={currentUser} />
      <main className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8 px-4 pt-20 max-w-screen-2xl mx-auto">
        <aside className="hidden md:block md:col-span-3">
          <LeftSidebar currentUser={currentUser} />
        </aside>
        <section className="col-span-1 md:col-span-9 lg:col-span-6">
          <NewsFeed
            posts={posts}
            currentUser={currentUser}
            onCreatePost={handleCreatePost}
            onLikePost={handleLikePost}
            onAddComment={handleAddComment}
            onViewStory={handleViewStory}
            loadMorePosts={loadMorePosts}
            isLoading={isLoading}
          />
        </section>
        <aside className="hidden lg:block lg:col-span-3">
          <RightSidebar users={users} pages={pages} />
        </aside>
      </main>
      {viewingStoryIndex !== null && (
        <StoryViewer
          stories={mockStories}
          startIndex={viewingStoryIndex}
          onClose={handleCloseStory}
        />
      )}
    </div>
  );
};

export default App;