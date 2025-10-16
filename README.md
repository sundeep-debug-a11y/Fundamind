# ProspEra Mobile App Design System

This is a code bundle for ProspEra Mobile App Design System. The original project is available at https://www.figma.com/design/l8EhVVZUUw8ofzZ2F7Iszl/ProspEra-Mobile-App-Design-System.

## Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **TailwindCSS** - Styling
- **Radix UI** - Component library
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework
- **PostgreSQL** - Database
- **SQLAlchemy** - ORM
- **Uvicorn** - ASGI server

## Running the Frontend

```bash
# Install dependencies
npm i

# Start development server
npm run dev
```

The frontend will be available at http://localhost:5173

## Running the Backend

See detailed instructions in [backend/README.md](backend/README.md)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up .env file with database credentials
cp .env.example .env

# Run the server
uvicorn app.main:app --reload --port 8000
```

The backend API will be available at:
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

## Database Setup

1. Install PostgreSQL
2. Create database: `CREATE DATABASE prospera_db;`
3. Update `backend/.env` with your database credentials
4. The tables will be created automatically when you run the backend