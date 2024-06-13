import React, { useState } from 'react';

const ChatbotButton = ({ onMessageSubmit }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      onMessageSubmit(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chatbot-form">
      <input
        type="text"
        value={message}
        onChange={handleChange}
        placeholder="Type your message..."
        className="chatbot-input"
      />
      <button type="submit" className="chatbot-send-button">
        Send
      </button>
    </form>
  );
}

export default ChatbotButton;
