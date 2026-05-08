from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.router import api_router
from app.core.config import settings
from app.core.database import Base, engine

app = FastAPI(title=settings.app_name, version=settings.app_version)
_cors_list = [o.strip() for o in settings.cors_origins.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_list,
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