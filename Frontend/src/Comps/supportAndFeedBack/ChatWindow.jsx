import { X } from 'lucide-react';
import { useState } from 'react';

const ChatWindow = ({ onClose }) => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, isUser: true };
      setMessages([...messages, userMessage]);
      setInput('');

      try {
        setIsLoading(true);
        // Make API call

        const response = await fetch('http://localhost:3000/chatbot/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: input }),
        });

        if (response.ok) {
          const data = await response.json();
          const botMessage = {
            text: data.response || 'Sorry, something went wrong.',
            isUser: false,
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              text: 'Failed to fetch response from the server.',
              isUser: false,
            },
          ]);
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          { text: 'Error communicating with the server.', isUser: false },
        ]);
      } finally {
        setIsLoading(false);
      }
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
        {isLoading && (
          <div className="text-left mb-2">
            <span className="inline-block p-2 rounded-lg bg-gray-100 text-gray-900">
              Typing...
            </span>
          </div>
        )}
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
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
