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

  // --------------------------
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('posts')) || [];
    setPosts(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('posts', JSON.stringify(posts));
  }, [posts]);

  // --------------------------

  useEffect(() => {
    if (id) { // Only try to fetch a post if an ID is present
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
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    navigate(`/posts/${newPost.id}`); // Navigate to the new post's detail page
  };

  if (id && !post) { // Render loading only when id exists and post is not found.
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
          <p>Post not found</p> //Or some error message.  Handled by the if (id && !post)
        )
      ) : (
        <PostForm onSubmit={handleCreatePost} submitLabel="Create Post" />
      )}
    </div>
  );
}

export default PostPage;