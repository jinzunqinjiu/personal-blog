import re
import secrets

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.models.post import Post
from app.models.user import User
from app.schemas.post import PostCreateRequest


def _slugify(text: str) -> str:
    normalized = re.sub(r"[^a-zA-Z0-9\u4e00-\u9fff]+", "-", text.strip().lower())
    normalized = re.sub(r"-{2,}", "-", normalized).strip("-")
    return normalized or "post"


def _ensure_unique_slug(db: Session, base_slug: str) -> str:
    candidate = base_slug
    while db.scalar(select(Post.id).where(Post.slug == candidate)):
        candidate = f"{base_slug}-{secrets.token_hex(2)}"
    return candidate


def create_post(db: Session, author: User, payload: PostCreateRequest) -> Post:
    base_slug = _slugify(payload.title)
    slug = _ensure_unique_slug(db, base_slug)
    post = Post(
        author_id=author.id,
        title=payload.title.strip(),
        slug=slug,
        category=payload.category.strip().upper(),
        summary=payload.summary.strip() if payload.summary else None,
        content_md=payload.content_md.strip(),
    )
    db.add(post)
    db.commit()
    db.refresh(post)
    stmt = select(Post).options(joinedload(Post.author)).where(Post.id == post.id)
    return db.scalars(stmt).unique().one()


def list_posts(db: Session) -> list[Post]:
    stmt = (
        select(Post)
        .options(joinedload(Post.author))
        .order_by(Post.published_at.desc())
    )
    return list(db.scalars(stmt).unique().all())


def get_post_by_slug(db: Session, slug: str) -> Post:
    post = db.scalar(
        select(Post).options(joinedload(Post.author)).where(Post.slug == slug)
    )
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="文章不存在")
    return post
