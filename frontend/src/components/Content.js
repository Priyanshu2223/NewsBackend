import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Content.css';

function Content({ language, category, searchQuery }) {
    const [liveNews, setLiveNews] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNews(category, state, searchQuery, language);
    }, [category, state, searchQuery, language]);

    const fetchNews = async (category, state, searchQuery, language) => {
        setLoading(true);
        setError(null);
        try {
            const params = { category, state, lang: language };
            let endpoint = 'http://localhost:5000/news';

            if (searchQuery) {
                endpoint = 'http://localhost:5000/news/search';
                params.query = searchQuery;
            }

            const response = await axios.get(endpoint, { params });
            if (response.data.articles.length > 0) {
                setLiveNews(response.data.articles);
            } else {
                setLiveNews([]);
                console.warn('No news data found');
            }
        } catch (error) {
            setError('Error fetching news. Please try again later.');
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
            <div className="state-select">
                <select onChange={(e) => setState(e.target.value)} value={state}>
                    <option value="">Select State</option>
                    {[ 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar',
                        'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh',
                        'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
                        'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
                        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
                        'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
                    ].map((stateName) => (
                        <option key={stateName} value={stateName}>
                            {stateName}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="error">{error}</p>}

            {loading ? (
                <p>Loading live news...</p>
            ) : selectedArticle ? (
                <section className="live-news">
                    <button onClick={handleBack}>Back to News List</button>
                    <h2>{selectedArticle.title}</h2>
                    <p>{selectedArticle.content}</p>
                    <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">Read Full Article</a>
                </section>
            ) : (
                <section className="live-news">
                    <h2>Live News</h2>
                    {liveNews.map((article, index) => (
                        <div key={index} className="news-item">
                            <h3>{article.title}</h3>
                            <p>{article.description}</p>
                            <button onClick={() => handleArticleClick(article)}>Read More</button>
                        </div>
                    ))}
                </section>
            )}
        </main>
    );
}

export default Content;
