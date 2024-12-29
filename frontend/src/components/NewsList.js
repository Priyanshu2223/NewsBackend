import React from 'react';
import { Link } from 'react-router-dom';

function NewsList({ news }) {
  return (
    <div>
      {news.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <img src={article.urlToImage} alt="news" width="200" />
          <p>{article.description}</p>
          <Link to={`/news/${index}`} state={article}>
            Read more
          </Link>
        </div>
      ))}
    </div>
  );
}

export default NewsList;
