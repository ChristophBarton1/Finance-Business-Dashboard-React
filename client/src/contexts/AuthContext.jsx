import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// Sample user data
const sampleUsers = [
  {
    id: 1,
    email: 'admin@example.com',
    password: 'admin123', // In a real app, this would be hashed
    name: 'John Doe',
    role: 'Admin',
    avatar: 'JD'
  },
  {
    id: 2,
    email: 'analyst@example.com',
    password: 'analyst123',
    name: 'Jane Smith',
    role: 'Analyst',
    avatar: 'JS'
  },
  {
    id: 3,
    email: 'demo@example.com', // Easy login for demo purposes
    password: 'demo123',
    name: 'Demo User',
    role: 'Viewer',
    avatar: 'DU'
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('insightProUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    setError('');
    
    // Find user with matching credentials
    const user = sampleUsers.find(
      user => user.email === email && user.password === password
    );
    
    if (user) {
      // Create a copy without the password
      const { password, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('insightProUser', JSON.stringify(userWithoutPassword));
      return true;
    } else {
      setError('Invalid email or password');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('insightProUser');
  };

  // Value to be provided to consuming components
  const value = {
    currentUser,
    login,
    logout,
    error,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
