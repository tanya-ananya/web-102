import { useState } from 'react';
import './CommentSection.css'

function CommentSection({ comments = [], onAddComment }) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment.trim());
    setNewComment('');
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          placeholder="Add a comment..."
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>

      <ul>
        {comments.map((comment, index) => (
          <li key={index}>
            {comment}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentSection;