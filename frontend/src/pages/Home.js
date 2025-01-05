import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';

function Home({ category, language, searchQuery }) {
  const [liveNews, setLiveNews] = useState(null);
  const [sideNews, setSideNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news', {
          params: {
            category,
            lang: language,
            query: searchQuery
          }
        });
        const articles = Array.isArray(response.data) ? response.data : response.data.articles;
        if (articles && articles.length > 0) {
          setLiveNews(articles[0]);
          setSideNews(articles.slice(1, 5));
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };
    fetchNews();
  }, [category, language, searchQuery]);

  return (
    <div className="home-container">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="newsapp-title">Welcome to NewsKatta</h1>
        <p className="subtitle">Stay updated with the latest news</p>
      </div>

      {/* Main Content Section */}
      <div className="content-layout">
        {/* Main News */}
        <div className="main-news-section">
          {liveNews ? (
            <div className="main-news-card">
              {liveNews.urlToImage ? (
                <img src={liveNews.urlToImage} alt={liveNews.title} className="main-news-image" />
              ) : (
                <img src="/placeholder-image.png" alt="No Image Available" className="main-news-image" />
              )}
              <h2 className="main-news-title">{liveNews.title || "Untitled Article"}</h2>
              <p className="main-news-description">
                {liveNews.description || "No description available for this article."}
              </p>
              <a
                href={liveNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="read-more-btn"
              >
                Read More
              </a>
            </div>
          ) : (
            <p>Loading main news...</p>
          )}
        </div>

        {/* Side News */}
        <div className="side-news-section">
          <h3 className="side-news-header">Other News</h3>
          <div className="side-news-list">
            {sideNews.length > 0 ? (
              sideNews.map((article, index) => (
                <div className="side-news-card" key={index}>
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="side-news-image"
                    />
                  ) : (
                    <img
                      src="/placeholder-image.png"
                      alt="No Image Available"
                      className="side-news-image"
                    )}
                  <div className="side-news-text">
                    <h4 className="side-news-title">{article.title || "Untitled Article"}</h4>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="side-news-link"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p>Loading side news...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
