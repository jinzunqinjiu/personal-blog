from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.database import Base, engine

app = FastAPI(title=settings.app_name, version=settings.app_version)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api_router)


@app.get("/")
def read_root():
    return {"message": "Personal Blog API is running"}


@app.get("/healthz")
def healthz():
    return {"status": "ok"}


@app.on_event("startup")
def on_startup() -> None:
    # 开发阶段先自动建表，后续可完全交给 Alembic 迁移。
    Base.metadata.create_all(bind=engine)