from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.post import PostCreateRequest, PostPublic
from app.services.post_service import create_post, get_post_by_slug, list_posts

router = APIRouter(prefix="/posts", tags=["posts"])


@router.get("", response_model=list[PostPublic])
def get_posts(db: Session = Depends(get_db)) -> list[PostPublic]:
    return list_posts(db)


@router.get("/{slug}", response_model=PostPublic)
def get_post(slug: str, db: Session = Depends(get_db)) -> PostPublic:
    return get_post_by_slug(db, slug)


@router.post("", response_model=PostPublic, status_code=status.HTTP_201_CREATED)
def publish_post(
    payload: PostCreateRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> PostPublic:
    return create_post(db, current_user, payload)
