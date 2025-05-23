import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const [searchValue, setSearchValue] = useState('');
  const [notifications, setNotifications] = useState([
    { id: 1, content: 'New report generated', time: '5 min ago', read: false },
    { id: 2, content: 'Sales threshold reached', time: '2 hours ago', read: false },
    { id: 3, content: 'Weekly analytics updated', time: '1 day ago', read: true },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Left side */}
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search..."
            className="block w-80 pl-10 pr-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-gray-200 placeholder-gray-400 transition-all duration-200"
          />
          {searchValue && (
            <button
              onClick={() => setSearchValue('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 hover:text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Time */}
        <div className="text-gray-300 text-sm hidden md:block">
          <span>{new Date().toLocaleDateString()} </span>
          <span className="text-gray-400">
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-700 hidden md:block"></div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200 relative"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs font-semibold text-white"
              >
                {unreadCount}
              </motion.span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto rounded-lg bg-gray-800 border border-gray-700 shadow-lg z-50"
            >
              <div className="p-3 border-b border-gray-700 flex items-center justify-between">
                <h3 className="font-medium text-white">Notifications</h3>
                <button
                  onClick={() => {
                    setNotifications(notifications.map(n => ({ ...n, read: true })));
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300"
                >
                  Mark all as read
                </button>
              </div>
              <div className="divide-y divide-gray-700">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-400">No notifications</div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 hover:bg-gray-700 cursor-pointer transition-colors duration-150 ${
                        notification.read ? 'opacity-70' : ''
                      }`}
                      onClick={() => {
                        setNotifications(
                          notifications.map(n =>
                            n.id === notification.id ? { ...n, read: true } : n
                          )
                        );
                      }}
                    >
                      <div className="flex items-start">
                        {!notification.read && (
                          <div className="mr-2 mt-1.5 h-2 w-2 rounded-full bg-indigo-500"></div>
                        )}
                        <div className={!notification.read ? 'ml-0' : 'ml-4'}>
                          <p className="text-sm text-gray-200">{notification.content}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-gray-700">
                <button className="w-full py-2 text-sm text-center text-indigo-400 hover:text-indigo-300">
                  View all notifications
                </button>
              </div>
            </motion.div>
          )}
        </div>

        {/* Settings */}
        <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Profile */}
        <div className="hidden md:flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
