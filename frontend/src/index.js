import React from 'react';
import ReactDOM from 'react-dom/client';  // Make sure you're using 'react-dom/client' for React 18+
import './index.css';
import App from './App';  // Ensure 'App' is correctly imported from 'App.js'
import './styles/custom.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
