import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [state, setState] = useState(''); // State for the selected state
  const [language, setLanguage] = useState('en');
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchNews(language, category, state);
  }, [language, category, state]);

  const fetchNews = async (language, category, state) => {
    try {
      const response = await axios.get(`http://localhost:5000/news`, {
        params: { language, category, state },
      });
      setNews(response.data.articles || []); // Ensure response has articles
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleLanguageChange = (language) => setLanguage(language);
  const handleStateChange = (state) => setState(state); // Update state when changed
  const handleArticleClick = (article) => setSelectedArticle(article);
  const handleBack = () => setSelectedArticle(null);

  return (
    <div>
      <Navbar onLanguageChange={handleLanguageChange} />
      <h1>News App</h1>
      {/* Dropdowns for category and state selection */}
      <select onChange={(e) => setCategory(e.target.value)} defaultValue={category}>
        <option value="general">General</option>
        <option value="technology">Technology</option>
        <option value="sports">Sports</option>
        <option value="business">Business</option>
      </select>
      <select onChange={(e) => handleStateChange(e.target.value)} defaultValue="">
        <option value="">Select State</option>
        <option value="california">California</option>
        <option value="texas">Texas</option>
        <option value="florida">Florida</option>
        {/* Add more states as needed */}
      </select>

      {selectedArticle ? (
        <div className="detailed-article">
          <button onClick={handleBack}>Back</button>
          <h2>{selectedArticle.title}</h2>
          <img src={selectedArticle.urlToImage} alt="news" width="400" />
          <p>{selectedArticle.content || 'No content available'}</p>
          <p>{selectedArticle.description}</p>
          <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">
            Read Full Article
          </a>
        </div>
      ) : (
        <div className="news-list">
          {news.map((article, index) => (
            <div key={index} className="news-item">
              <h2>{article.title}</h2>
              <img src={article.urlToImage} alt="news" width="200" />
              <p>{article.description}</p>
              <button onClick={() => handleArticleClick(article)}>Read More</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
