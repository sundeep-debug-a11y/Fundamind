import { useState } from 'react';
import { userApi } from '@/api/client';

interface User {
  id: number;
  phone_number: string;
  name?: string;
  email?: string;
  language: string;
  is_active: boolean;
  created_at: string;
}

interface UserProgress {
  id: number;
  user_id: number;
  coins: number;
  level: number;
  xp: number;
  streak_days: number;
  last_activity: string;
}

export function useUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = async (userData: {
    phone_number: string;
    name?: string;
    email?: string;
    language?: string;
  }) => {
    setLoading(true);
    setError(null);
    const result = await userApi.create(userData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return null;
    }
    return result.data as User;
  };

  const getUser = async (userId: number) => {
    setLoading(true);
    setError(null);
    const result = await userApi.getById(userId);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return null;
    }
    return result.data as User;
  };

  const updateUser = async (userId: number, userData: {
    name?: string;
    email?: string;
    language?: string;
  }) => {
    setLoading(true);
    setError(null);
    const result = await userApi.update(userId, userData);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return null;
    }
    return result.data as User;
  };

  const getUserProgress = async (userId: number) => {
    setLoading(true);
    setError(null);
    const result = await userApi.getProgress(userId);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return null;
    }
    return result.data as UserProgress;
  };

  const addCoins = async (userId: number, coins: number) => {
    setLoading(true);
    setError(null);
    const result = await userApi.addCoins(userId, coins);
    setLoading(false);
    if (result.error) {
      setError(result.error);
      return null;
    }
    return result.data;
  };

  return {
    createUser,
    getUser,
    updateUser,
    getUserProgress,
    addCoins,
    loading,
    error,
  };
}
