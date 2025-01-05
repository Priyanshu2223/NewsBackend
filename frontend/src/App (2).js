import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Login from './Login';
import Register from './Register';
import Content from './Content'; // Ensure Content component is imported

function App() {
  const [news, setNews] = useState([]);
  const [category, setCategory] = useState('general');
  const [state, setState] = useState('');
  const [user, setUser] = useState(null);
  const [authPage, setAuthPage] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState('en');  // Default to English
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch news whenever category, state, or language changes
  useEffect(() => {
    fetchNews(); 
  }, [category, state, selectedLanguage]);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:5000/news', {
        params: { category, state, lang: selectedLanguage },  // Pass selectedLanguage here
      });
      setNews(response.data.articles || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      alert('Please enter a search term');
      return;
    }
    try {
      const response = await axios.get('http://localhost:5000/news/search', {
        params: { query, lang: selectedLanguage },  // Pass selectedLanguage here
      });
      setNews(response.data.articles || []);
    } catch (error) {
      console.error('Error searching news:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      setUser(response.data);
      setAuthPage(null); // Clear auth page on successful login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/register', { name, email, password });
      setUser(response.data);
      setAuthPage(null); // Clear auth page on successful registration
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAuthPage(null);
  };

  const handleAuthPageChange = (page) => {
    setAuthPage(page);
  };

  const handleCategoryChange = (category) => {
    setCategory(category);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);  // Update selected language
  };

  return (
    <div className="App">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onAuthPageChange={handleAuthPageChange}
        authPage={authPage}
        onLanguageChange={handleLanguageChange}  // Pass language change handler
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
      />
      {authPage === 'login' && <Login onLogin={handleLogin} />}
      {authPage === 'register' && <Register onRegister={handleRegister} />}
      <Content news={news} />
    </div>
  );
}

export default App;
