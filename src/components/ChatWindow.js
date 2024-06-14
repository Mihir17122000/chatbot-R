import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import { FaInfoCircle, FaEllipsisV, FaTimes, FaPaperPlane } from 'react-icons/fa';
import intentsData from './intents.json'; // Import the intents.json file

const ChatWindow = ({ closeChat, isDarkTheme }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Fetch additional intents from JSON if needed
    // Example: fetch('/path/to/intents.json').then(res => res.json()).then(data => setIntents(data.intents));
  }, []);

  const handleSend = async () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, sender: 'user' };
      setMessages([...messages, userMessage]);
      setInputValue('');

      const botResponse = await generateBotResponse(inputValue);
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const generateBotResponse = async (userInput) => {
    let responseMessage = "Sorry, I didn't understand. Can you please clarify?";

    for (const intent of intentsData.intents) {
      for (const pattern of intent.patterns) {
        const regex = new RegExp(`\\b${pattern}\\b`, 'i');
        if (regex.test(userInput)) {
          if (intent.tag === "joke") {
            responseMessage = await fetchJoke();
          } else if (intent.tag === "random_user_data") {
            responseMessage = await fetchRandomUserData();
          } else if (intent.tag === "random_post") {
            responseMessage = await fetchRandomPost();
          } else if (intent.tag === "quote_of_the_day") {
            responseMessage = await fetchQuoteOfTheDay();
          } else if (intent.tag === "cat_fact") {
            responseMessage = await fetchCatFact();
          } else if (intent.tag === "dog_fact") {
            responseMessage = await fetchDogFact();
          } else {
            const responses = intent.responses;
            responseMessage = responses[Math.floor(Math.random() * responses.length)];
          }
          break;
        }
      }
      if (responseMessage !== "Sorry, I didn't understand. Can you please clarify?") {
        break;
      }
    }

    return { text: responseMessage, sender: 'bot' };
  };

  const fetchJoke = async () => {
    try {
      const response = await fetch("https://api.chucknorris.io/jokes/random");
      const data = await response.json();
      return data.value;
    } catch (error) {
      console.error("Error fetching joke:", error);
      return "Sorry, I couldn't fetch a joke at the moment. Please try again later.";
    }
  };

  const fetchRandomUserData = async () => {
    try {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
      const user = data.results[0];
      return `Name: ${user.name.first} ${user.name.last}, Email: ${user.email}, Gender: ${user.gender}`;
    } catch (error) {
      console.error("Error fetching random user data:", error);
      return "Sorry, I couldn't fetch random user data at the moment. Please try again later.";
    }
  };

  const fetchRandomPost = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      const post = data[randomIndex];
      return `Title: ${post.title}, Body: ${post.body}`;
    } catch (error) {
      console.error("Error fetching random post:", error);
      return "Sorry, I couldn't fetch random post at the moment. Please try again later.";
    }
  };

  const fetchQuoteOfTheDay = async () => {
    try {
      const response = await fetch("https://favqs.com/api/qotd");
      const data = await response.json();
      return data.quote.body;
    } catch (error) {
      console.error("Error fetching quote of the day:", error);
      return "Sorry, I couldn't fetch the quote of the day at the moment. Please try again later.";
    }
  };

  const fetchCatFact = async () => {
    try {
      const response = await fetch("https://meowfacts.herokuapp.com/");
      const data = await response.json();
      return data.data[0];
    } catch (error) {
      console.error("Error fetching cat fact:", error);
      return "Sorry, I couldn't fetch a cat fact at the moment. Please try again later.";
    }
  };

  const fetchDogFact = async () => {
    try {
      const response = await fetch("https://dog-api.kinduff.com/api/facts");
      const data = await response.json();
      return data.facts[0];
    } catch (error) {
      console.error("Error fetching dog fact:", error);
      return "Sorry, I couldn't fetch a dog fact at the moment. Please try again later.";
    }
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
