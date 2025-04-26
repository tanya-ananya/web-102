import { useState } from 'react';
import PostCard from './PostCard';
import './PostList.css';

function PostList({ posts }) {
  const [sortBy, setSortBy] = useState('createdAt');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = posts
    .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="post-list">
      <div className="post-list-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="post-search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="post-sort-select"
        >
          <option value="createdAt">Sort by Time</option>
          <option value="upvotes">Sort by Upvotes</option>
        </select>
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <p className="no-posts">No posts found.</p>
      )}
    </div>
  );
}

export default PostList;
