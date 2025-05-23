import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ChartCard = ({ title, subtitle, children, showOptions = true }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={`card h-full transition-all duration-300 ${isExpanded ? 'col-span-full row-span-2' : ''}`}>
      {/* Card Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-700">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
        </div>
        
        {showOptions && (
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
            
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 shadow-lg border border-gray-700 z-50"
              >
                <ul className="py-1">
                  <li>
                    <button 
                      onClick={() => {
                        setIsExpanded(!isExpanded);
                        setShowMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                    >
                      {isExpanded ? 'Collapse' : 'Expand'}
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Export as CSV
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Export as PNG
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Set as Default View
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">
                      Refresh Data
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-5">
        {children}
      </div>
      
      {/* Card Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-gray-700">
        <div className="text-xs text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
        <button className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-200">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ChartCard;
