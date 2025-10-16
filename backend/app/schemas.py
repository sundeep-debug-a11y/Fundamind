from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# User Schemas
class UserBase(BaseModel):
    phone_number: str
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    language: str = "en"


class UserCreate(UserBase):
    pass


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    language: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# User Progress Schemas
class UserProgressResponse(BaseModel):
    id: int
    user_id: int
    coins: int
    level: int
    xp: int
    streak_days: int
    last_activity: datetime

    class Config:
        from_attributes = True


# Transaction Schemas
class TransactionBase(BaseModel):
    amount: float
    category: str
    description: Optional[str] = None
    transaction_type: str  # income or expense


class TransactionCreate(TransactionBase):
    pass


class TransactionResponse(TransactionBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Game Score Schemas
class GameScoreCreate(BaseModel):
    game_name: str
    score: int
    coins_earned: int = 0


class GameScoreResponse(GameScoreCreate):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Financial Content Schemas
class FinancialContentResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    content_type: str
    language: str
    difficulty_level: str
    duration_minutes: Optional[int]
    thumbnail_url: Optional[str]
    content_url: Optional[str]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True
