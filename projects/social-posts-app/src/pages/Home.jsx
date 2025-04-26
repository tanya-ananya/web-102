import { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import './Home.css';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  return (
    <div className="home-container">
      <PostList posts={posts} />
    </div>
  );
}

export default Home;
