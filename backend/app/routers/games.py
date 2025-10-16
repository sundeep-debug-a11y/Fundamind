from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models import GameScore, User, UserProgress
from app.schemas import GameScoreCreate, GameScoreResponse

router = APIRouter()


@router.post("/{user_id}/scores", response_model=GameScoreResponse, status_code=status.HTTP_201_CREATED)
def submit_game_score(user_id: int, game_score: GameScoreCreate, db: Session = Depends(get_db)):
    """Submit a game score for a user"""
    # Check if user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    # Create game score
    db_game_score = GameScore(**game_score.model_dump(), user_id=user_id)
    db.add(db_game_score)
    
    # Update user progress with coins
    progress = db.query(UserProgress).filter(UserProgress.user_id == user_id).first()
    if progress:
        progress.coins += game_score.coins_earned
        progress.xp += game_score.score
    
    db.commit()
    db.refresh(db_game_score)
    return db_game_score


@router.get("/{user_id}/scores", response_model=List[GameScoreResponse])
def get_user_game_scores(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all game scores for a user"""
    scores = db.query(GameScore).filter(
        GameScore.user_id == user_id
    ).order_by(GameScore.created_at.desc()).offset(skip).limit(limit).all()
    return scores


@router.get("/{user_id}/scores/{game_name}")
def get_game_high_score(user_id: int, game_name: str, db: Session = Depends(get_db)):
    """Get high score for a specific game"""
    high_score = db.query(GameScore).filter(
        GameScore.user_id == user_id,
        GameScore.game_name == game_name
    ).order_by(GameScore.score.desc()).first()
    
    if not high_score:
        return {"game_name": game_name, "high_score": 0, "message": "No scores found"}
    
    return {
        "game_name": game_name,
        "high_score": high_score.score,
        "coins_earned": high_score.coins_earned,
        "achieved_at": high_score.created_at
    }


@router.get("/leaderboard/{game_name}")
def get_game_leaderboard(game_name: str, limit: int = 10, db: Session = Depends(get_db)):
    """Get leaderboard for a specific game"""
    leaderboard = db.query(GameScore, User).join(User).filter(
        GameScore.game_name == game_name
    ).order_by(GameScore.score.desc()).limit(limit).all()
    
    return [
        {
            "rank": idx + 1,
            "user_name": user.name or user.phone_number,
            "score": score.score,
            "achieved_at": score.created_at
        }
        for idx, (score, user) in enumerate(leaderboard)
    ]
