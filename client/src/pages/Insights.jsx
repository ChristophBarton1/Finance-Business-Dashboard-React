import React, { useState } from 'react';
import { motion } from 'framer-motion';
import InsightEngine from '../components/InsightEngine';

const Insights = () => {
  const [activeTab, setActiveTab] = useState('insights');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Business Insights</h1>
          <p className="text-gray-400">AI-powered analysis and recommendations</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last quarter</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh Insights
          </button>
        </div>
      </div>
      
      <div className="bg-gray-800/50 rounded-lg p-1 inline-flex">
        <button 
          onClick={() => setActiveTab('insights')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'insights' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
            AI Insights
          </div>
        </button>
        
        <button 
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'reports' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z" clipRule="evenodd" />
            </svg>
            Report Insights
          </div>
        </button>
        
        <button 
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'alerts' 
              ? 'bg-indigo-600 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Alerts
          </div>
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3">
          {activeTab === 'insights' && <InsightEngine />}
          
          {activeTab === 'reports' && (
            <div className="card p-6 space-y-6">
              <h2 className="text-xl font-bold text-white">Report Insights</h2>
              <p className="text-gray-400">Automatically generated insights from your reports and dashboards.</p>
              
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">Coming Soon</h3>
                <p className="text-gray-400">
                  This feature is currently in development. Check back soon for automated insights from your reports.
                </p>
              </div>
            </div>
          )}
          
          {activeTab === 'alerts' && (
            <div className="card p-6 space-y-6">
              <h2 className="text-xl font-bold text-white">Alerts & Notifications</h2>
              <p className="text-gray-400">Important alerts and notifications about your business metrics.</p>
              
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white mb-2">No Alerts</h3>
                <p className="text-gray-400">
                  You don't have any active alerts. Configure your alert thresholds in Settings.
                </p>
              </div>
            </div>
          )}
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card p-5">
            <h3 className="text-lg font-medium text-white mb-4">Insight Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>AI Analysis Frequency</span>
                </label>
                <select className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div className="pt-2">
                <label className="flex items-center mb-3">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
                  <span className="ml-2 text-sm text-gray-300">Enable AI insights</span>
                </label>
                
                <label className="flex items-center mb-3">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
                  <span className="ml-2 text-sm text-gray-300">Anomaly detection</span>
                </label>
                
                <label className="flex items-center mb-3">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
                  <span className="ml-2 text-sm text-gray-300">Trend identification</span>
                </label>
                
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
                  <span className="ml-2 text-sm text-gray-300">Opportunity suggestions</span>
                </label>
              </div>
            </div>
          </div>
          
          <div className="card p-5">
            <h3 className="text-lg font-medium text-white mb-4">Insight Categories</h3>
            
            <div className="space-y-3">
              <label className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Sales</span>
                </span>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
              </label>
              
              <label className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Revenue</span>
                </span>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
              </label>
              
              <label className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Customers</span>
                </span>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
              </label>
              
              <label className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-amber-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Operations</span>
                </span>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
              </label>
              
              <label className="flex items-center justify-between text-sm">
                <span className="flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  <span className="text-gray-300">Risks</span>
                </span>
                <input type="checkbox" className="form-checkbox h-4 w-4 text-indigo-600 border-gray-700 rounded bg-gray-800 focus:ring-indigo-500" checked />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
