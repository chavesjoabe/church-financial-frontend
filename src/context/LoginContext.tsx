import React, { createContext, useState, useContext, ReactNode } from 'react';

export type LoggedUser = {
  name: string;
  role: string;
  document: string;
  email: string;
  password: string;
};

interface AuthContextType {
  getLoggedUser: () => LoggedUser | null;
  setLoggedUser: (user: string) => void;
  loggedUser: string | null;
  getToken: () => string | null;
  setToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loggedUser, setLoggedUser] = useState<string | null>(
    sessionStorage.getItem('user'),
  );

  const loginUser = (user: string) => {
    sessionStorage.setItem('user', user);
    setLoggedUser(user);
  };

  const getLoggedUser = (): LoggedUser | null => {
    const user = sessionStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }

    return null;
  };

  const getToken = () => {
    const token = sessionStorage.getItem('token');

    if (token) {
      return token;
    }

    return null;
  };

  const setToken = (token: string) => {
    sessionStorage.setItem('token', token);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        setLoggedUser: loginUser,
        getLoggedUser,
        loggedUser,
        getToken,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
