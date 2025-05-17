import os
from typing import Any, Dict, List, Optional, Union

from pydantic import AnyHttpUrl, BaseSettings, PostgresDsn, validator


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = "YOUR_SECRET_KEY_HERE"  # В реальном проекте использовать безопасный ключ
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 дней
    
    # CORS настройки
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    # Настройки PostgreSQL
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
    POSTGRES_PORT: str = os.getenv("POSTGRES_PORT", "5432")
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "furniture_user")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "furniture_password")
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "furniture_store")
    
    # Настройки JWT
    JWT_SECRET: str = os.getenv("JWT_SECRET", "YOUR_JWT_SECRET_KEY_HERE")  # В реальном проекте использовать безопасный ключ
    JWT_ALGORITHM: str = "HS256"
    
    # Настройки для загрузки файлов
    UPLOAD_FOLDER: str = "uploads"
    MAX_CONTENT_LENGTH: int = 16 * 1024 * 1024  # 16 MB
    
    class Config:
        case_sensitive = True


settings = Settings()
