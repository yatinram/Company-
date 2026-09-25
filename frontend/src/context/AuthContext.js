import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('aventrix_admin_token'));
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('aventrix_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (jwtToken, adminData) => {
    localStorage.setItem('aventrix_admin_token', jwtToken);
    if (adminData) {
      localStorage.setItem('aventrix_admin_user', JSON.stringify(adminData));
      setAdmin(adminData);
    }
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('aventrix_admin_token');
    localStorage.removeItem('aventrix_admin_user');
    setToken(null);
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
