import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';


function Home() {
  const [liveNews, setLiveNews] = useState(null);
  const [sideNews, setSideNews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/news?category=general')
      .then((response) => {
        const articles = Array.isArray(response.data) ? response.data : response.data.data;
        if (articles && articles.length > 0) {
          setLiveNews(articles[0]); // Main news
          setSideNews(articles.slice(1, 5)); // Side news
        }
      })
      .catch((error) => console.error('Error fetching news:', error));
  }, []);

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
              {liveNews.urlToImage && (
                <img src={liveNews.urlToImage} alt={liveNews.title} className="main-news-image" />
              )}
              <h2 className="main-news-title">{liveNews.title}</h2>
              <p className="main-news-description">{liveNews.description}</p>
              <a href={liveNews.url} target="_blank" rel="noopener noreferrer" className="read-more-btn">
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
                  {article.urlToImage && (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="side-news-image"
                    />
                  )}
                  <h4 className="side-news-title">{article.title}</h4>
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="side-news-link">
                    Read More
                  </a>
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
