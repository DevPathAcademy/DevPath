'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  login: () => {},
  logout: () => {},
});



export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('devpath_token');
    if (savedToken) setToken(savedToken);
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('devpath_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('devpath_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


