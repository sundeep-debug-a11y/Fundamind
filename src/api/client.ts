// API Client for Prospera Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

// Generic API request function
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.detail || 'An error occurred' };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return { error: 'Network error. Please check your connection.' };
  }
}

// User API
export const userApi = {
  create: (userData: { phone_number: string; name?: string; email?: string; language?: string }) =>
    apiRequest('/api/users/', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  getById: (userId: number) =>
    apiRequest(`/api/users/${userId}`, { method: 'GET' }),

  update: (userId: number, userData: { name?: string; email?: string; language?: string }) =>
    apiRequest(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    }),

  getProgress: (userId: number) =>
    apiRequest(`/api/users/${userId}/progress`, { method: 'GET' }),

  addCoins: (userId: number, coins: number) =>
    apiRequest(`/api/users/${userId}/progress/add-coins?coins=${coins}`, {
      method: 'POST',
    }),
};

// Transaction API
export const transactionApi = {
  create: (userId: number, transaction: {
    amount: number;
    category: string;
    description?: string;
    transaction_type: 'income' | 'expense';
  }) =>
    apiRequest(`/api/transactions/${userId}`, {
      method: 'POST',
      body: JSON.stringify(transaction),
    }),

  getByUser: (userId: number) =>
    apiRequest(`/api/transactions/${userId}`, { method: 'GET' }),

  getSummary: (userId: number) =>
    apiRequest(`/api/transactions/${userId}/summary`, { method: 'GET' }),

  delete: (transactionId: number) =>
    apiRequest(`/api/transactions/${transactionId}`, { method: 'DELETE' }),
};

// Game API
export const gameApi = {
  submitScore: (userId: number, score: {
    game_name: string;
    score: number;
    coins_earned: number;
  }) =>
    apiRequest(`/api/games/${userId}/scores`, {
      method: 'POST',
      body: JSON.stringify(score),
    }),

  getUserScores: (userId: number) =>
    apiRequest(`/api/games/${userId}/scores`, { method: 'GET' }),

  getHighScore: (userId: number, gameName: string) =>
    apiRequest(`/api/games/${userId}/scores/${gameName}`, { method: 'GET' }),

  getLeaderboard: (gameName: string, limit: number = 10) =>
    apiRequest(`/api/games/leaderboard/${gameName}?limit=${limit}`, { method: 'GET' }),
};

// Content API
export const contentApi = {
  getAll: (filters?: {
    content_type?: string;
    language?: string;
    difficulty_level?: string;
  }) => {
    const params = new URLSearchParams();
    if (filters?.content_type) params.append('content_type', filters.content_type);
    if (filters?.language) params.append('language', filters.language);
    if (filters?.difficulty_level) params.append('difficulty_level', filters.difficulty_level);
    
    const queryString = params.toString();
    return apiRequest(`/api/content/${queryString ? `?${queryString}` : ''}`, { method: 'GET' });
  },

  getById: (contentId: number) =>
    apiRequest(`/api/content/${contentId}`, { method: 'GET' }),

  getTypes: () =>
    apiRequest('/api/content/types/list', { method: 'GET' }),
};

// Health check
export const healthCheck = () =>
  apiRequest('/health', { method: 'GET' });
