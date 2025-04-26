// components/Navbar.jsx
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-title">BookBubble</h1>
      <input
        type="text"
        placeholder="Search"
        className="navbar-search"
      />
      <div className="navbar-links">
        <a href="/" className="navbar-link">Home</a>
        <a href="/PostPage" className="navbar-link">Create New Post</a>
      </div>
    </nav>
  );
}

export default Navbar;