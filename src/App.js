import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import ThemeButton from './components/ThemeButton';
import './App.css';

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Prince Solutions Chatbot</h1>
        <ThemeButton isDarkTheme={isDarkTheme} toggleTheme={toggleTheme} />
      </header>
      <div className="chat-container">
        <button className="chat-button" onClick={toggleChat}>
          <i className="fa fa-comment"></i>
        </button>
        {isChatOpen && <ChatWindow closeChat={toggleChat} />}
      </div>
    </div>
  );
};

export default App;
