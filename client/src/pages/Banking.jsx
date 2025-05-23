import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUniversity, FaPlus, FaExchangeAlt, FaWallet, FaChartLine, FaMoneyBill, FaBuilding, FaHistory, FaChartBar } from 'react-icons/fa';

// Components
import PageHeader from '../components/PageHeader';
import DashboardCard from '../components/DashboardCard';
import BankLoginSimulator from '../components/Banking/BankLoginSimulator';

const Banking = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showBankSelector, setShowBankSelector] = useState(false);
  const [bankConnectionInProgress, setBankConnectionInProgress] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('de-AT', { 
      style: 'currency', 
      currency: 'EUR'
    }).format(value);
  };

  // Handle successful bank connection
  const handleBankConnectionSuccess = (bankId, authData) => {
    console.log('Bank connected successfully:', bankId, authData);
    setBankConnectionInProgress(false);
    setConnectionStatus('success');
    
    // In a real app, you would send the auth data to your backend
    // and then fetch the updated account information
    
    // For demo purposes, we'll just show a success message and reset after 3 seconds
    setTimeout(() => {
      setConnectionStatus(null);
      setShowBankSelector(false);
      // In real app: refetch bank accounts data
    }, 3000);
  };

  // Handle bank connection failure
  const handleBankConnectionError = (error) => {
    console.error('Bank connection error:', error);
    setBankConnectionInProgress(false);
    setConnectionStatus('error');
    
    // Reset after 3 seconds
    setTimeout(() => {
      setConnectionStatus(null);
    }, 3000);
  };

  // Tabs
  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: <FaChartLine /> },
    { id: 'accounts', label: 'Konten', icon: <FaWallet /> },
    { id: 'transactions', label: 'Transaktionen', icon: <FaExchangeAlt /> },
    { id: 'analytics', label: 'Analysen', icon: <FaChartBar /> }
  ];

  // Verfügbare Banken für die Verbindung
  const availableBanks = [
    {
      id: 'bank-austria',
      name: 'Bank Austria',
      logo: '/images/banks/bank-austria.png',
      country: 'AT'
    },
    {
      id: 'erste-bank',
      name: 'Erste Bank',
      logo: '/images/banks/erste-bank.png',
      country: 'AT'
    },
    {
      id: 'raiffeisen',
      name: 'Raiffeisen Bank',
      logo: '/images/banks/raiffeisen.png',
      country: 'AT'
    },
    {
      id: 'bawag',
      name: 'BAWAG P.S.K.',
      logo: '/images/banks/bawag.png',
      country: 'AT'
    },
    {
      id: 'volksbank',
      name: 'Volksbank',
      logo: '/images/banks/volksbank.png',
      country: 'AT'
    }
  ];

  // Mockdaten für Konten
  const accounts = [
    {
      id: 'at1234',
      name: 'Girokonto',
      bank: 'Bank Austria',
      balance: 2541.75,
      transactions: [
        { date: '2025-05-20', description: 'Gehalt Mai 2025', amount: 2850.00 },
        { date: '2025-05-18', description: 'SPAR Einkauf', amount: -78.35 },
        { date: '2025-05-15', description: 'Amazon Bestellung', amount: -49.99 }
      ]
    },
    {
      id: 'at5678',
      name: 'Sparkonto',
      bank: 'Bank Austria',
      balance: 15489.32,
      transactions: []
    },
    {
      id: 'at9012',
      name: 'Girokonto',
      bank: 'Erste Bank',
      balance: 1327.50,
      transactions: [
        { date: '2025-05-17', description: 'Miete Juni', amount: -850.00 },
        { date: '2025-05-10', description: 'Überweisung an Lisa', amount: -30.00 }
      ]
    }
  ];

  // Finanzielle Kennzahlen
  const stats = [
    { label: 'Gesamtvermögen', value: accounts.reduce((sum, acc) => sum + acc.balance, 0) },
    { label: 'Ausgaben (30 Tage)', value: -1008.34 },
    { label: 'Einnahmen (30 Tage)', value: 2850.00 },
    { label: 'Netto Cashflow', value: 1841.66 }
  ];

  // Einfache Darstellung - Kontoübersicht
  const renderOverview = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <DashboardCard title="Finanzübersicht">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-4 bg-gray-800 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {formatCurrency(stat.value)}
                </p>
              </div>
            ))}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Verbundene Banken">
          <div className="space-y-3">
            <div className="p-3 bg-gray-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-indigo-900 p-2 rounded-md mr-3">
                  <FaBuilding className="text-indigo-400" />
                </div>
                <span className="text-white font-medium">Bank Austria</span>
              </div>
              <span className="text-xs text-gray-400">2 Konten</span>
            </div>
            
            <div className="p-3 bg-gray-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="bg-indigo-900 p-2 rounded-md mr-3">
                  <FaBuilding className="text-indigo-400" />
                </div>
                <span className="text-white font-medium">Erste Bank</span>
              </div>
              <span className="text-xs text-gray-400">1 Konto</span>
            </div>
            
            <button 
              onClick={() => setShowBankSelector(true)}
              className="w-full mt-4 p-3 bg-gray-800 border border-dashed border-gray-700 rounded-lg flex items-center justify-center text-indigo-400 hover:border-indigo-500 transition-colors"
            >
              <FaPlus className="mr-2" /> Neue Bank verbinden
            </button>
          </div>
        </DashboardCard>
      </div>
    );
  };

  // Konten Tab
  const renderAccounts = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map(account => (
          <div key={account.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
            <div className="p-5 bg-gradient-to-br from-indigo-900 to-indigo-800">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-300 text-sm">{account.bank}</p>
                  <h3 className="text-xl font-bold text-white mt-1">{account.name}</h3>
                </div>
                <div className="bg-indigo-700 p-2 rounded-full">
                  <FaWallet className="text-white" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-300 text-sm">Kontostand</p>
                <p className="text-3xl font-bold text-white mt-1">{formatCurrency(account.balance)}</p>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-gray-400">Letzte Aktivität</span>
                <span className="text-gray-400">Betrag</span>
              </div>
              {account.transactions.slice(0, 2).map((transaction, i) => (
                <div key={i} className="flex justify-between py-2 border-t border-gray-700">
                  <span className="text-gray-300 truncate max-w-[150px]">{transaction.description}</span>
                  <span className={transaction.amount >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {formatCurrency(transaction.amount)}
                  </span>
                </div>
              ))}
              {account.transactions.length === 0 && (
                <div className="py-4 text-center text-gray-500">
                  Keine Transaktionen verfügbar
                </div>
              )}
              <button className="w-full mt-4 py-2 text-indigo-400 hover:text-indigo-300 transition-colors text-sm">
                Details anzeigen
              </button>
            </div>
          </div>
        ))}
        
        <div className="bg-gray-800 rounded-lg overflow-hidden border-2 border-dashed border-gray-700 flex flex-col items-center justify-center p-8 h-full">
          <div className="bg-gray-700 p-3 rounded-full mb-4">
            <FaPlus className="text-indigo-400" />
          </div>
          <h3 className="text-white font-medium mb-2">Neues Konto</h3>
          <p className="text-gray-400 text-sm text-center mb-4">Verbinde ein weiteres Bankkonto</p>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors">
            Konto hinzufügen
          </button>
        </div>
      </div>
    );
  };

  // Transaktionen Tab
  const renderTransactions = () => {
    // Alle Transaktionen aus allen Konten zusammenfassen
    const allTransactions = accounts.flatMap(account => 
      account.transactions.map(tx => ({
        ...tx,
        account: account.name,
        bank: account.bank
      }))
    ).sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
      <DashboardCard title="Transaktionen">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Datum</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Beschreibung</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Konto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Betrag</th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {allTransactions.map((tx, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {new Date(tx.date).toLocaleDateString('de-AT')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{tx.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{tx.account}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{tx.bank}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${tx.amount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {formatCurrency(tx.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DashboardCard>
    );
  };

  // Analysen Tab
  const renderAnalytics = () => {
    // Beispiel-Kategorien für Ausgaben
    const categories = [
      { name: 'Wohnen', value: 850 },
      { name: 'Lebensmittel', value: 320 },
      { name: 'Transport', value: 150 },
      { name: 'Unterhaltung', value: 200 },
      { name: 'Shopping', value: 180 },
      { name: 'Sonstiges', value: 100 }
    ];

    const total = categories.reduce((sum, cat) => sum + cat.value, 0);

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DashboardCard title="Ausgaben nach Kategorie">
          <div className="space-y-4">
            {categories.map(category => {
              const percentage = (category.value / total * 100).toFixed(1);
              return (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{category.name}</span>
                    <span className="text-gray-300">{formatCurrency(category.value)} ({percentage}%)</span>
                  </div>
                  <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </DashboardCard>
        
        <DashboardCard title="Cashflow Analyse">
          <div className="p-4 bg-gray-800 rounded-lg mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Gesamteinnahmen</span>
              <span className="text-green-500 font-medium">{formatCurrency(2850)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-400">Gesamtausgaben</span>
              <span className="text-red-500 font-medium">{formatCurrency(1800)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-700">
              <span className="text-white font-medium">Netto</span>
              <span className="text-white font-medium">{formatCurrency(1050)}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-medium mb-3">Empfehlungen</h3>
            <div className="space-y-2">
              <div className="p-3 bg-green-900 bg-opacity-20 border border-green-800 rounded-lg">
                <p className="text-green-400 text-sm">Gutes Verhältnis zwischen Einnahmen und Ausgaben. Überlege, mehr in Sparkonten zu investieren.</p>
              </div>
              <div className="p-3 bg-blue-900 bg-opacity-20 border border-blue-800 rounded-lg">
                <p className="text-blue-400 text-sm">Die Ausgaben für Shopping sind 10% höher als im Vormonat.</p>
              </div>
            </div>
          </div>
        </DashboardCard>
      </div>
    );
  };

  // Tab-Inhalt basierend auf dem aktiven Tab rendern
  const renderTabContent = () => {
    switch(activeTab) {
      case 'overview':
        return renderOverview();
      case 'accounts':
        return renderAccounts();
      case 'transactions':
        return renderTransactions();
      case 'analytics':
        return renderAnalytics();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="px-6 py-8">
      <PageHeader title="Banking" icon={<FaUniversity />} />
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap bg-gray-800 rounded-lg p-1 mb-8 max-w-3xl">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
      
      {/* Bank Selection Modal */}
      {showBankSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-gray-900 rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden border border-gray-700">
            <div className="p-5 bg-gradient-to-r from-indigo-900 to-blue-900 flex justify-between items-center">
              <h2 className="text-xl font-bold text-white flex items-center">
                <FaUniversity className="mr-2" /> Bank auswählen
              </h2>
              <button 
                onClick={() => setShowBankSelector(false)}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-300 mb-4">
                Wählen Sie Ihre Bank aus, um eine sichere Verbindung herzustellen. Sie werden zur Login-Seite Ihrer Bank weitergeleitet.
              </p>
              
              {connectionStatus === 'success' && (
                <div className="bg-green-900 bg-opacity-20 border border-green-700 rounded-lg p-4 mb-6 text-green-400">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Bankverbindung erfolgreich hergestellt!
                  </p>
                </div>
              )}
              
              {connectionStatus === 'error' && (
                <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4 mb-6 text-red-400">
                  <p className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Verbindung fehlgeschlagen. Bitte versuchen Sie es später erneut.
                  </p>
                </div>
              )}
              
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {availableBanks.map(bank => (
                  <div 
                    key={bank.id}
                    className="bg-gray-800 hover:bg-gray-750 rounded-lg p-4 flex items-center justify-between cursor-pointer transition-colors"
                    onClick={() => {
                      setSelectedBank(bank);
                      setBankConnectionInProgress(true);
                    }}
                  >
                    <div className="flex items-center">
                      <div className="bg-gray-700 p-2 rounded-md mr-3">
                        <FaUniversity className="text-indigo-400" />
                      </div>
                      <span className="font-medium text-white">{bank.name}</span>
                    </div>
                    <span className="text-xs text-gray-400">{bank.country}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-700 text-center">
                <p className="text-sm text-gray-400">
                  Ihre Zugangsdaten werden sicher übertragen und niemals von uns gespeichert. Die Verbindung erfolgt über ein sicheres OAuth-Verfahren.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Bank Login Simulator */}
      {bankConnectionInProgress && selectedBank && (
        <BankLoginSimulator 
          bank={selectedBank} 
          onSuccess={(authData) => handleBankConnectionSuccess(selectedBank.id, authData)}
          onError={handleBankConnectionError}
          className="w-full"
        />
      )}
    </div>
  );
};

export default Banking;
