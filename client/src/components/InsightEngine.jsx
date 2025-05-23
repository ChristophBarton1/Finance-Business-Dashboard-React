import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Sample insights data - in a real application, this would come from an AI/ML backend
const sampleInsights = [
  {
    id: 1,
    type: 'anomaly',
    title: 'Sales Anomaly Detected',
    description: 'Unusual spike in Product C sales on May 20th, exceeding forecast by 43%.',
    impact: 'high',
    recommendation: 'Investigate marketing campaigns that ran during this period.',
    category: 'sales',
    date: '2025-05-22'
  },
  {
    id: 2,
    type: 'trend',
    title: 'Emerging Customer Segment',
    description: 'Growth of 27% in the SMB sector over the last quarter.',
    impact: 'medium',
    recommendation: 'Consider targeted promotions for small-medium businesses.',
    category: 'customers',
    date: '2025-05-21'
  },
  {
    id: 3,
    type: 'forecast',
    title: 'Revenue Forecast Update',
    description: 'Q3 projections indicate 12% growth, exceeding initial estimates of 8%.',
    impact: 'high',
    recommendation: 'Adjust inventory and staffing plans for increased demand.',
    category: 'revenue',
    date: '2025-05-20'
  },
  {
    id: 4,
    type: 'risk',
    title: 'Supply Chain Risk',
    description: 'Supplier delays may impact Product A availability in Q3.',
    impact: 'high',
    recommendation: 'Identify alternative suppliers and adjust marketing focus.',
    category: 'operations',
    date: '2025-05-19'
  },
  {
    id: 5,
    type: 'opportunity',
    title: 'Cross-Sell Opportunity',
    description: 'Customers purchasing Product A have 68% likelihood to purchase Product D within 30 days.',
    impact: 'medium',
    recommendation: 'Create targeted bundle offers for these products.',
    category: 'sales',
    date: '2025-05-18'
  }
];

const InsightEngine = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setInsights(sampleInsights);
      setLoading(false);
    }, 1200);
  }, []);

  const filteredInsights = activeFilter === 'all' 
    ? insights 
    : insights.filter(insight => insight.category === activeFilter || insight.type === activeFilter);

  const getInsightIcon = (type) => {
    switch(type) {
      case 'anomaly':
        return (
          <div className="rounded-full p-2 bg-red-500/20 text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'trend':
        return (
          <div className="rounded-full p-2 bg-blue-500/20 text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'forecast':
        return (
          <div className="rounded-full p-2 bg-purple-500/20 text-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 14.5v-2.5h-2v2.5a6.5 6.5 0 01-5-3.5h2.5v-2H3.94A6.538 6.538 0 013.5 10h2.5V8H3.5a6.5 6.5 0 015-3.5V7h2V4.5a6.5 6.5 0 015 3.5h-2.5v2h2.5a6.538 6.538 0 01-.44 2.5H12.5v2h2.5a6.5 6.5 0 01-5 3.5z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'risk':
        return (
          <div className="rounded-full p-2 bg-amber-500/20 text-amber-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'opportunity':
        return (
          <div className="rounded-full p-2 bg-green-500/20 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="rounded-full p-2 bg-gray-500/20 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const getImpactBadge = (impact) => {
    switch(impact) {
      case 'high':
        return <span className="px-2 py-1 rounded-full text-xs bg-red-500/20 text-red-500">High Impact</span>;
      case 'medium':
        return <span className="px-2 py-1 rounded-full text-xs bg-amber-500/20 text-amber-500">Medium Impact</span>;
      case 'low':
        return <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-500">Low Impact</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            AI-Powered Insights
          </h2>
          <p className="text-gray-400 mt-1">Automated analysis and recommendations for your business</p>
        </div>
        
        <div className="mt-4 sm:mt-0 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              activeFilter === 'all' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setActiveFilter('sales')}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              activeFilter === 'sales' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Sales
          </button>
          <button
            onClick={() => setActiveFilter('revenue')}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              activeFilter === 'revenue' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveFilter('anomaly')}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              activeFilter === 'anomaly' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Anomalies
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {loading ? (
          // Loading state
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="card p-5 animate-pulse">
              <div className="flex">
                <div className="rounded-full h-9 w-9 bg-gray-700"></div>
                <div className="ml-4 flex-1">
                  <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                </div>
              </div>
              <div className="ml-13 mt-3">
                <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          ))
        ) : filteredInsights.length > 0 ? (
          // Insights list
          filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="card p-5 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start">
                {getInsightIcon(insight.type)}
                <div className="ml-4">
                  <div className="flex items-center flex-wrap gap-2">
                    <h3 className="text-lg font-medium text-white">{insight.title}</h3>
                    {getImpactBadge(insight.impact)}
                  </div>
                  <p className="text-gray-400 mt-1">{insight.description}</p>
                </div>
              </div>
              
              <div className="mt-4 pl-11">
                <div className="p-3 rounded-lg bg-indigo-900/20 border border-indigo-500/30">
                  <div className="flex items-center text-indigo-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Recommendation</span>
                  </div>
                  <p className="text-gray-300">{insight.recommendation}</p>
                </div>
                
                <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                  <span>{new Date(insight.date).toLocaleDateString()}</span>
                  <div className="flex space-x-2">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          // Empty state
          <div className="card p-10 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No insights found</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              There are no insights available for the selected filter. Try selecting a different category or check back later.
            </p>
            <button 
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
            >
              View All Insights
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightEngine;
