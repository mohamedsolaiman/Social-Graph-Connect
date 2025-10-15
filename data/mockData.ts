import { User, Post, Story, Comment, Page } from '../types';
import { generatePostIdea } from '../services/geminiService';

export const currentUser: User = {
  id: 'user-1',
  name: 'You',
  profilePicture: 'https://picsum.photos/seed/user-1/100/100',
};

export const mockUsers: User[] = [
  currentUser,
  { id: 'user-2', name: 'Jane Doe', profilePicture: 'https://picsum.photos/seed/user-2/100/100' },
  { id: 'user-3', name: 'John Smith', profilePicture: 'https://picsum.photos/seed/user-3/100/100' },
  { id: 'user-4', name: 'Emily White', profilePicture: 'https://picsum.photos/seed/user-4/100/100' },
  { id: 'user-5', name: 'Michael Brown', profilePicture: 'https://picsum.photos/seed/user-5/100/100' },
  { id: 'user-6', name: 'Sarah Green', profilePicture: 'https://picsum.photos/seed/user-6/100/100' },
];

const commentsForPost1: Comment[] = [
    {
        id: 'comment-1',
        author: mockUsers[2],
        text: 'What a beautiful view!',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
        id: 'comment-2',
        author: mockUsers[3],
        text: 'I wish I was there!',
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    }
];

const commentsForPost2: Comment[] = [
    {
        id: 'comment-3',
        author: mockUsers[4],
        text: 'That looks delicious! Recipe?',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    }
];

export const mockPosts: Post[] = [
  {
    id: 'post-1',
    author: mockUsers[1],
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    content: 'Enjoying a wonderful sunset at the beach. Feeling blessed!',
    image: 'https://picsum.photos/seed/post-1/800/600',
    likes: [mockUsers[2], mockUsers[3], mockUsers[4]],
    comments: commentsForPost1,
    shares: 12,
  },
  {
    id: 'post-2',
    author: mockUsers[2],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    content: 'Tried a new recipe for lunch today! Homemade pasta carbonara. 🍝',
    image: 'https://picsum.photos/seed/post-2/800/600',
    likes: [mockUsers[1], mockUsers[3], mockUsers[5], currentUser],
    comments: commentsForPost2,
    shares: 5,
  },
  {
    id: 'post-3',
    author: mockUsers[3],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    content: 'Just finished reading an amazing book. Highly recommend "The Midnight Library" by Matt Haig. A truly thought-provoking read.',
    likes: [mockUsers[1]],
    comments: [],
    shares: 2,
  },
  {
    id: 'post-4',
    author: mockUsers[4],
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    content: 'Exploring the city today! Found this hidden gem of a coffee shop.',
    image: 'https://picsum.photos/seed/post-4/800/600',
    likes: [mockUsers[0], mockUsers[2], mockUsers[5]],
    comments: [],
    shares: 8,
  }
];

export const mockStories: Story[] = [
  { id: 'story-1', user: mockUsers[1], imageUrl: 'https://picsum.photos/seed/story-1/400/700', duration: 7000 },
  { id: 'story-2', user: mockUsers[2], imageUrl: 'https://picsum.photos/seed/story-2/400/700', duration: 7000 },
  { id: 'story-3', user: mockUsers[3], imageUrl: 'https://picsum.photos/seed/story-3/400/700', duration: 7000 },
  { id: 'story-4', user: mockUsers[4], imageUrl: 'https://picsum.photos/seed/story-4/400/700', duration: 7000 },
  { id: 'story-5', user: mockUsers[5], imageUrl: 'https://picsum.photos/seed/story-5/400/700', duration: 7000 },
];

export const mockPages: Page[] = [
    { id: 'page-1', name: 'Tasty Recipes', category: 'Food & Drink', coverPhoto: 'https://picsum.photos/seed/page-1/300/150', followersCount: 120435 },
    { id: 'page-2', name: 'Wanderlust Travel', category: 'Travel', coverPhoto: 'https://picsum.photos/seed/page-2/300/150', followersCount: 89754 },
    { id: 'page-3', name: 'Tech Innovations', category: 'Science & Tech', coverPhoto: 'https://picsum.photos/seed/page-3/300/150', followersCount: 250123 },
];

// Function to generate new mock posts for infinite scroll
export const generateMockPosts = async (count: number, users: User[]): Promise<Post[]> => {
    const newPosts: Post[] = [];
    const availableUsers = users.filter(u => u.id !== 'user-1');

    for (let i = 0; i < count; i++) {
        const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
        const content = await generatePostIdea();
        const hasImage = Math.random() > 0.3; // 70% chance of having an image

        newPosts.push({
            id: `post-gen-${Date.now()}-${i}`,
            author: randomUser,
            timestamp: new Date().toISOString(),
            content: content,
            image: hasImage ? `https://picsum.photos/seed/gen-${Date.now()}-${i}/800/600` : undefined,
            likes: [],
            comments: [],
            shares: Math.floor(Math.random() * 10),
        });
    }

    return newPosts;
};