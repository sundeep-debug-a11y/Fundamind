import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, authHelpers, dbHelpers, UserProfile } from '../supabase/config';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

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
  logout: () => Promise<void>;
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

export function SupabaseAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Check for existing session on app start
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      // Get current session
      const { session: currentSession } = await authHelpers.getSession();
      setSession(currentSession);

      if (currentSession?.user) {
        await loadUserProfile(currentSession.user);
      }

      // Listen for auth changes
      const { data: { subscription } } = authHelpers.onAuthStateChange(async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);

        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      // Try to get user profile from database
      const { data: profile, error } = await dbHelpers.getUserProfile(supabaseUser.id);

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading user profile:', error);
        return;
      }

      // If profile exists, use it; otherwise create from auth metadata
      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone || '',
          age: profile.age || 0,
          designation: profile.designation || '',
          createdAt: new Date(profile.created_at)
        });
      } else {
        // Create user from auth metadata
        const userData = supabaseUser.user_metadata;
        const newUser: User = {
          id: supabaseUser.id,
          name: userData.name || supabaseUser.email?.split('@')[0] || 'User',
          email: supabaseUser.email || '',
          phone: userData.phone || '',
          age: userData.age || 0,
          designation: userData.designation || '',
          createdAt: new Date()
        };
        setUser(newUser);

        // Create profile in database
        await dbHelpers.createUserProfile(supabaseUser.id, {
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          age: newUser.age,
          designation: newUser.designation
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const { data, error } = await authHelpers.signIn(email, password);

      if (error) {
        let errorMessage = 'Login failed';
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Invalid email or password';
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Please check your email and confirm your account';
        } else if (error.message.includes('Too many requests')) {
          errorMessage = 'Too many login attempts. Please try again later';
        }
        
        throw new Error(errorMessage);
      }

      console.log('Login successful:', data.user?.email);
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

      const { data, error } = await authHelpers.signUp(userData.email, userData.password, {
        name: userData.name,
        phone: userData.phone,
        age: userData.age,
        designation: userData.designation
      });

      if (error) {
        let errorMessage = 'Failed to create account';
        
        if (error.message.includes('already registered')) {
          errorMessage = 'An account with this email already exists';
        } else if (error.message.includes('Password should be')) {
          errorMessage = 'Password is too weak. Please choose a stronger password';
        } else if (error.message.includes('Invalid email')) {
          errorMessage = 'Invalid email address';
        }
        
        throw new Error(errorMessage);
      }

      console.log('Signup successful:', data.user?.email);
      
      // Note: User will need to confirm email before they can login
      if (data.user && !data.session) {
        throw new Error('Please check your email and click the confirmation link to activate your account');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await authHelpers.signOut();
      
      if (error) {
        console.error('Logout error:', error);
      } else {
        console.log('Logout successful');
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');

      // Update in database
      const { data, error } = await dbHelpers.updateUserProfile(user.id, {
        name: userData.name,
        phone: userData.phone,
        age: userData.age,
        designation: userData.designation
      });

      if (error) {
        throw new Error('Failed to update profile');
      }

      // Update local state
      setUser({ ...user, ...userData });
      console.log('Profile updated successfully');
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user && !!session,
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

export function useSupabaseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
}
