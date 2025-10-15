
import React, { useState, useMemo } from 'react';
import { Post as PostType, User, Comment as CommentType } from '../types';
import { ThumbsUpIcon, MessageCircleIcon, ShareIcon } from './icons';

interface PostProps {
  post: PostType;
  currentUser: User;
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

const PostHeader: React.FC<{ author: User; timestamp: string }> = ({ author, timestamp }) => {
    const timeAgo = useMemo(() => {
        const date = new Date(timestamp);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "m";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m";
        return Math.floor(seconds) + "s";
    }, [timestamp]);

    return (
        <div className="flex items-center space-x-3">
            <img src={author.profilePicture} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
            <div>
                <p className="font-bold">{author.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{timeAgo}</p>
            </div>
        </div>
    );
};

const PostActions: React.FC<{ onLike: () => void; onComment: () => void; isLiked: boolean; }> = ({ onLike, onComment, isLiked }) => (
    <div className="flex justify-around border-t border-b border-slate-200 dark:border-slate-700 my-2">
        <button onClick={onLike} className={`flex-1 flex justify-center items-center space-x-2 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${isLiked ? 'text-primary dark:text-primary-dark' : 'text-slate-500 dark:text-slate-400'}`}>
            <ThumbsUpIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">Like</span>
        </button>
        <button onClick={onComment} className="flex-1 flex justify-center items-center space-x-2 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <MessageCircleIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">Comment</span>
        </button>
        <button className="flex-1 flex justify-center items-center space-x-2 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
            <ShareIcon className="w-5 h-5" />
            <span className="font-semibold text-sm">Share</span>
        </button>
    </div>
);

const CommentSection: React.FC<{ comments: CommentType[], currentUser: User, onAddComment: (text:string) => void }> = ({ comments, currentUser, onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(commentText.trim()) {
            onAddComment(commentText.trim());
            setCommentText('');
        }
    };

    return (
        <div className="pt-2 space-y-3">
            {comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-2">
                    <img src={comment.author.profilePicture} alt={comment.author.name} className="w-8 h-8 rounded-full object-cover" />
                    <div className="bg-slate-100 dark:bg-slate-700 rounded-xl p-2 px-3">
                        <p className="font-bold text-sm">{comment.author.name}</p>
                        <p className="text-sm">{comment.text}</p>
                    </div>
                </div>
            ))}
            <form onSubmit={handleCommentSubmit} className="flex items-center space-x-2 pt-2">
                 <img src={currentUser.profilePicture} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
                 <input 
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-slate-100 dark:bg-slate-700 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
                 />
            </form>
        </div>
    );
};


const Post: React.FC<PostProps> = ({ post, currentUser, onLikePost, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const isLiked = useMemo(() => post.likes.some(user => user.id === currentUser.id), [post.likes, currentUser.id]);
  
  const handleAddCommentForPost = (text: string) => {
    onAddComment(post.id, text);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md">
      <PostHeader author={post.author} timestamp={post.timestamp} />
      
      <p className="my-3">{post.content}</p>

      {post.image && (
        <div className="my-3 -mx-4">
          <img src={post.image} alt="Post content" className="w-full h-auto" />
        </div>
      )}

      <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>{post.likes.length > 0 && `${post.likes.length} Likes`}</span>
        <span>{post.comments.length > 0 && `${post.comments.length} Comments`}</span>
      </div>

      <PostActions 
        onLike={() => onLikePost(post.id)} 
        onComment={() => setShowComments(!showComments)}
        isLiked={isLiked}
      />
      
      {showComments && <CommentSection comments={post.comments} currentUser={currentUser} onAddComment={handleAddCommentForPost} />}
    </div>
  );
};

export default Post;
