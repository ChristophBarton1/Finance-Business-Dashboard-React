import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaLock, FaKey, FaShieldAlt } from 'react-icons/fa';

/**
 * Component that simulates a bank's login page for demo purposes.
 * In a real application, this would be replaced with an OAuth redirect to the actual bank's website.
 */
const BankLoginSimulator = ({ bank = {}, onSuccess = () => {}, className = '' }) => {
  const [showSimulator, setShowSimulator] = useState(false);
  const [step, setStep] = useState('login'); // 'login', 'tan', 'success'
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    tan: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call to bank authentication system
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (step === 'login') {
        // Move to TAN verification step
        setStep('tan');
      } else if (step === 'tan') {
        // Simulate successful authentication
        setStep('success');
        
        // Wait a moment before calling onSuccess
        setTimeout(() => {
          onSuccess({
            token: 'simulated-auth-token-' + Math.random().toString(36).substring(2),
            timestamp: new Date().toISOString(),
            expiresIn: 3600
          });
        }, 1500);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Fehler bei der Authentifizierung. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showSimulator) {
    return (
      <button
        onClick={() => setShowSimulator(true)}
        className={`py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md 
                 transition-colors duration-300 flex items-center justify-center ${className}`}
      >
        <FaUniversity className="mr-2" /> Zum Online-Banking
      </button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 overflow-hidden relative"
      >
        {/* Bank header */}
        <div className="bg-blue-600 p-4 text-white flex items-center justify-between">
          <div className="flex items-center">
            <FaUniversity className="text-2xl mr-2" />
            <span className="font-bold">{bank?.name || 'Online'} Banking</span>
          </div>
          <button
            onClick={() => setShowSimulator(false)}
            className="text-white hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          {step === 'login' && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Anmelden</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="sim-username" className="block text-sm font-medium text-gray-700 mb-1">
                    Benutzername
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaKey className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="sim-username"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      className="bg-white text-gray-800 placeholder-gray-400 rounded-md py-2 pl-10 pr-4 w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="Benutzername eingeben"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="sim-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Passwort
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input
                      type="password"
                      id="sim-password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      className="bg-white text-gray-800 placeholder-gray-400 rounded-md py-2 pl-10 pr-4 w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                      placeholder="Passwort eingeben"
                      required
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center
                               ${isLoading 
                                 ? 'bg-blue-800 cursor-not-allowed' 
                                 : 'bg-blue-600 hover:bg-blue-700'
                               } transition-colors duration-300`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Anmelden...
                      </>
                    ) : (
                      <>Anmelden</>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Dies ist eine Simulation. In einer echten App würden Sie zur offiziellen Banking-Website weitergeleitet.
                </p>
              </div>
            </>
          )}
          
          {step === 'tan' && (
            <>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Zwei-Faktor-Authentifizierung</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p>{error}</p>
                </div>
              )}
              
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <div className="flex items-center">
                  <FaShieldAlt className="text-blue-500 mr-2" />
                  <p className="text-blue-800 text-sm">
                    Wir haben einen Sicherheitscode an Ihr registriertes Gerät gesendet.
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="sim-tan" className="block text-sm font-medium text-gray-700 mb-1">
                    Sicherheitscode (TAN)
                  </label>
                  <input
                    type="text"
                    id="sim-tan"
                    name="tan"
                    value={credentials.tan}
                    onChange={handleChange}
                    className="bg-white text-gray-800 placeholder-gray-400 rounded-md py-2 px-4 w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    placeholder="6-stelligen Code eingeben"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Für Demo-Zwecke können Sie einen beliebigen Code eingeben.
                  </p>
                </div>
                
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3 px-4 rounded-md font-medium text-white flex items-center justify-center
                               ${isLoading 
                                 ? 'bg-blue-800 cursor-not-allowed' 
                                 : 'bg-blue-600 hover:bg-blue-700'
                               } transition-colors duration-300`}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Verifizieren...
                      </>
                    ) : (
                      <>Code bestätigen</>
                    )}
                  </button>
                </div>
              </form>
              
              <div className="mt-6 pt-4 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-500">
                  Dies ist eine Simulation. In einer echten App würden Sie zur offiziellen Banking-Website weitergeleitet.
                </p>
              </div>
            </>
          )}
          
          {step === 'success' && (
            <div className="text-center py-8">
              <div className="mx-auto mb-4 bg-green-100 p-3 rounded-full w-16 h-16 flex items-center justify-center">
                <svg className="text-green-500 w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Authentifizierung erfolgreich</h2>
              <p className="text-gray-600 mb-6">
                Sie werden in Kürze zurück zu Insight Analytics Pro weitergeleitet.
              </p>
              
              <div className="flex justify-center">
                <div className="animate-pulse flex space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BankLoginSimulator;
