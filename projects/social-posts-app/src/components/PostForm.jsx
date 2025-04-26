import { useState } from 'react';
import './PostForm.css';

function PostForm({ onSubmit, initialData = {}, submitLabel = 'Create Post' }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    const postData = {
      title: title.trim(),
      content: content.trim(),
      imageUrl: imageUrl.trim(),
    };
    onSubmit(postData);
    setTitle('');
    setContent('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <h2 className="form-heading">{submitLabel}</h2>

      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          type="text"
          className="form-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Content</label>
        <textarea
          className="form-input"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className="form-input"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-submit">
        {submitLabel}
      </button>
    </form>
  );
}

export default PostForm;
