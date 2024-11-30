import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

// Renamed to EventPost to match usage and separated into its own component
const EventPost = ({ post, onLike, onSave }) => {
  const [comment, setComment] = useState('');

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComment('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img 
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-medium">{post.user.username}</span>
        </div>
        <button className="text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Image */}
      <div className="aspect-square w-full bg-gray-100">
        <img 
          src={post.event.image}
          alt="Event"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Action Buttons */}
      <div className="p-3">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button onClick={() => onLike(post.id)}>
              <Heart className={`w-6 h-6 ${post.liked ? 'fill-red-500 text-red-500' : 'text-gray-700'}`} />
            </button>
            <button>
              <MessageCircle className="w-6 h-6 text-gray-700" />
            </button>
            <button>
              <Share2 className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <button onClick={() => onSave(post.id)}>
            <Bookmark className={`w-6 h-6 ${post.saved ? 'fill-current text-gray-700' : 'text-gray-700'}`} />
          </button>
        </div>

        {/* Likes */}
        <div className="font-medium mb-2">{post.event.likes} likes</div>

        {/* Caption */}
        <div className="mb-2">
          <span className="font-medium mr-2">{post.user.username}</span>
          <span className="text-gray-800">{post.event.caption}</span>
        </div>

        {/* Comments */}
        <div className="text-gray-500 text-sm mb-2">
          View all comments
        </div>
        {post.event.comments.map((comment, index) => (
          <div key={index} className="mb-1">
            <span className="font-medium mr-2">{comment.username}</span>
            <span>{comment.text}</span>
          </div>
        ))}
        <div className="text-gray-400 text-xs uppercase mt-1">
          {post.event.timestamp}
        </div>

        {/* Comment Input */}
        <form onSubmit={handleComment} className="mt-3 border-t pt-3">
          <input
            type="text"
            placeholder="Add a comment..."
            className="w-full text-sm outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

// Main Posts component (renamed from EventFeed to match the export)
const Posts = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        username: 'techie_sarah',
        avatar: '/api/placeholder/40/40'
      },
      event: {
        image: '/api/placeholder/400/400',
        likes: 52,
        caption: 'Just wrapped up an amazing weekend at #AIHackathon2024! Built a cool project with @dev_team. Proud to win the Best Innovation award! 🏆 #TechEvents #Hackathon #Innovation',
        timestamp: '2 HOURS AGO',
        comments: [
          {
            username: 'dev_jake',
            text: 'Congrats on the win! Your project was incredible!'
          }
        ]
      },
      liked: false,
      saved: false
    },
    // ... rest of your posts data remains the same
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          event: {
            ...post.event,
            likes: post.liked ? post.event.likes - 1 : post.event.likes + 1
          }
        };
      }
      return post;
    }));
  };

  const handleSave = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          saved: !post.saved
        };
      }
      return post;
    }));
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-primary-700 mb-3">Event Highlights</h1>
        <p className="text-gray-600 mb-4">
          Discover the latest tech events and hackathons shared by our community
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">#Hackathons</span>
          <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">#TechTalks</span>
          <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">#Workshops</span>
          <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">#Innovation</span>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-primary-200 to-transparent mb-8"></div>
      </div>

      {/* Event Posts */}
      {posts.map(post => (
        <EventPost
          key={post.id}
          post={post}
          onLike={handleLike}
          onSave={handleSave}
        />
      ))}
    </div>
  );
};

export default Posts;