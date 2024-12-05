import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';

const ChatScreen = ({ chatId, userId }) => {
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState({});
  const API_BASE = 'https://database-microservice-agrilink.onrender.com';

  useEffect(() => {
    fetchUsers();
    if (chatId) fetchChat();
  }, [chatId]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChat();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/users`);
      const data = await response.json();
      // Convert array to object with userId as key for easier lookup
      const usersMap = data.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setUsers(usersMap);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchChat = async () => {
    try {
      const response = await fetch(`${API_BASE}/chats/${chatId}`);
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
      await fetch(`${API_BASE}/chats/${chatId}/messages`, {
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

  const formatMessageDate = (dateString) => {
    const messageDate = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    const timeString = messageDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    if (messageDate.toDateString() === now.toDateString()) {
      return timeString;
    }

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return `Yesterday ${timeString}`;
    }

    return `${messageDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })} ${timeString}`;
  };

  const getUserName = (senderId) => {
    return users[senderId]?.username || 'Unknown User';
  };

  return (
    <div className="flex flex-col h-screen max-w-5xl mx-auto bg-gray-50 rounded-lg">
      <div className="p-4 border-b bg-card">
        <h1 className="text-xl font-semibold text-card-foreground">
          {chat?.participants
            ?.map((id) => getUserName(id))
            .filter((name) => name !== getUserName(userId))
            .join(', ')}
        </h1>
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
                  : 'bg-gray-700 text-white rounded-bl-none'
              }`}
            >
              {message.sender !== userId && (
                <p className="text-xs font-medium text-gray-300 mb-1">
                  {getUserName(message.sender)}
                </p>
              )}
              <p className="text-md">{message.content}</p>
              <p className="text-xs text-gray-300 mt-1">
                {formatMessageDate(message.createdAt)}
              </p>
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

export default ChatScreen;
