from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    app_name: str = "Personal Blog API"
    app_version: str = "0.1.0"

    database_url: str = (
        "mysql+pymysql://root:password@127.0.0.1:3306/personal_blog?charset=utf8mb4"
    )

    jwt_secret_key: str = "replace-with-a-strong-secret"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60
    # Refresh token 有效期（分钟），默认 7 天
    jwt_refresh_expire_minutes: int = 60 * 24 * 7

    # Refresh token 仅存 HttpOnly Cookie（path 需覆盖 /auth/*）
    refresh_cookie_name: str = "muse_refresh_token"
    refresh_cookie_path: str = "/api/v1/auth"
    # 生产 HTTPS 建议设为 True（或依赖反向代理头的 forwarded proto）
    cookie_secure: bool = False
    cookie_samesite: Literal["lax", "strict", "none"] = "lax"

    # 逗号分隔，例如: https://blog.example.com,http://localhost
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"


settings = Settings()

