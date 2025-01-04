import React, { useState } from 'react';
import MessageInput from '../components/AIAssistantScreen/MessageInput';
import Chats from '../components/AIAssistantScreen/Chats';
import '../index.css';

const AIAssistantScreen = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! How can I assist you today?' },
    { sender: 'user', text: 'Hello! How can I assist you today? This is some text to lengthen the user message to test if the user UI is performing well' },
  ]); // Initial message from the AI

  const handleSendMessage = (message) => {
    // Add user message to the conversation
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: message }]);

    // Simulate an AI response (replace this logic with actual AI processing)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'ai', text: 'Thanks for your message! Let me assist you.' },
      ]);
    }, 1000);
  };

  return (
    <div className="main-content" style={{ textAlign: 'center', padding: '20px' }}>
      {/* Header and Description */}
      {messages.length <1 && (
        <div>
          <h1>AI Stock Manager</h1>
          <p>Let's do anything stock</p>
        </div>
      )}

      {/* Chats Component */}
      <div style={{ margin: '20px auto', width: '80%', maxHeight: '400px', overflowY: 'auto', alignSelf:'center' }}>
        <Chats messages={messages} />
      </div>

      {/* Message Input */}
      <div style={{ marginTop: '20px', position:'fixed', bottom: '50px', alignSelf: 'center', width: '75%' }}>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default AIAssistantScreen;
