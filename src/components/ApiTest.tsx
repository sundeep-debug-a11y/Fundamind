import { useState, useEffect } from 'react';
import { healthCheck } from '@/api/client';
import { useUser } from '@/hooks/useUser';

export function ApiTest() {
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [userProgress, setUserProgress] = useState<any>(null);
  const { createUser, getUserProgress, addCoins, loading, error } = useUser();

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    const result = await healthCheck();
    if (result.data) {
      setApiStatus('connected');
    } else {
      setApiStatus('error');
    }
  };

  const handleCreateTestUser = async () => {
    const user = await createUser({
      phone_number: '+919876543210',
      name: 'Test User',
      language: 'en',
    });
    
    if (user) {
      alert(`User created! ID: ${user.id}`);
      // Fetch progress
      const progress = await getUserProgress(user.id);
      setUserProgress(progress);
    }
  };

  const handleAddCoins = async () => {
    if (userProgress) {
      await addCoins(userProgress.user_id, 100);
      const updatedProgress = await getUserProgress(userProgress.user_id);
      setUserProgress(updatedProgress);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Backend Connection Test</h2>
        
        {/* Connection Status */}
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            apiStatus === 'connected' ? 'bg-green-500' : 
            apiStatus === 'error' ? 'bg-red-500' : 'bg-yellow-500'
          }`} />
          <span className="font-medium">
            {apiStatus === 'connected' ? '✓ Connected to Backend' : 
             apiStatus === 'error' ? '✗ Connection Failed' : 'Checking...'}
          </span>
        </div>

        {apiStatus === 'connected' && (
          <>
            <div className="border-t pt-4 space-y-3">
              <button
                onClick={handleCreateTestUser}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Test User'}
              </button>

              {userProgress && (
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h3 className="font-semibold text-gray-700">User Progress</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600">Coins:</span>
                      <span className="ml-2 font-bold text-yellow-600">{userProgress.coins}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Level:</span>
                      <span className="ml-2 font-bold text-purple-600">{userProgress.level}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">XP:</span>
                      <span className="ml-2 font-bold text-green-600">{userProgress.xp}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Streak:</span>
                      <span className="ml-2 font-bold text-orange-600">{userProgress.streak_days} days</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAddCoins}
                    disabled={loading}
                    className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50"
                  >
                    {loading ? 'Adding...' : 'Add 100 Coins'}
                  </button>
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                <strong>API Docs:</strong>{' '}
                <a 
                  href="http://localhost:8000/docs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  http://localhost:8000/docs
                </a>
              </p>
            </div>
          </>
        )}

        {apiStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <p className="font-medium">Cannot connect to backend</p>
            <p className="text-sm mt-1">Make sure the backend is running on http://localhost:8000</p>
          </div>
        )}
      </div>
    </div>
  );
}
