import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
  } from 'recharts';

const App = () => {
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

    const booksPerYear = Object.entries(
        filteredData.reduce((acc, book) => {
        const year = book.first_publish_year || 'Unknown';
        acc[year] = (acc[year] || 0) + 1;
        return acc;
        }, {})
    ).map(([year, count]) => ({ year, count }));
  
    const booksByAuthor = Object.entries(
        filteredData.reduce((acc, book) => {
        const authors = book.author_name || ['Unknown'];
        authors.forEach(author => {
            acc[author] = (acc[author] || 0) + 1;
        });
        return acc;
        }, {})
    ).map(([author, count]) => ({ author, count }));
  
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

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ flex: 2 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
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
                                <td style={tdStyle}>
                                    <Link to={`/book/${book.key?.split('/').pop()}`}>{book.title}</Link>
                                </td>
                                <td style={tdStyle}>{book.author_name?.join(', ')}</td>
                                <td style={tdStyle}>{book.first_publish_year || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredData.length === 0 && (
                    <p style={{ marginLeft: '1rem', marginTop: '1rem', color: 'red' }}>
                        No books found for your search and filter.
                    </p>
                )}
            </div>

            <div style={{ flex: 1 }}>
                <h3>Books per Year</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={booksPerYear}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>

                <h3 style={{ marginTop: '2rem' }}>Books by Author</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={booksByAuthor.slice(0, 10)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="author" angle={-45} textAnchor="end" interval={0} height={100} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
        {filteredData.length === 0 && (
            <p style={{ marginLeft: '1rem', marginTop: '1rem', color: 'red' }}>
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

export default App;