import { Link } from 'react-router-dom';
import './PostCard.css';

function PostCard({ post }) {
  const { id, title, createdAt, upvotes } = post;

  return (
    <Link to={`/posts/${id}`}>
      <div className="post-card">
        <h2 className="post-title">{title}</h2>
        <p className="post-date">Created: {new Date(createdAt).toLocaleString()}</p>
        <p className="post-upvotes">Upvotes: {upvotes}</p>
      </div>
    </Link>
  );
}

export default PostCard;
