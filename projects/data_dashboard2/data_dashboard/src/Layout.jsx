// Layout.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{
        width: '150px',
        padding: '1rem',
        backgroundColor: '#f4f4f4',
        minHeight: '100vh'
      }}>
        <h2 style={{textAlign: 'center'}}>↪︎Links↩︎</h2>
        <nav style={{fontSize: '1.25em'}}>
            <Link to="/">Dashboard</Link>
            <p></p>
            <a href="https://openlibrary.org/">OpenLibrary Website</a>
            <p></p>
            <a href="https://openlibrary.org/advancedsearch">Advanced Search</a>
        </nav>
      </div>

      <div style={{ flexGrow: 1, padding: '1rem' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;