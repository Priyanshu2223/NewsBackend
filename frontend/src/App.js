import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');

  useEffect(() => {
    axios.get(`http://localhost:5000/news?category=${category}`)
      .then(response => setNews(response.data))
      .catch(error => {
        console.error('Error fetching news:', error.response ? error.response.data : error.message);
      });
  }, [category]);

  return (
    <div>
      <h1>News App</h1>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="business">Business</option>
      </select>
      <div>
        {news.map((article, index) => (
          <div key={index}>
            <h2>{article.title}</h2>
            <img src={article.urlToImage} alt="news" width="200" />
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
