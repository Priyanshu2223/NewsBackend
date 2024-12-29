import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';

function Content() {
  const [liveNews, setLiveNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [category, setCategory] = useState('latest');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews(category, state);
  }, [category, state]);

  const fetchNews = async (category, state) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/news', {
        params: { category, state },
      });
      console.log('Fetched news data:', response.data.articles); // Debugging: Log the data
      if (response.data.articles && response.data.articles.length > 0) {
        setLiveNews(response.data.articles);
      } else {
        setLiveNews([]);
        console.warn('No news data found');
      }
    } catch (error) {
      setError('Error fetching news. Please try again later.');
      console.error('Error fetching live news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBack = () => {
    setSelectedArticle(null);
  };

  return (
    <main className="content">
      <div className="category-select">
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="latest">Latest</option>
          <option value="technology">Technology</option>
          <option value="sports">Sports</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="state-select">
        <select onChange={(e) => setState(e.target.value)} value={state}>
          <option value="">Select State</option>
          {/* Add options for all Indian states */}
          <option value="Delhi">Delhi</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Karnataka">Karnataka</option>
          {/* Add remaining states */}
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p>Loading live news...</p>
      ) : selectedArticle ? (
        <section className="live-news">
          <button onClick={handleBack}>Back to News List</button>
          <h2>{selectedArticle.title}</h2>
          <img src={selectedArticle.urlToImage} alt={selectedArticle.title} className="news-image" />
          <p>{selectedArticle.content}</p>
          <p>{selectedArticle.description}</p>
          <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer" className="read-more">
            Read Full Article
          </a>
        </section>
      ) : (
        <section className="live-news">
          <h2>Live News</h2>
          {liveNews.map((article, index) => (
            <div key={index} className="news-item">
              <img
                src={article.urlToImage || 'https://via.placeholder.com/150'}
                alt={article.title}
                className="news-image"
              />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <button onClick={() => handleArticleClick(article)} className="read-more">
                Read More
              </button>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default Content;
