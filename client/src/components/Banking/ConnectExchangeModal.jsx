import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBitcoin, FaKey, FaTimes } from 'react-icons/fa';

const ConnectExchangeModal = ({ isOpen, onClose, onConnect }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setApiKey(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // For demo purposes, we're not sending a real API key
      // Just simulate a successful connection
      await onConnect('demo-api-key');
    } catch (error) {
      console.error('Error connecting to exchange:', error);
      setError('Fehler bei der Verbindung. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full mx-4 relative z-10"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>
            
            <div className="text-center mb-6">
              <div className="bg-orange-500 p-3 rounded-full inline-block mb-2">
                <FaBitcoin className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-white">Bitpanda verbinden</h2>
              <p className="text-gray-300 mt-2">
                Verbinden Sie Ihr Bitpanda Konto, um Ihr Krypto-Portfolio zu überwachen.
              </p>
            </div>
            
            {error && (
              <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-md mb-6">
                <p>{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-1">
                  API-Schlüssel
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaKey className="text-gray-400" />
                  </div>
                  <input
                    type="password"
                    id="apiKey"
                    value={apiKey}
                    onChange={handleChange}
                    className="bg-gray-700 text-white placeholder-gray-400 rounded-md py-2 pl-10 pr-4 w-full border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    placeholder="Bitpanda API-Schlüssel eingeben"
                    required
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Sie finden Ihren API-Schlüssel in Ihrem Bitpanda-Konto unter Einstellungen &gt; API.
                </p>
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center
                            ${isLoading 
                              ? 'bg-indigo-800 cursor-not-allowed' 
                              : 'bg-indigo-600 hover:bg-indigo-700'
                            } transition-colors duration-300`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verbinde...
                    </>
                  ) : (
                    <>
                      <FaBitcoin className="mr-2" /> Verbinden
                    </>
                  )}
                </button>
              </div>
              
              <p className="text-xs text-gray-400 text-center mt-4">
                Für Demo-Zwecke werden keine echten API-Schlüssel gesendet. 
                Klicken Sie einfach auf "Verbinden", um die Demo-Daten zu laden.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConnectExchangeModal;
