import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { BellIcon, CheckCircleIcon } from '@heroicons/react/20/solid';

const Notifications = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          'https://database-microservice-agrilink.onrender.com/notifications'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        const unreadNotifications = data.filter(
          (notification) =>
            !notification.isRead &&
            notification.user == '67520df8e097dedca2d7fa51'
        );
        setNotifications(unreadNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async (notification) => {
    try {
      const response = await fetch(
        `https://database-microservice-agrilink.onrender.com/notifications/${notification._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: notification.user,
            type: notification.type,
            message: notification.message,
            isRead: true,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update notification');
      }

      // Remove the notification from the state immediately
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notif) => notif._id !== notification._id)
      );
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-80 bg-white shadow-lg p-4 z-50">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">Notifications</h3>
        <Button onClick={onClose} className="bg-transparent hover:bg-gray-300">
          <BellIcon className="w-5 h-5 text-gray-600" />
        </Button>
      </div>
      <div className="mt-4">
        {isLoading ? (
          <p>Loading notifications...</p>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card
              key={notification._id}
              className="mb-2 p-3 border flex justify-between items-center"
            >
              <div>
                <p className="text-gray-700">{notification.message}</p>
                <p className="text-xs text-gray-500">{notification.date}</p>
              </div>
              {!notification.isRead && (
                <CheckCircleIcon
                  className="w-6 h-6 text-green-500 cursor-pointer"
                  onClick={() => markAsRead(notification)}
                />
              )}
            </Card>
          ))
        ) : (
          <p>No notifications</p>
        )}
      </div>
    </div>
  );
};

export default Notifications;
