import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Navbar({ onLanguageChange }) {
  const [date, setDate] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  useEffect(() => {
    const day = new Date().toLocaleString('en-US', { weekday: 'long' });
    const currentDate = new Date().toLocaleDateString();
    setDate(`${day}, ${currentDate}`);
  }, []);

  const handleLanguageChange = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
    onLanguageChange(language);  // Pass the selected language to parent (App.js)
  };

  return (
    <div className="navbar">
      <div className="menu">
        <ul>
          <li>Home</li>
          <li>World</li>
          <li>Technology</li>
          <li>Sports</li>
          <li>Business</li>
        </ul>
      </div>
      <div className="app-name">NewsKatta</div>
      <div className="right-section">
        <div className="day-date">
          <p>{date}</p>
        </div>
        <div className="search">
          <input type="text" placeholder="Search news..." />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </div>
        <div className="language-selector">
          <select value={selectedLanguage} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="bn">Bengali</option>
            <option value="te">Telugu</option>
            <option value="mr">Marathi</option>
            <option value="ta">Tamil</option>
            <option value="ur">Urdu</option>
            <option value="gu">Gujarati</option>
            <option value="kn">Kannada</option>
            <option value="ml">Malayalam</option>
            <option value="pa">Punjabi</option>
            <option value="or">Odia</option>
            <option value="as">Assamese</option>
            <option value="ml">Maithili</option>
            <option value="sd">Sindhi</option>
            <option value="ne">Nepali</option>
            <option value="mr">Marwari</option>
            <option value="ks">Kashmiri</option>
            <option value="si">Sinhala</option>
            <option value="bh">Bhojpuri</option>
            <option value="san">Sanskrit</option>
            {/* Add more languages as needed */}
          </select>
        </div>
        <div className="login">
          <button>Login</button>
        </div>
        <div className="subscribe">
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
