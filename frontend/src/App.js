import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Login from './components/Login';
import Register from './components/Register';
import axios from 'axios';

function App() {
  const [language, setLanguage] = useState('en');  // Default language set to English
  const [authPage, setAuthPage] = useState(null);
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState([]);

  // Language change handler
  const handleLanguageChange = (language) => {
    setLanguage(language);  // Update language state
  };

  // Authentication page handler (login/register)
  const handleAuthPageChange = (page) => {
    setAuthPage(authPage === page ? null : page);
  };

  // Login handler
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { email, password });
      setUser(response.data);
      setAuthPage(null);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Register handler
  const handleRegister = async (name, email, password) => {
    try {
      await axios.post('http://localhost:5000/auth/register', { name, email, password });
      setAuthPage('login');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Category change handler
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  // Search query handler
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setAuthPage(null);
    console.log('User logged out successfully');
  };

  // Fetch news when category, language, or search query changes
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/news', {
          params: { category, lang: language, q: searchQuery },  // Send language in API request
        });
        setNews(response.data.articles || []);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, [category, language, searchQuery]);  // Re-run when category, language, or searchQuery changes

  // Search handler (to be passed to Navbar)
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      {/* Passing corrected props and functions */}
      <Header />
      <Navbar
        onLanguageChange={handleLanguageChange}   // Language change handler passed here
        onAuthPageChange={handleAuthPageChange}
        user={user}
        onCategoryChange={handleCategoryChange}
        onSearch={handleSearch}  // Pass handleSearch instead of onSearchChange
        onLogout={handleLogout}  // Added missing prop here
      />
      
      {/* Conditional rendering for login and register forms */}
      {authPage === 'login' && <Login onLogin={handleLogin} />}
      {authPage === 'register' && <Register onRegister={handleRegister} />}

      {/* Passing data and states to the Content component */}
      <Content
        language={language}  // Pass the selected language to Content component
        category={category}
        searchQuery={searchQuery}
        news={news}  // Pass fetched news to Content component
      />
    </div>
  );
}

export default App;
