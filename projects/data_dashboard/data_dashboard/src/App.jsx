import React, { useState, useEffect } from 'react';

const BookDashboard = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(debouncedQuery)}`);
        const json = await res.json();
        setData(json.docs.slice(0, 50));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (debouncedQuery.trim()) {
      fetchData();
    }
  }, [debouncedQuery]);

  const uniqueSubjects = [...new Set(data.flatMap(book => book.subject || []))];

  const filteredData = data.filter(book => {
    if (!categoryFilter) return true;
    return book.subject?.includes(categoryFilter);
  });

  const totalBooks = filteredData.length;
  const avgYear = Math.round(
    filteredData.reduce((sum, book) => sum + (book.first_publish_year || 0), 0) /
      (filteredData.length || 1)
  );
  const uniqueSubjectsCount = [...new Set(data.flatMap(book => book.subject || []))].length;

  return (
    <div>
      <h1>📚 OpenLibrary Book Dashboard 📚</h1>

      <div className='main_parts'>
        <input
          type="text"
          className='search_box'
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem', marginTop: '1rem' }}
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ padding: '0.5rem' }}
        >
          <option value="">All Subjects</option>
          {uniqueSubjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <div className='stats' style={{ marginTop: '1rem' }}>
          <p><strong>Total Books:</strong> {totalBooks}</p>
          <p><strong>Average Publish Year:</strong> {isNaN(avgYear) ? 'N/A' : avgYear}</p>
          <p><strong>Unique Subjects:</strong> {uniqueSubjectsCount}</p>
        </div>
      </div>

      <table style={{ width: '100%', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Author(s)</th>
            <th style={thStyle}>First Published</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((book, index) => (
            <tr key={index}>
              <td style={tdStyle}>{book.title}</td>
              <td style={tdStyle}>{book.author_name?.join(', ')}</td>
              <td style={tdStyle}>{book.first_publish_year || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredData.length === 0 && (
        <p style={{ marginLeft: '1rem' ,marginTop: '1rem', color: 'red' }}>
          No books found for your search and filter.
        </p>
      )}
    </div>
  );
};

const thStyle = {
  textAlign: 'left',
  borderBottom: '3px solid rgb(180, 180, 180)',
  padding: '0.2rem'
};

const tdStyle = {
  borderBottom: '1px dashed rgb(138, 136, 136)',
  padding: '0.5rem'
};

export default BookDashboard;