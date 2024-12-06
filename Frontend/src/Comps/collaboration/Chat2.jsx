import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatScreen2 = () => {
  const [chatId, setChatID] = useState('6751c90c7f4de71db8412d74');
  const [userId, setUserID] = useState('6751be027f4de71db840ea69');
  console.log('chatId: ', chatId);
  console.log('userId: ', userId);
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const API_BASE = 'https://database-microservice-agrilink.onrender.com/chats';

  useEffect(() => {
    if (chatId) fetchChat();
  }, [chatId]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChat();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchChat = async () => {
    try {
      const response = await fetch(`${API_BASE}/${chatId}`);
      const data = await response.json();
      setChat(data);
    } catch (error) {
      console.error('Error fetching chat:', error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await fetch(`${API_BASE}/${chatId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: userId,
          content: newMessage,
        }),
      });
      setNewMessage('');
      fetchChat();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-gray-100">
      <div className="p-4 border-b bg-card">
        <h1 className="text-xl font-semibold text-card-foreground">Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat?.messages?.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.sender === userId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === userId
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-card text-card-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSend} className="border-t p-4 bg-background">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatScreen2;
