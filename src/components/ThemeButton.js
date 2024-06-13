import React from 'react';
import './ThemeButton.css';

const ThemeButton = ({ isDarkTheme, toggleTheme }) => {
  return (
    <button className="theme-button" onClick={toggleTheme}>
      {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeButton;
