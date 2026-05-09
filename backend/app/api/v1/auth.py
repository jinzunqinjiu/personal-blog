from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from jose import JWTError
from sqlalchemy.orm import Session

from app.api.cookies_auth import clear_refresh_cookie, set_refresh_cookie
from app.core.config import settings
from app.core.database import get_db
from app.core.security import (
    create_access_token,
    create_refresh_token,
    decode_refresh_subject,
)
from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest, TokenResponse
from app.services.auth_service import login_user, register_user

router = APIRouter(prefix="/auth", tags=["auth"])


def _issue_tokens(response: Response, user: User) -> TokenResponse:
    access = create_access_token(subject=str(user.id))
    refresh = create_refresh_token(subject=str(user.id))
    set_refresh_cookie(response, refresh)
    return TokenResponse(access_token=access, user=user)


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(
    payload: RegisterRequest,
    response: Response,
    db: Session = Depends(get_db),
) -> TokenResponse:
    user = register_user(db, payload)
    return _issue_tokens(response, user)


@router.post("/login", response_model=TokenResponse)
def login(
    payload: LoginRequest,
    response: Response,
    db: Session = Depends(get_db),
) -> TokenResponse:
    _, user = login_user(db, payload)
    return _issue_tokens(response, user)


@router.post("/refresh", response_model=TokenResponse)
def refresh_tokens(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
) -> TokenResponse:
    raw = request.cookies.get(settings.refresh_cookie_name)
    if not raw or not raw.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="刷新令牌无效或已过期，请重新登录",
        )
    try:
        sub = decode_refresh_subject(raw.strip())
        user_id = int(sub)
    except (JWTError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="刷新令牌无效或已过期，请重新登录",
        )
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="刷新令牌无效或已过期，请重新登录",
        )
    return _issue_tokens(response, user)


@router.post("/logout")
def logout(response: Response) -> dict[str, bool]:
    clear_refresh_cookie(response)
    return {"ok": True}
