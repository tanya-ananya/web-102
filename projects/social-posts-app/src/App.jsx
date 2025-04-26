// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PostPage from './pages/PostPage.jsx';
import Navbar from './components/Navbar.jsx';
import './App.css';

function App() {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('posts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  const handleCreatePost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home posts={posts} onCreatePost={handleCreatePost} />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/PostPage" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
    );
  }
  
  export default App;