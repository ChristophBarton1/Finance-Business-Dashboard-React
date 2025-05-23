import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    theme: 'dark',
    language: 'english',
    timeZone: 'Europe/Berlin',
    dateFormat: 'DD/MM/YYYY',
    autoRefresh: true,
    refreshInterval: 5,
  });

  const [dataSettings, setDataSettings] = useState({
    dataSources: ['sales_db', 'crm', 'marketing'],
    cacheEnabled: true,
    cacheExpiry: 60,
    defaultDateRange: 'last30days',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    emailAddress: 'user@example.com',
    browserNotifications: true,
    notifyOnReportCompletion: true,
    notifyOnThresholds: true,
  });

  const [dashboardSettings, setDashboardSettings] = useState({
    defaultDashboard: 'executive',
    compactView: false,
    showTargets: true,
    enableAnimations: true,
  });

  const handleGeneralChange = (e) => {
    const { name, value, type, checked } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDataChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDataSettings({
      ...dataSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDashboardChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDashboardSettings({
      ...dashboardSettings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Configure your dashboard experience</p>
        </motion.div>
        
        <motion.div 
          className="mt-4 md:mt-0 flex space-x-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <button className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            Reset to Default
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-2 transition-colors duration-200">
            Save Changes
          </button>
        </motion.div>
      </div>

      {/* Settings content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="card h-full p-0 overflow-hidden">
            <ul className="divide-y divide-gray-700">
              <li>
                <a href="#general" className="block p-4 bg-gray-700 text-white hover:bg-gray-600 transition-colors duration-200">
                  General Settings
                </a>
              </li>
              <li>
                <a href="#data" className="block p-4 text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                  Data Sources & Cache
                </a>
              </li>
              <li>
                <a href="#notifications" className="block p-4 text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                  Notifications
                </a>
              </li>
              <li>
                <a href="#dashboard" className="block p-4 text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                  Dashboard Preferences
                </a>
              </li>
              <li>
                <a href="#account" className="block p-4 text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                  Account & Security
                </a>
              </li>
              <li>
                <a href="#api" className="block p-4 text-gray-300 hover:bg-gray-700 transition-colors duration-200">
                  API Access
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6"
          >
            <div className="space-y-6">
              {/* General Settings */}
              <div id="general">
                <h2 className="text-xl font-bold text-white mb-4">General Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="theme" className="block text-sm font-medium text-gray-400 mb-1">Theme</label>
                    <select
                      id="theme"
                      name="theme"
                      value={generalSettings.theme}
                      onChange={handleGeneralChange}
                      className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System Default</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-1">Language</label>
                    <select
                      id="language"
                      name="language"
                      value={generalSettings.language}
                      onChange={handleGeneralChange}
                      className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="english">English</option>
                      <option value="german">German</option>
                      <option value="french">French</option>
                      <option value="spanish">Spanish</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="timeZone" className="block text-sm font-medium text-gray-400 mb-1">Time Zone</label>
                    <select
                      id="timeZone"
                      name="timeZone"
                      value={generalSettings.timeZone}
                      onChange={handleGeneralChange}
                      className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Europe/Berlin">Europe/Berlin</option>
                      <option value="America/New_York">America/New York</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                      <option value="UTC">UTC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-400 mb-1">Date Format</label>
                    <select
                      id="dateFormat"
                      name="dateFormat"
                      value={generalSettings.dateFormat}
                      onChange={handleGeneralChange}
                      className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="autoRefresh"
                      name="autoRefresh"
                      type="checkbox"
                      checked={generalSettings.autoRefresh}
                      onChange={handleGeneralChange}
                      className="h-4 w-4 text-indigo-600 border-gray-600 rounded bg-gray-700 focus:ring-indigo-500"
                    />
                    <label htmlFor="autoRefresh" className="ml-2 text-sm text-gray-300">
                      Enable auto-refresh
                    </label>
                  </div>
                  
                  {generalSettings.autoRefresh && (
                    <div>
                      <label htmlFor="refreshInterval" className="block text-sm font-medium text-gray-400 mb-1">
                        Refresh Interval (minutes)
                      </label>
                      <input
                        type="number"
                        id="refreshInterval"
                        name="refreshInterval"
                        value={generalSettings.refreshInterval}
                        onChange={handleGeneralChange}
                        min="1"
                        max="60"
                        className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Data Settings */}
              <div id="data" className="pt-6 border-t border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Data Sources & Cache</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Active Data Sources</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input
                          id="sales_db"
                          type="checkbox"
                          checked={dataSettings.dataSources.includes('sales_db')}
                          className="h-4 w-4 text-indigo-600 border-gray-600 rounded bg-gray-700 focus:ring-indigo-500"
                        />
                        <label htmlFor="sales_db" className="ml-2 text-sm text-gray-300">
                          Sales Database
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="crm"
                          type="checkbox"
                          checked={dataSettings.dataSources.includes('crm')}
                          className="h-4 w-4 text-indigo-600 border-gray-600 rounded bg-gray-700 focus:ring-indigo-500"
                        />
                        <label htmlFor="crm" className="ml-2 text-sm text-gray-300">
                          CRM System
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="marketing"
                          type="checkbox"
                          checked={dataSettings.dataSources.includes('marketing')}
                          className="h-4 w-4 text-indigo-600 border-gray-600 rounded bg-gray-700 focus:ring-indigo-500"
                        />
                        <label htmlFor="marketing" className="ml-2 text-sm text-gray-300">
                          Marketing Analytics
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="cacheEnabled"
                      name="cacheEnabled"
                      type="checkbox"
                      checked={dataSettings.cacheEnabled}
                      onChange={handleDataChange}
                      className="h-4 w-4 text-indigo-600 border-gray-600 rounded bg-gray-700 focus:ring-indigo-500"
                    />
                    <label htmlFor="cacheEnabled" className="ml-2 text-sm text-gray-300">
                      Enable data cache
                    </label>
                  </div>
                  
                  {dataSettings.cacheEnabled && (
                    <div>
                      <label htmlFor="cacheExpiry" className="block text-sm font-medium text-gray-400 mb-1">
                        Cache Expiry (minutes)
                      </label>
                      <input
                        type="number"
                        id="cacheExpiry"
                        name="cacheExpiry"
                        value={dataSettings.cacheExpiry}
                        onChange={handleDataChange}
                        min="5"
                        max="1440"
                        className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="defaultDateRange" className="block text-sm font-medium text-gray-400 mb-1">Default Date Range</label>
                    <select
                      id="defaultDateRange"
                      name="defaultDateRange"
                      value={dataSettings.defaultDateRange}
                      onChange={handleDataChange}
                      className="bg-gray-700 border border-gray-600 text-gray-200 rounded-lg px-4 py-2 w-full focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="last7days">Last 7 Days</option>
                      <option value="last30days">Last 30 Days</option>
                      <option value="thisMonth">This Month</option>
                      <option value="lastMonth">Last Month</option>
                      <option value="thisYear">This Year</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
