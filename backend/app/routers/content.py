from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models import FinancialContent
from app.schemas import FinancialContentResponse

router = APIRouter()


@router.get("/", response_model=List[FinancialContentResponse])
def get_content(
    content_type: Optional[str] = None,
    language: Optional[str] = None,
    difficulty_level: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get financial content with optional filters"""
    query = db.query(FinancialContent).filter(FinancialContent.is_active == True)
    
    if content_type:
        query = query.filter(FinancialContent.content_type == content_type)
    if language:
        query = query.filter(FinancialContent.language == language)
    if difficulty_level:
        query = query.filter(FinancialContent.difficulty_level == difficulty_level)
    
    content = query.order_by(FinancialContent.created_at.desc()).offset(skip).limit(limit).all()
    return content


@router.get("/{content_id}", response_model=FinancialContentResponse)
def get_content_by_id(content_id: int, db: Session = Depends(get_db)):
    """Get specific financial content by ID"""
    content = db.query(FinancialContent).filter(
        FinancialContent.id == content_id,
        FinancialContent.is_active == True
    ).first()
    
    if not content:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Content not found"
        )
    
    return content


@router.get("/types/list")
def get_content_types(db: Session = Depends(get_db)):
    """Get list of available content types"""
    return {
        "content_types": ["video", "article", "quiz"],
        "languages": ["en", "hi", "ta", "te", "bn"],
        "difficulty_levels": ["beginner", "intermediate", "advanced"]
    }
