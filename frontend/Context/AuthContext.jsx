import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      // Fetch user data here if needed
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [authToken]);


 


  const signOut = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authToken,  signOut, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext }