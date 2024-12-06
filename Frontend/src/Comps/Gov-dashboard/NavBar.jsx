import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { BellIcon, CheckCircleIcon, User } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Navbar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const userId = '674dd1c19a4dbfe260f137ed';

  // Fetch notifications on component mount
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`https://database-microservice-agrilink.onrender.com/notifications`);
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        const data = await response.json();
        // Filter notifications for the current user
        const userNotifications = data.filter(notification => notification.user === userId);
        console.log("Fetched Notifications:", userNotifications); // Add this line

        setNotifications(userNotifications);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAsRead = async (notificationId) => {
    try {
      // Make PUT request to update isRead attribute
      const response = await fetch(`https://database-microservice-agrilink.onrender.com/notifications/${notificationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isRead: true }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notification status');
      }

     
      // Remove the notification from the local state
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification._id !== notificationId)
      );
      
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white shadow-md">
      <div className="text-xl font-bold">Government Official Dashboard</div>
      <div className="relative">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleNotifications}
          className="relative"
        >
          <BellIcon className="w-6 h-6" />
          {notifications.some(n => !n.isRead) && (
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          )}
        </Button>

        {isNotificationOpen && (
          <div className="absolute top-full right-0 w-80 bg-white shadow-lg border rounded-md p-4 mt-2 z-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">Notifications</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleNotifications}
              >
                <CheckCircleIcon className="w-5 h-5" />
              </Button>
            </div>

            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <Card 
                  key={notification._id} 
                  className={`mb-2 p-3 border flex justify-between items-center ${
                    !notification.isRead ? 'bg-blue-50' : ''
                  }`}
                >
                  <div>
                    <p className="text-gray-700">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.date}</p>
                  </div>
                  {!notification.isRead && (
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => markAsRead(notification._id)}
                    >
                      <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    </Button>
                  )}
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No notifications</p>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
