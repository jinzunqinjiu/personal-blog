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

    # 逗号分隔，例如: https://blog.example.com,http://localhost
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"


settings = Settings()

