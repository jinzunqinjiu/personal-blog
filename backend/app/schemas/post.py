from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PostCreateRequest(BaseModel):
    title: str = Field(min_length=2, max_length=200)
    category: str = Field(default="TECHNOLOGY", min_length=2, max_length=50)
    summary: str | None = Field(default=None, max_length=2000)
    content_md: str = Field(min_length=1)


class PostAuthorPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nickname: str
    avatar_url: str


class PostPublic(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    author_id: int
    author: PostAuthorPublic
    title: str
    slug: str
    category: str
    summary: str | None
    content_md: str
    published_at: datetime
