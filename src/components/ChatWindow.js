import React, { useState } from 'react';
import './ChatWindow.css';
import { FaInfoCircle, FaEllipsisV, FaTimes, FaPaperPlane } from 'react-icons/fa';

// Import intents from a local JSON file (replace with actual fetch logic in a real application)
import intents from './intents.json';

const ChatWindow = ({ closeChat, isDarkTheme }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputValue('');

      // Simulate bot response based on user input
      setTimeout(() => {
        const botResponse = generateBotResponse(inputValue);
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 500); // Simulating bot response delay
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const generateBotResponse = (userInput) => {
    // Simulate fetching response from intents (replace with actual backend integration)
    const matchedIntent = findMatchingIntent(userInput);
    if (matchedIntent) {
      const response = getRandomResponse(matchedIntent.responses);
      return { text: response, sender: 'bot' };
    } else {
      return { text: "I didn't understand that.", sender: 'bot' };
    }
  };

  const findMatchingIntent = (userInput) => {
    // Simulate matching user input to intents (replace with actual matching logic)
    const lowerInput = userInput.toLowerCase();
    return intents.find(intent => intent.patterns.some(pattern => lowerInput.includes(pattern.toLowerCase())));
  };

  const getRandomResponse = (responses) => {
    // Get a random response from the matched intent
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className={`chat-window ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="chat-header">
        <h2>Chatbot</h2>
        <div className="chat-header-buttons">
          <FaInfoCircle className="header-icon" />
          <FaEllipsisV className="header-icon" />
        </div>
        <FaTimes className="close-icon" onClick={closeChat} />
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
