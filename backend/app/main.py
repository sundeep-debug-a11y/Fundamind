from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import users, transactions, games, content

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Prospera API",
    description="Backend API for Prospera Financial Literacy App",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(transactions.router, prefix="/api/transactions", tags=["Transactions"])
app.include_router(games.router, prefix="/api/games", tags=["Games"])
app.include_router(content.router, prefix="/api/content", tags=["Content"])


@app.get("/")
async def root():
    return {
        "message": "Welcome to Prospera API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
