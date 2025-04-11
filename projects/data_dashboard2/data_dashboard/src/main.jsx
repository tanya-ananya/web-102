import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css'
import App from './App.jsx'
import BookDetail from './BookDetail';
import Layout from './Layout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="book/:id" element={<BookDetail />} />
        </Route>
      </Routes>
    </Router>
  </StrictMode>
);