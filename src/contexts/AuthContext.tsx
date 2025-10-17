import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  designation: string;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignUpData) => Promise<void>;
  logout: () => void;
  updateUserProfile: (userData: Partial<User>) => Promise<void>;
}

interface SignUpData {
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  designation: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple localStorage-based authentication (no external services required)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Initialize with demo user if no users exist
      const users = JSON.parse(localStorage.getItem('fundamind_users') || '[]');
      if (users.length === 0) {
        const demoUser = {
          id: 'demo-user',
          name: 'Demo User',
          email: 'demo@fundamind.com',
          phone: '+91 9876543210',
          age: 25,
          designation: 'Student',
          createdAt: new Date().toISOString(),
          password: 'demo123'
        };
        localStorage.setItem('fundamind_users', JSON.stringify([demoUser]));
      }

      // Check localStorage for existing user session
      const savedUser = localStorage.getItem('fundamind_user');
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        setUser({
          ...userData,
          createdAt: new Date(userData.createdAt)
        });
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('fundamind_users') || '[]');
      console.log('Available users:', users.map((u: any) => ({ email: u.email, name: u.name })));
      
      const existingUser = users.find((u: any) => u.email === email);
      
      if (!existingUser) {
        throw new Error('No account found with this email address');
      }
      
      if (existingUser.password !== password) {
        throw new Error('Incorrect password');
      }
      
      // Set user (excluding password)
      const { password: _, ...userWithoutPassword } = existingUser;
      setUser({
        ...userWithoutPassword,
        createdAt: new Date(userWithoutPassword.createdAt)
      });
      
      localStorage.setItem('fundamind_user', JSON.stringify(userWithoutPassword));
      console.log('Login successful:', email);
      
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignUpData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('fundamind_users') || '[]');
      const existingUser = users.find((u: any) => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('An account with this email already exists');
      }
      
      // Create new user
      const newUser: User & { password: string } = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        age: userData.age,
        designation: userData.designation,
        createdAt: new Date(),
        password: userData.password
      };
      
      // Save to users list
      users.push(newUser);
      localStorage.setItem('fundamind_users', JSON.stringify(users));
      
      // Set current user (excluding password)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      localStorage.setItem('fundamind_user', JSON.stringify(userWithoutPassword));
      
      console.log('Signup successful:', userData.email);
      
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('fundamind_user');
      console.log('Logout successful');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('fundamind_user', JSON.stringify(updatedUser));
      
      // Also update in users list
      const users = JSON.parse(localStorage.getItem('fundamind_users') || '[]');
      const userIndex = users.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...userData };
        localStorage.setItem('fundamind_users', JSON.stringify(users));
      }
      
      console.log('Profile updated successfully');
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    updateUserProfile
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
