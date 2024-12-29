import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function NewsDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state;

  if (!article) {
    return <p>No article selected</p>;
  }

  return (
    <div>
      <button onClick={() => navigate('/')}>Back</button>
      <h1>{article.title}</h1>
      <img src={article.urlToImage} alt="news" width="400" />
      <p>{article.description}</p>
      <p>{article.content || "No content available"}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Source: {article.source.name}
      </a>
    </div>
  );
}

export default NewsDetail;
