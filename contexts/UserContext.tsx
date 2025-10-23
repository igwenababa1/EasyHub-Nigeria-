import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { User, Order } from '../types';

interface UserContextType {
  user: User | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  addOrderToHistory: (order: Order) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string, email: string) => {
    // This is a mock login. In a real app, this would involve an API call.
    const mockUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      orderHistory: [],
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };
  
  const addOrderToHistory = (order: Order) => {
    setUser(currentUser => {
        if (!currentUser) return null;
        return {
            ...currentUser,
            orderHistory: [...currentUser.orderHistory, order],
        };
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, addOrderToHistory }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};