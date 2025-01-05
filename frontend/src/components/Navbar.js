import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Navbar({ user, onLogout, onAuthPageChange, authPage, onLanguageChange, onSearch, onCategoryChange }) {
  const [date, setDate] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const day = new Date().toLocaleString('en-US', { weekday: 'long' });
    const currentDate = new Date().toLocaleDateString();
    setDate(`${day}, ${currentDate}`);
  }, []);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    onLanguageChange(language); 
  };

  const handleLoginClick = () => {
    onAuthPageChange('login'); 
  };

  const handleRegisterClick = () => {
    onAuthPageChange('register'); 
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); 
    } else {
      alert('Please enter a search term');
    }
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category); 
  };

  return (
    <div className="navbar">
      <div className="menu">
        <ul>
          <li onClick={() => handleCategoryClick('general')}>Home</li>
          <li onClick={() => handleCategoryClick('world')}>World</li>
          <li onClick={() => handleCategoryClick('technology')}>Technology</li>
          <li onClick={() => handleCategoryClick('sports')}>Sports</li>
          <li onClick={() => handleCategoryClick('business')}>Business</li>
        </ul>
      </div>
      <div className="app-name">NewsKatta</div>
      <div className="right-section">
        <div className="day-date">
          <p>{date}</p>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="search-icon"
            onClick={handleSearchSubmit} 
          />
        </div>
        <div className="language-selector">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="bn">Bengali</option>
            <option value="ml">Malayalam</option>
            <option value="mr">Marathi</option>
            <option value="gu">Gujarati</option>
            <option value="pa">Punjabi</option>
            <option value="ta">Tamil</option>
            <option value="kn">Kannada</option>
            <option value="or">Odia</option>
            <option value="ur">Urdu</option>
            <option value="as">Assamese</option>
            {/* You can add more languages as needed */}
          </select>
        </div>
        <div className="auth-buttons">
          {!user ? (
            <>
              <button onClick={handleLoginClick}>Login</button>
              <button onClick={handleRegisterClick}>Register</button>
            </>
          ) : (
            <div className="user-info">
              <p>{user.name}</p>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
