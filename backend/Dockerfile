# FastAPI 后端（生产入口：迁移 + uvicorn）
FROM python:3.11-slim-bookworm

WORKDIR /app

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=1

COPY requirements.txt .
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt "alembic==1.16.5"

COPY . .

EXPOSE 8000

# 先执行迁移再启动（数据库需已就绪，见 docker-compose healthcheck）
CMD ["sh", "-c", "alembic upgrade head && uvicorn main:app --host 0.0.0.0 --port 8000"]
