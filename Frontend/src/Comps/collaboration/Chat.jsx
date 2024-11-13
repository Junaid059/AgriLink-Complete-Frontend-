// src/components/ChatPopup.jsx
import React, { useState } from 'react';

function Chat() {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);

  return (
    <div>
      {/* Button to open chat form */}
      <button
        onClick={openForm}
        className="fixed bottom-6 right-6 bg-green-600 text-white font-semibold py-3 px-5 rounded-full shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition-opacity"
      >
        💬 Open Chat
      </button>

      {/* Chat popup box */}
      {isOpen && (
        <div className="fixed bottom-0 right-4 w-80 border border-gray-200 rounded-lg shadow-lg bg-white z-50">
          <form className="p-4 flex flex-col">
            {/* Header with title and close button */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-lg font-semibold text-green-600">Chat</h1>
              <button
                type="button"
                onClick={closeForm}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✖️
              </button>
            </div>

            {/* Message label and textarea */}
            <label htmlFor="msg" className="text-gray-600 font-medium">
              Message
            </label>
            <textarea
              id="msg"
              name="msg"
              placeholder="Type message..."
              required
              className="w-full mt-1 mb-4 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-green-500 focus:outline-none"
              rows="5"
            ></textarea>

            {/* Send button */}
            <button
              type="submit"
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-700 transition-opacity w-full focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Send
            </button>

            {/* Cancel button */}
            <button
              type="button"
              onClick={closeForm}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-opacity w-full mt-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;
