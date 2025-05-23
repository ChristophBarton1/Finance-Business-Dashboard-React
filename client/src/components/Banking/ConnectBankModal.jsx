import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUniversity, FaLock, FaKey, FaTimes, FaSearch, FaChevronRight, FaExternalLinkAlt, FaShieldAlt } from 'react-icons/fa';
import bankingApi from '../../utils/bankingApi';

const ConnectBankModal = ({ isOpen, onClose, onConnect }) => {
  const [banks, setBanks] = useState([]);
  const [filteredBanks, setFilteredBanks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [step, setStep] = useState('select-bank'); // 'select-bank', 'redirect', or 'connecting'
  const [isLoading, setIsLoading] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [error, setError] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [authResult, setAuthResult] = useState(null);
  
  // Fetch available banks
  useEffect(() => {
    if (isOpen) {
      const fetchBanks = async () => {
        try {
          setLoadingBanks(true);
          const response = await bankingApi.getAvailableBanks();
          setBanks(response.banks || []);
          setFilteredBanks(response.banks || []);
        } catch (error) {
          console.error('Error fetching banks:', error);
          setError('Fehler beim Laden der verfügbaren Banken.');
        } finally {
          setLoadingBanks(false);
        }
      };
      
      fetchBanks();
    } else {
      // Reset state when modal closes
      setStep('select-bank');
      setSelectedBank(null);
      setSearchTerm('');
      setCredentials({
        username: '',
        password: '',
        securityCode: ''
      });
    }
  }, [isOpen]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredBanks(banks);
    } else {
      const filtered = banks.filter(bank => 
        bank.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBanks(filtered);
    }
  };
  
  const handleBankSelect = (bank) => {
    setSelectedBank(bank);
    setStep('redirect');
    // Simulate generating a redirect URL for the bank's login page
    setRedirectUrl(`https://${bank.id}.example.com/login?client_id=insight-analytics&redirect_uri=http://localhost:5176/auth/callback`);
  };
  
  const handleBack = () => {
    if (step === 'redirect') {
      setStep('select-bank');
      setSelectedBank(null);
    } else if (step === 'connecting') {
      setStep('redirect');
      setAuthResult(null);
    }
  };
  
  const handleAuthSuccess = (result) => {
    setAuthResult(result);
    setStep('connecting');
  };

  const handleConnect = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Connect to selected bank with the auth token from the redirect flow
      await onConnect(selectedBank.id, { authToken: authResult.token });
      onClose();
    } catch (error) {
      console.error('Error connecting to bank:', error);
      setError('Fehler bei der Verbindung. Bitte versuchen Sie es später erneut.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderBankSelectionContent = () => (
    <>
      <div className="text-center mb-6">
        <div className="bg-indigo-600 p-3 rounded-full inline-block mb-2">
          <FaUniversity className="text-white text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-white">Bank verbinden</h2>
        <p className="text-gray-300 mt-2">
          Verbinden Sie Ihr Bankkonto, um Ihre Finanzen zu überwachen
        </p>
      </div>
      
      {error && (
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="mb-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="bg-gray-700 text-white placeholder-gray-400 rounded-md py-2 pl-10 pr-4 w-full border border-gray-600 focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            placeholder="Bank suchen..."
          />
        </div>
      </div>
      
      <div className="overflow-y-auto max-h-60 -mx-2 px-2">
        {loadingBanks ? (
          <div className="py-8 flex justify-center">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : filteredBanks.length === 0 ? (
          <div className="py-6 text-center text-gray-400">
            Keine Banken gefunden
          </div>
        ) : (
          <ul className="space-y-2">
            {filteredBanks.map(bank => (
              <li key={bank.id}>
                <button
                  type="button"
                  onClick={() => handleBankSelect(bank)}
                  className="w-full flex items-center justify-between p-3 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-800 p-2 rounded-md">
                      <FaUniversity className="text-indigo-400" />
                    </div>
                    <span className="ml-3 text-white">{bank.name}</span>
                  </div>
                  <FaChevronRight className="text-gray-400" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <p className="text-xs text-gray-400 text-center mt-6">
        Für Demo-Zwecke werden keine echten Anmeldedaten gesendet. 
        Die Daten werden lokal für Demonstrationszwecke simuliert.
      </p>
    </>
  );
  
  const renderRedirectContent = () => (
    <>
      <div className="mb-6">
        <button
          type="button"
          onClick={handleBack}
          className="text-indigo-400 hover:text-indigo-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Zurück
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="bg-indigo-600 p-3 rounded-full inline-block mb-2">
          <FaUniversity className="text-white text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-white">{selectedBank?.name} verbinden</h2>
        <p className="text-gray-300 mt-2">
          Sie werden zur Anmeldeseite Ihrer Bank weitergeleitet
        </p>
      </div>
      
      {error && (
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-gray-700 rounded-lg p-4 mb-6 text-center">
        <img 
          src={`/images/banks/${selectedBank?.id}-logo.png`} 
          alt={`${selectedBank?.name} Logo`}
          className="h-16 mx-auto mb-4"
          onError={(e) => { e.target.src = '/images/banks/default-bank.png'; }}
        />
        <p className="text-gray-300 mb-4">
          Um Ihre Bankdaten zu importieren, müssen Sie sich bei Ihrem Online-Banking-Konto anmelden. 
          Sie werden auf die offizielle Webseite Ihrer Bank weitergeleitet.  
        </p>
        <p className="text-gray-400 text-sm mb-6">
          Ihre Zugangsdaten werden direkt an Ihre Bank übermittelt und nicht von uns gespeichert.
        </p>
      </div>
      
      <div className="pt-2">
        <BankLoginSimulatorButton 
          bank={selectedBank || {}} 
          onSuccess={handleAuthSuccess} 
          className="w-full"
        />
      </div>
      
      <p className="text-xs text-gray-400 text-center mt-6">
        Für Demo-Zwecke werden Sie zu einer simulierten Bank-Login-Seite weitergeleitet.
      </p>
    </>
  );
  
  const renderConnectingContent = () => (
    <>
      <div className="mb-6">
        <button
          type="button"
          onClick={handleBack}
          className="text-indigo-400 hover:text-indigo-300 flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Zurück
        </button>
      </div>
      
      <div className="text-center mb-6">
        <div className="bg-green-600 p-3 rounded-full inline-block mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white">Erfolgreich angemeldet</h2>
        <p className="text-gray-300 mt-2">
          Sie haben sich erfolgreich bei {selectedBank?.name} angemeldet
        </p>
      </div>
      
      {error && (
        <div className="bg-red-900 bg-opacity-50 text-red-200 p-4 rounded-md mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <div className="bg-gray-700 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-white mb-2">Zugriff erteilt</h3>
        <p className="text-gray-300 mb-4">
          Sie haben Insight Analytics Pro Zugriff auf folgende Daten gewährt:
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Kontosaldo und Kontodaten
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Transaktionen der letzten 90 Tage
          </li>
          <li className="flex items-center">
            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Kategorisierung von Transaktionen
          </li>
        </ul>
      </div>
      
      <div className="pt-2">
        <button
          onClick={handleConnect}
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
              <FaUniversity className="mr-2" /> Konto verbinden
            </>
          )}
        </button>
      </div>
    </>
  );
  
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
            
            {step === 'select-bank' ? renderBankSelectionContent() : 
             step === 'redirect' ? renderRedirectContent() : 
             renderConnectingContent()}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Bank Login Simulator Component
const BankLoginSimulatorButton = ({ bank = {}, onSuccess = () => {}, className = '' }) => {
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

export default ConnectBankModal;
