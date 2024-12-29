const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = 5000;

// Define valid categories for GNews API
const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

app.get('/news', async (req, res) => {
  const { category, state } = req.query;

  // Ensure the category is valid, default to "general"
  const categoryToUse = validCategories.includes(category) ? category : 'general';

  try {
    console.log(`Fetching news for category: ${categoryToUse}, state: ${state || 'none'}`);

    // Use the state parameter as part of the query
    const query = state ? `${state} news` : ''; // Add "news" to the state for better results

    // Fetch news using GNews API
    const response = await axios.get('https://gnews.io/api/v4/top-headlines', {
      params: {
        token: process.env.GNEWS_API_KEY, // Your GNews API Key
        lang: 'en', // Default language
        topic: categoryToUse, // Use category as topic
        q: query, // Use query to filter by state
        country: 'in', // Restrict to India
        max: 10, // Limit the number of articles
      },
    });

    // Check for articles
    const articles = response.data.articles || [];
    if (articles.length === 0) {
      console.warn('No articles found for the category and state:', categoryToUse, state);
      res.status(200).json({ message: 'No articles found', articles: [] });
      return;
    }

    // Return articles with image URL (urlToImage)
    const formattedArticles = articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,  // Ensure this field is passed to the frontend
      content: article.content,
    }));

    res.json({ articles: formattedArticles });
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({
      error: 'Error fetching news',
      details: error.message,
      suggestion: 'Check your API key, category, or other parameters.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
