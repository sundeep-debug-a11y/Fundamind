# Frontend-Backend Connection Guide

## ✅ Connection Setup Complete

Your React frontend is now connected to the FastAPI backend!

## Configuration Files

### Frontend Environment (`.env`)
```env
VITE_API_URL=http://localhost:8000
```

### Backend Environment (`backend/.env`)
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/prospera_db
SECRET_KEY=prospera-secret-key-change-this-in-production-abc123xyz789
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
FRONTEND_URL=http://localhost:5173
```

## API Client

The API client is located at `src/api/client.ts` and provides functions for:

### User API
- `userApi.create()` - Create new user
- `userApi.getById()` - Get user by ID
- `userApi.update()` - Update user info
- `userApi.getProgress()` - Get user progress (coins, XP, level)
- `userApi.addCoins()` - Add coins to user

### Transaction API
- `transactionApi.create()` - Create transaction
- `transactionApi.getByUser()` - Get user transactions
- `transactionApi.getSummary()` - Get financial summary
- `transactionApi.delete()` - Delete transaction

### Game API
- `gameApi.submitScore()` - Submit game score
- `gameApi.getUserScores()` - Get user's game history
- `gameApi.getHighScore()` - Get high score for specific game
- `gameApi.getLeaderboard()` - Get game leaderboard

### Content API
- `contentApi.getAll()` - Get all financial content (with filters)
- `contentApi.getById()` - Get specific content
- `contentApi.getTypes()` - Get available content types

## React Hooks

### `useUser` Hook
Located at `src/hooks/useUser.ts`

```tsx
import { useUser } from '@/hooks/useUser';

function MyComponent() {
  const { createUser, getUser, getUserProgress, addCoins, loading, error } = useUser();
  
  const handleCreateUser = async () => {
    const user = await createUser({
      phone_number: '+919876543210',
      name: 'John Doe',
      language: 'en'
    });
    
    if (user) {
      console.log('User created:', user);
    }
  };
  
  return (
    <button onClick={handleCreateUser} disabled={loading}>
      {loading ? 'Creating...' : 'Create User'}
    </button>
  );
}
```

### `useApi` Hook
Located at `src/hooks/useApi.ts`

Generic hook for any API call:

```tsx
import { useApi } from '@/hooks/useApi';
import { userApi } from '@/api/client';

function MyComponent() {
  const { data, loading, error, refetch } = useApi(
    () => userApi.getById(1),
    [] // dependencies
  );
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>User: {data?.name}</div>;
}
```

## Testing the Connection

### Option 1: Use the API Test Component

Navigate to the API test screen in your app:
1. Start the frontend: `npm run dev`
2. Open the DemoMenu
3. Select "API Test" screen
4. Test creating users and adding coins

### Option 2: Use Browser DevTools

```javascript
// Open browser console and test API calls
fetch('http://localhost:8000/health')
  .then(r => r.json())
  .then(console.log);
```

### Option 3: Use API Documentation

Visit http://localhost:8000/docs for interactive API documentation where you can test all endpoints.

## Example: Integrating with Existing Components

### Update PhoneAuthScreen to create real users

```tsx
import { useUser } from '@/hooks/useUser';

export function PhoneAuthScreen({ onComplete }: { onComplete: () => void }) {
  const { createUser, loading, error } = useUser();
  
  const handleAuth = async (phoneNumber: string) => {
    const user = await createUser({
      phone_number: phoneNumber,
      language: 'en'
    });
    
    if (user) {
      // Store user ID in localStorage
      localStorage.setItem('userId', user.id.toString());
      onComplete();
    }
  };
  
  // ... rest of component
}
```

### Update HomeDashboard to show real progress

```tsx
import { useEffect, useState } from 'react';
import { userApi } from '@/api/client';

export function HomeDashboard() {
  const [progress, setProgress] = useState(null);
  
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      userApi.getProgress(parseInt(userId)).then(result => {
        if (result.data) {
          setProgress(result.data);
        }
      });
    }
  }, []);
  
  return (
    <div>
      <h1>Coins: {progress?.coins || 0}</h1>
      <h2>Level: {progress?.level || 1}</h2>
    </div>
  );
}
```

### Update Games to save scores

```tsx
import { gameApi } from '@/api/client';

export function BudgetBazaar() {
  const handleGameComplete = async (score: number) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      await gameApi.submitScore(parseInt(userId), {
        game_name: 'budget-bazaar',
        score: score,
        coins_earned: Math.floor(score / 10)
      });
    }
  };
  
  // ... rest of component
}
```

## Running Both Servers

### Terminal 1 - Backend
```bash
cd backend
.\venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8000
```

### Terminal 2 - Frontend
```bash
npm run dev
```

## Troubleshooting

### CORS Errors
- Backend is configured to allow `http://localhost:5173` and `http://localhost:3000`
- Check `backend/app/main.py` CORS settings if using different port

### Connection Refused
- Ensure backend is running on port 8000
- Check `.env` file has correct `VITE_API_URL`

### Database Errors
- Verify PostgreSQL is running
- Check `backend/.env` has correct database credentials
- Ensure `prospera_db` database exists

## Next Steps

1. **Add Authentication** - Implement JWT tokens for secure API access
2. **Add Error Handling** - Create toast notifications for API errors
3. **Add Loading States** - Show spinners during API calls
4. **Cache Data** - Use React Query or SWR for better data management
5. **Add Offline Support** - Store data locally when offline

## API Endpoints Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/api/users/` | Create user |
| GET | `/api/users/{id}` | Get user |
| GET | `/api/users/{id}/progress` | Get user progress |
| POST | `/api/users/{id}/progress/add-coins` | Add coins |
| POST | `/api/transactions/{user_id}` | Create transaction |
| GET | `/api/transactions/{user_id}` | Get transactions |
| POST | `/api/games/{user_id}/scores` | Submit score |
| GET | `/api/games/leaderboard/{game}` | Get leaderboard |
| GET | `/api/content/` | Get content |

Full documentation: http://localhost:8000/docs
