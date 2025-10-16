# Prospera Backend API

FastAPI backend for the Prospera Financial Literacy Application with PostgreSQL database.

## Tech Stack

- **FastAPI** - Modern Python web framework
- **PostgreSQL** - Relational database
- **SQLAlchemy** - ORM for database operations
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Prerequisites

- Python 3.8+
- PostgreSQL 12+
- pip (Python package manager)

## Setup Instructions

### 1. Install PostgreSQL

Download and install PostgreSQL from [postgresql.org](https://www.postgresql.org/download/)

### 2. Create Database

```bash
# Login to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE prospera_db;

# Create user (optional)
CREATE USER prospera_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE prospera_db TO prospera_user;
```

### 3. Set Up Python Environment

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env file with your database credentials
# DATABASE_URL=postgresql://username:password@localhost:5432/prospera_db
```

### 5. Run the Application

```bash
# Make sure you're in the backend directory with venv activated
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at:
- **API**: http://localhost:8000
- **Interactive Docs**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

## API Endpoints

### Users
- `POST /api/users/` - Create new user
- `GET /api/users/{user_id}` - Get user by ID
- `GET /api/users/` - Get all users
- `PUT /api/users/{user_id}` - Update user
- `GET /api/users/{user_id}/progress` - Get user progress
- `POST /api/users/{user_id}/progress/add-coins` - Add coins to user

### Transactions
- `POST /api/transactions/{user_id}` - Create transaction
- `GET /api/transactions/{user_id}` - Get user transactions
- `GET /api/transactions/{user_id}/summary` - Get transaction summary
- `DELETE /api/transactions/{transaction_id}` - Delete transaction

### Games
- `POST /api/games/{user_id}/scores` - Submit game score
- `GET /api/games/{user_id}/scores` - Get user game scores
- `GET /api/games/{user_id}/scores/{game_name}` - Get high score for game
- `GET /api/games/leaderboard/{game_name}` - Get game leaderboard

### Content
- `GET /api/content/` - Get financial content (with filters)
- `GET /api/content/{content_id}` - Get content by ID
- `GET /api/content/types/list` - Get available content types

## Database Models

### User
- User authentication and profile information
- Phone number, name, email, language preferences

### UserProgress
- Tracks user coins, level, XP, and streak days

### Transaction
- Financial transactions (income/expense)
- Category, amount, description

### GameScore
- Game scores and coins earned
- Linked to specific games and users

### FinancialContent
- Educational content (videos, articles, quizzes)
- Multi-language support with difficulty levels

## Development

### Database Migrations

For production, consider using Alembic for database migrations:

```bash
# Initialize Alembic
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Initial migration"

# Apply migration
alembic upgrade head
```

### Testing

```bash
# Install test dependencies
pip install pytest pytest-asyncio httpx

# Run tests
pytest
```

## Production Deployment

1. Set `DEBUG=False` in production
2. Use a production-grade ASGI server (Gunicorn + Uvicorn)
3. Set up proper database backups
4. Use environment variables for sensitive data
5. Enable HTTPS
6. Set up monitoring and logging

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in .env file
- Ensure database exists and user has permissions

### Port Already in Use
- Change port: `uvicorn app.main:app --port 8001`
- Or kill process using port 8000

### Import Errors
- Ensure virtual environment is activated
- Reinstall dependencies: `pip install -r requirements.txt`
