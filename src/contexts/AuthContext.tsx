import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
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

// Supabase-based authentication
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Check for existing session on app start
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setIsLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        setIsLoading(false);
        return;
      }

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          age: profile.age,
          designation: profile.designation,
          createdAt: new Date(profile.created_at),
        });
      } else {
        // Profile doesn't exist, user needs to complete profile
        setUser({
          id: supabaseUser.id,
          name: supabaseUser.user_metadata?.name || '',
          email: supabaseUser.email || '',
          phone: supabaseUser.phone || '',
          age: 0,
          designation: '',
          createdAt: new Date(supabaseUser.created_at),
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Demo mode for testing
      if (email === 'demo@test.com' && password === 'demo123') {
        setUser({
          id: 'demo-user-id',
          name: 'Demo User',
          email: 'demo@test.com',
          phone: '+1234567890',
          age: 25,
          designation: 'Student',
          createdAt: new Date(),
        });
        return;
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // User profile will be loaded automatically by the auth state change listener
      
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: SignUpData) => {
    try {
      setIsLoading(true);
      
      // Sign up with Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            name: userData.name,
            phone: userData.phone,
          }
        }
      });

      if (error) {
        throw error;
      }

      // Profile will be created automatically by database trigger
      
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
      }
      // User state will be cleared by the auth state change listener
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (userData: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          name: userData.name,
          phone: userData.phone,
          age: userData.age,
          designation: userData.designation,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    } catch (error: any) {
      console.error('Profile update error:', error);
      throw new Error(error.message || 'Profile update failed');
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
