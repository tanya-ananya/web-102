// pages/PostPage.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostForm from '../components/PostForm';
import PostDetails from '../components/PostDetails';
import './PostPage.css';

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(saved);
  }, []);

  useEffect(() => {
    if (id) {
        const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
        const foundPost = savedPosts.find((p) => p.id === id);
        if (foundPost) {
          setPost(foundPost);
        }
        console.log('Post ID:', id);
        console.log('Saved Posts:', savedPosts);
    }
  }, [id]);

  const handleUpdatePost = (updatedPost) => {
    setPost(updatedPost);
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = savedPosts.map((p) =>
      p.id === updatedPost.id ? updatedPost : p
    );
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
  };

  const handleDeletePost = (postId) => {
    const savedPosts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = savedPosts.filter((p) => p.id !== postId);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    navigate('/');
  };

  const handleCreatePost = (postData) => {
    const saved = JSON.parse(localStorage.getItem('posts')) || [];
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
    };
    const updatedPosts = [newPost, ...saved];
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    navigate(`/posts/${newPost.id}`);
  };

  if (id && !post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="post-page-container">
      {id ? (
        post ? (
          <PostDetails
            post={post}
            onUpdatePost={handleUpdatePost}
            onDeletePost={handleDeletePost}
          />
        ) : (
          <p>Post not found</p>
        )
      ) : (
        <PostForm onSubmit={handleCreatePost} submitLabel="Create Post" />
      )}
    </div>
  );
}

export default PostPage;