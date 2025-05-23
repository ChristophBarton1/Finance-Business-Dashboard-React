import axios from 'axios';

const API_URL = 'http://localhost:5000/api/banking';

// Definiere Fallback-Daten, die immer zur Verfügung stehen
const fallbackData = {
  availableBanks: {
    banks: [
      {
        id: 'bank-austria',
        name: 'Bank Austria',
        logo: '/images/banks/bank-austria.png',
        country: 'AT'
      },
      {
        id: 'erste-bank',
        name: 'Erste Bank und Sparkasse',
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
    ]
  },
  
  connectedBanks: {
    banks: [
      {
        id: 'bank-austria',
        name: 'Bank Austria',
        logo: '/images/banks/bank-austria.png',
        lastSync: new Date().toISOString(),
        status: 'active'
      }
    ]
  },
  
  accounts: {
    accounts: [
      {
        id: 'AT123456789012345678',
        name: 'Girokonto',
        type: 'checking',
        bankId: 'bank-austria',
        bankName: 'Bank Austria',
        balance: 2541.75,
        currency: 'EUR',
        lastUpdate: new Date().toISOString(),
        availableBalance: 2541.75,
        iban: 'AT123456789012345678',
        bic: 'BKAUATWW'
      },
      {
        id: 'AT987654321098765432',
        name: 'Sparkonto',
        type: 'savings',
        bankId: 'bank-austria',
        bankName: 'Bank Austria',
        balance: 15489.32,
        currency: 'EUR',
        lastUpdate: new Date().toISOString(),
        availableBalance: 15489.32,
        iban: 'AT987654321098765432',
        bic: 'BKAUATWW'
      }
    ],
    totalBalance: 18031.07,
    currency: 'EUR'
  },
  
  transactions: {
    transactions: [
      {
        id: 'tx1',
        accountId: 'AT123456789012345678',
        date: '2025-05-20T10:30:00',
        description: 'Gehalt Mai 2025',
        amount: 2850.00,
        currency: 'EUR',
        category: 'Einkommen',
        type: 'credit'
      },
      {
        id: 'tx2',
        accountId: 'AT123456789012345678',
        date: '2025-05-18T14:25:00',
        description: 'SPAR Dankt',
        amount: -78.35,
        currency: 'EUR',
        category: 'Lebensmittel',
        type: 'debit'
      },
      {
        id: 'tx3',
        accountId: 'AT123456789012345678',
        date: '2025-05-15T09:15:00',
        description: 'Amazon.de',
        amount: -49.99,
        currency: 'EUR',
        category: 'Shopping',
        type: 'debit'
      },
      {
        id: 'tx4',
        accountId: 'AT123456789012345678',
        date: '2025-05-10T20:05:00',
        description: 'Miete Juni',
        amount: -850.00,
        currency: 'EUR',
        category: 'Wohnen',
        type: 'debit'
      },
      {
        id: 'tx5',
        accountId: 'AT123456789012345678',
        date: '2025-05-05T18:30:00',
        description: 'Überweisung an Lisa',
        amount: -30.00,
        currency: 'EUR',
        category: 'Sonstiges',
        type: 'debit'
      }
    ]
  },
  
  analytics: {
    totalSpent: 1008.34,
    totalIncome: 2850.00,
    netCashflow: 1841.66,
    categoryBreakdown: [
      { name: 'Wohnen', value: 850.00 },
      { name: 'Lebensmittel', value: 78.35 },
      { name: 'Shopping', value: 49.99 },
      { name: 'Sonstiges', value: 30.00 }
    ],
    monthlyComparison: {
      trend: 'decreasing',
      changePercentage: 12
    }
  }
};

const bankingApi = {
  // Get available banks
  getAvailableBanks: async () => {
    try {
      const response = await axios.get(`${API_URL}/available-banks`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Available banks API endpoint not found. Returning fallback data.");
        return bankingApi.getFallbackData('availableBanks');
      } else {
        console.error("Error fetching available banks:", error);
        // For demo purposes, return fallback data
        return bankingApi.getFallbackData('availableBanks');
      }
    }
  },

  // Initialize bank connection
  connectBank: async (bankId, credentials) => {
    try {
      const response = await axios.post(`${API_URL}/connect`, { 
        bankId, 
        ...credentials 
      });
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Connect bank API endpoint not found. Simulating a successful connection.");
        return { success: true, message: "Connected successfully" };
      } else {
        console.error("Error connecting to bank:", error);
        // For demo purposes, simulate a successful connection
        return { success: true, message: "Connected successfully" };
      }
    }
  },
  
  // Get connected banks
  getConnectedBanks: async () => {
    try {
      const response = await axios.get(`${API_URL}/connected-banks`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Connected banks API endpoint not found. Returning fallback data.");
      } else {
        console.error("Error fetching connected banks:", error);
      }
      // For demo purposes, return fallback data
      return bankingApi.getFallbackData('connectedBanks');
    }
  },
  
  // Get account summary for all connected banks
  getAccounts: async () => {
    try {
      const response = await axios.get(`${API_URL}/accounts`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Accounts API endpoint not found. Returning fallback data.");
      } else {
        console.error("Error fetching accounts:", error);
      }
      // For demo purposes, return fallback data
      return bankingApi.getFallbackData('accounts');
    }
  },
  
  // Get transactions for a specific account
  getTransactions: async (accountId, params = {}) => {
    try {
      const response = await axios.get(
        `${API_URL}/accounts/${accountId}/transactions`,
        { params }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Transactions API endpoint not found. Returning fallback data.");
      } else {
        console.error("Error fetching transactions:", error);
      }
      // For demo purposes, return fallback data
      return bankingApi.getFallbackData('transactions', accountId);
    }
  },
  
  // Get spending analytics
  getSpendingAnalytics: async (accountId, timeframe = 'month') => {
    try {
      const response = await axios.get(
        `${API_URL}/accounts/${accountId}/analytics`,
        { params: { timeframe } }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("Analytics API endpoint not found. Returning fallback data.");
      } else {
        console.error("Error fetching spending analytics:", error);
      }
      // For demo purposes, return fallback data
      return bankingApi.getFallbackData('analytics', accountId);
    }
  },
  
  // Refresh bank connection
  refreshConnection: async (bankId) => {
    try {
      const response = await axios.post(`${API_URL}/refresh-connection`, { bankId });
      return response.data;
    } catch (error) {
      console.error("Error refreshing bank connection:", error);
      // For demo purposes, simulate a successful refresh
      return { success: true, message: "Connection refreshed successfully" };
    }
  },
  
  // Disconnect bank
  disconnectBank: async (bankId) => {
    try {
      const response = await axios.post(`${API_URL}/disconnect`, { bankId });
      return response.data;
    } catch (error) {
      console.error("Error disconnecting bank:", error);
      // For demo purposes, simulate a successful disconnection
      return { success: true, message: "Bank disconnected successfully" };
    }
  },
  
  // Get fallback data for demo purposes
  getFallbackData: (dataType, accountId = null) => {
    console.log(`Retrieving fallback data for: ${dataType}`);
    
    // If accountId is provided and the dataType is transactions, filter by accountId
    if (accountId && dataType === 'transactions') {
      return {
        transactions: fallbackData.transactions.transactions.filter(tx => tx.accountId === accountId)
      };
    } else if (accountId && dataType === 'analytics') {
      // Return analytics for the specified account
      return fallbackData.analytics;
    }
    
    // Return the complete data set for the requested type
    return fallbackData[dataType] || {};
  }
};

export default bankingApi;
