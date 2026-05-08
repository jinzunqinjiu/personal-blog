from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.security import create_access_token, get_password_hash, verify_password
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest


def register_user(db: Session, payload: RegisterRequest) -> User:
    exists_stmt = select(User).where(User.email == payload.email)
    exists_user = db.scalar(exists_stmt)
    if exists_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="该邮箱已被注册"
        )

    user = User(
        nickname=payload.nickname.strip(),
        email=payload.email.lower(),
        hashed_password=get_password_hash(payload.password),
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def login_user(db: Session, payload: LoginRequest) -> tuple[str, User]:
    user_stmt = select(User).where(User.email == payload.email.lower())
    user = db.scalar(user_stmt)
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="邮箱或密码错误"
        )

    token = create_access_token(subject=str(user.id))
    return token, user

