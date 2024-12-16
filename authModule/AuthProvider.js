import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create Context
const AuthContext = createContext();

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedToken = localStorage.getItem('authToken');
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
  }, [navigate]);

  // Login function
  const login = async (userData) => {
    try {
      const { authToken, user } = await loginService(userData); // Assuming loginService is an API call
      if (authToken && user) {
        localStorage.setItem('authToken', authToken);
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setToken(authToken);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setToken(null);
    navigate('/login');
  };

  // Provide context value
  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
