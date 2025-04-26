import { useState } from 'react';
import CommentSection from './CommentSection';
import './PostDetails.css'

function PostDetails({ post, onUpdatePost, onDeletePost }) {
  const [comments, setComments] = useState(post.comments || []);
  const [upvotes, setUpvotes] = useState(post.upvotes || 0);

  const handleUpvote = () => {
    const newUpvotes = upvotes + 1;
    setUpvotes(newUpvotes);
    onUpdatePost({ ...post, upvotes: newUpvotes });
  };

  const handleAddComment = (newComment) => {
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    onUpdatePost({ ...post, comments: updatedComments });
  };

  return (
    <div className="post-details">
      <h1 className="post-title">{post.title}</h1>
      <p className="post-date">Posted: {new Date(post.createdAt).toLocaleString()}</p>

      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="post-image" />
      )}

      {post.content && <p className="post-content">{post.content}</p>}

      <div className="post-actions">
        <button onClick={handleUpvote} className="btn btn-upvote">Upvote</button>
        <br />
        <span>Upvotes: {upvotes}</span>
      </div>

      <CommentSection comments={comments} onAddComment={handleAddComment} />

      <div className="post-footer">
        <button onClick={() => onDeletePost(post.id)} className="btn btn-delete">Delete Post</button>
      </div>
    </div>
  );
}

export default PostDetails;
