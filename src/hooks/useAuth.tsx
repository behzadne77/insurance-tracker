"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.log(error)
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage (simulating a database)
      const registeredUsers = localStorage.getItem('registeredUsers');
      let users: User[] = [];
      
      if (registeredUsers) {
        try {
          users = JSON.parse(registeredUsers);
        } catch (error) {
          console.error('Error parsing registered users:', error);
        }
      }
      
      // Find user by email
      const foundUser = users.find(user => user.email === email);
      
      if (foundUser) {
        // In a real app, you would verify the password here
        setUser(foundUser);
        localStorage.setItem('user', JSON.stringify(foundUser));
        return true;
      } else {
        // If no user found, create a mock user (for demo purposes)
        const mockUser: User = {
          id: Date.now().toString(),
          fullName: 'کاربر نمونه',
          email: email,
          phone: '09123456789'
        };
        
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const registeredUsers = localStorage.getItem('registeredUsers');
      let users: User[] = [];
      
      if (registeredUsers) {
        try {
          users = JSON.parse(registeredUsers);
        } catch (error) {
          console.error('Error parsing registered users:', error);
        }
      }
      
      // Check if email already exists
      const existingUser = users.find(user => user.email === userData.email);
      if (existingUser) {
        console.error('User already exists');
        return false;
      }
      
      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone
      };
      
      // Add to registered users list
      users.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 