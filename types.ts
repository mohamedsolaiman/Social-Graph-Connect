export interface User {
  id: string;
  name: string;
  profilePicture: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  author: User;
  timestamp: string;
  content: string;
  image?: string;
  likes: User[];
  comments: Comment[];
  shares: number;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  duration: number; // Duration in milliseconds
}

export interface Page {
    id: string;
    name: string;
    category: string;
    coverPhoto: string;
    followersCount: number;
}