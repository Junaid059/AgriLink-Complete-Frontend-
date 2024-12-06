import React, { useState, useEffect } from 'react';
import { Send, MoreVertical } from 'lucide-react';
import ChatScreen from './Chat';

const ChatList = ({ onSelectChat }) => {
  const [userId, setUserID] = useState('674dd1c19a4dbfe260f137ed');
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedChatId, setSelectedChatId] = useState(null);
  const API_BASE = 'https://database-microservice-agrilink.onrender.com';

  useEffect(() => {
    fetchUsers();
    fetchChats();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/users`);
      const data = await response.json();
      const usersMap = data.reduce((acc, user) => {
        acc[user._id] = user;
        return acc;
      }, {});
      setUsers(usersMap);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchChats = async () => {
    try {
      const response = await fetch(`${API_BASE}/chats`);
      const data = await response.json();
      const userChats = data.filter((chat) =>
        chat.participants.includes(userId)
      );
      // Sort chats by last message timestamp
      userChats.sort((a, b) => {
        const aTime = a.messages?.[a.messages.length - 1]?.createdAt || 0;
        const bTime = b.messages?.[b.messages.length - 1]?.createdAt || 0;
        return new Date(bTime) - new Date(aTime);
      });
      setChats(userChats);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
    onSelectChat(chatId);
  };

  const getChatName = (chat) => {
    const otherParticipants = chat.participants
      .filter((id) => id !== userId)
      .map((id) => users[id]?.username || 'Unknown User');
    return otherParticipants.join(', ');
  };

  const formatLastMessageTime = (timestamp) => {
    if (!timestamp) return '';

    const messageDate = new Date(timestamp);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);

    if (messageDate.toDateString() === now.toDateString()) {
      return messageDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    }

    if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    return messageDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  const getLastMessagePreview = (chat) => {
    const lastMessage = chat.messages?.[chat.messages.length - 1];
    if (!lastMessage) return 'No messages';

    const sender = lastMessage.sender === userId ? 'You' : '';
    return `${sender}: ${lastMessage.content}`;
  };

  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="border-r bg-background">
        <div className="p-4 border-b bg-card">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Chats</h2>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat._id}
              onClick={() => handleChatSelect(chat._id)}
              className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChatId === chat._id ? 'bg-gray-100' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="font-medium text-gray-900">
                  {getChatName(chat)}
                </div>
                <div className="text-xs text-gray-500">
                  {formatLastMessageTime(
                    chat.messages?.[chat.messages.length - 1]?.createdAt
                  )}
                </div>
              </div>
              <div className="text-sm text-gray-600 truncate">
                {getLastMessagePreview(chat)}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2">
        {selectedChatId ? (
          <ChatScreen chatId={selectedChatId} userId={userId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
