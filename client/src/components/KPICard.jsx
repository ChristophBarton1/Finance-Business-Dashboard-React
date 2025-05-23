import React from 'react';
import { motion } from 'framer-motion';

const KPICard = ({ title, value, change, changeType, icon, loading }) => {
  return (
    <div className="card h-full p-5">
      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          <div className="h-8 bg-gray-700 rounded w-1/3"></div>
          <div className="h-4 bg-gray-700 rounded w-2/3"></div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
            <div className="p-2 rounded-lg bg-gray-700/50">
              {icon}
            </div>
          </div>
          
          <div className="flex items-end space-x-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-white"
            >
              {value}
            </motion.div>
            
            {change && (
              <div className={`flex items-center text-sm font-medium ${
                changeType === 'positive' ? 'text-green-500' : 'text-red-500'
              }`}>
                <span className="mr-1">
                  {changeType === 'positive' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12 13a1 1 0 100 2h5a1 1 0 001-1V9a1 1 0 10-2 0v2.586l-4.293-4.293a1 1 0 00-1.414 0L8 9.586 3.707 5.293a1 1 0 00-1.414 1.414l5 5a1 1 0 001.414 0L11 9.414 14.586 13H12z" clipRule="evenodd" />
                    </svg>
                  )}
                </span>
                {change}%
              </div>
            )}
          </div>
          
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full rounded-full ${
                changeType === 'positive' ? 'bg-gradient-to-r from-indigo-500 to-blue-500' : 'bg-gradient-to-r from-red-500 to-orange-500'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.abs(parseFloat(change)) * 2, 100)}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default KPICard;
