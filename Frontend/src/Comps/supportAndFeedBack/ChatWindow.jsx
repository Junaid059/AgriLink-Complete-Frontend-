import React, { useState } from 'react';
import { X } from 'lucide-react';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', isUser: false },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput('');
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: 'Thank you for your message. Our support team will get back to you soon.',
            isUser: false,
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 h-96 bg-white rounded-lg shadow-xl flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Support Chat</h3>
        <button
          className="p-2 rounded-full hover:bg-green-700 focus:outline-none"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.isUser
                  ? 'bg-green-100 text-green-900'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      {/* Input Section */}
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
