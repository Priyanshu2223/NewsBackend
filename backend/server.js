const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON request body

connectDB(); // Connect to MongoDB

const PORT = process.env.PORT || 5000;

// Define valid categories for GNews API
const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

app.get('/news', async (req, res) => {
    const { category, state, lang } = req.query;
    const categoryToUse = validCategories.includes(category) ? category : 'general';
    const language = lang || 'en'; // Default to 'en' if no language is provided

    try {
        console.log(`Fetching news for category: ${categoryToUse}, state: ${state || 'none'}, language: ${language}`);

        const query = state ? `${state} news` : '';

        const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
            params: {
                token: process.env.GNEWS_API_KEY,
                lang: language,
                topic: categoryToUse,
                q: query,
                country: 'in',
                max: 10,
            },
        });

        const articles = response.data.articles || [];
        const formattedArticles = articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage || 'https://via.placeholder.com/150',
            content: article.content,
        }));

        res.json({ articles: formattedArticles });
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Error fetching news', details: error.message });
    }
});

app.get('/news/search', async (req, res) => {
    const { query, lang } = req.query;
    const language = lang || 'en'; // Default to 'en' if no language is provided

    try {
        console.log(`Searching for news with query: ${query}, language: ${language}`);

        const response = await axios.get('https://gnews.io/api/v4/search', {
            params: {
                token: process.env.GNEWS_API_KEY,
                lang: language,
                q: query,
                max: 10,
            },
        });

        const articles = response.data.articles || [];
        const formattedArticles = articles.map(article => ({
            title: article.title,
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage || 'https://via.placeholder.com/150',
            content: article.content,
        }));

        res.json({ articles: formattedArticles });
    } catch (error) {
        console.error('Error searching for news:', error.message);
        res.status(500).json({ error: 'Error searching for news', details: error.message });
    }
});

app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
