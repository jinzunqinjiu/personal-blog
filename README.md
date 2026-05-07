# personal-blog
个人全栈极简博客

## 一、技术选型
后端 (FastAPI)
核心框架: FastAPI

ORM: SQLAlchemy 2.0 (异步支持)
数据库: PostgreSQL (或 SQLite 开发阶段)
认证: JWT (python-jose) + bcrypt
数据验证: Pydantic v2
迁移工具: Alembic
缓存: Redis (可选，用于点赞/收藏防重复)
异步处理: 原生 async/await


前端 (React)
框架: React 18 + TypeScript (推荐)
状态管理: Zustand 或 React Context
路由: React Router v6
UI库: Ant Design / Tailwind CSS (你图片风格偏极简)
HTTP请求: Axios + React Query (tanstack)
表单: React Hook Form

## 项目目录结构
personal-blog/
├── backend/                    # 后端项目
│   ├── app/
│   │   ├── api/               # API路由层
│   │   │   ├── v1/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── auth.py   # 登录/注册
│   │   │   │   ├── posts.py  # 文章CRUD
│   │   │   │   ├── users.py  # 用户中心
│   │   │   │   └── likes.py  # 点赞收藏
│   │   ├── core/              # 核心配置
│   │   │   ├── config.py      # 环境变量配置
│   │   │   ├── database.py    # 数据库连接
│   │   │   ├── security.py    # JWT/加密
│   │   │   └── dependencies.py # 依赖注入(获取当前用户)
│   │   ├── models/            # SQLAlchemy模型
│   │   │   ├── user.py
│   │   │   ├── post.py
│   │   │   ├── like.py        # 点赞表
│   │   │   └── favorite.py    # 收藏表
│   │   ├── schemas/           # Pydantic模型
│   │   │   ├── user.py
│   │   │   ├── post.py
│   │   │   └── response.py    # 统一响应格式
│   │   ├── services/          # 业务逻辑层
│   │   │   ├── auth_service.py
│   │   │   ├── post_service.py
│   │   │   └── user_service.py
│   │   └── utils/             # 工具函数
│   │       └── redis_client.py
│   ├── migrations/            # Alembic迁移文件
│   ├── tests/                 # 单元测试
│   ├── requirements.txt
│   └── main.py                # 应用入口
│
├── frontend/                   # 前端项目
│   ├── src/
│   │   ├── api/               # API请求封装
│   │   │   ├── client.ts      # axios实例
│   │   │   ├── auth.ts
│   │   │   ├── posts.ts
│   │   │   └── user.ts
│   │   ├── components/        # 通用组件
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── PostCard.tsx   # 文章卡片
│   │   │   └── LikeButton.tsx
│   │   ├── pages/             # 页面组件
│   │   │   ├── Home.tsx       # 主页(文章列表)
│   │   │   ├── PostDetail.tsx # 文章详情
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Profile.tsx    # 个人中心(我的点赞/收藏)
│   │   ├── hooks/             # 自定义Hooks
│   │   │   ├── useAuth.ts
│   │   │   └── useLike.ts
│   │   ├── stores/            # Zustand状态
│   │   │   └── authStore.ts
│   │   ├── types/             # TypeScript类型
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── docker-compose.yml         # 可选: PostgreSQL+Redis容器化


## 数据库设计
-- 用户表
users:
  id (UUID/PK)
  username (unique)
  email (unique)
  hashed_password
  avatar (可选)
  created_at
  updated_at

-- 文章表
posts:
  id (UUID/PK)
  title
  content (富文本/Markdown)
  summary
  cover_image
  category (LIFE/TECH等)
  author_id (FK->users)
  views
  created_at
  updated_at

-- 点赞表 (记录用户对文章的点赞)
likes:
  id (PK)
  user_id (FK->users)
  post_id (FK->posts)
  created_at
  (唯一约束: user_id+post_id)

-- 收藏表 (结构同likes)
favorites:
  user_id, post_id (联合唯一)

## api接口设计
认证模块:
POST   /api/v1/auth/register    # 注册
POST   /api/v1/auth/login       # 登录(返回JWT)
POST   /api/v1/auth/logout      # 登出(前端清除token)
GET    /api/v1/auth/me          # 获取当前用户信息

文章模块:
GET    /api/v1/posts            # 分页获取文章列表(支持分类筛选)
GET    /api/v1/posts/{id}       # 获取文章详情(增加浏览量)
POST   /api/v1/posts            # 发布文章(需认证)
PUT    /api/v1/posts/{id}       # 更新文章(作者本人)
DELETE /api/v1/posts/{id}       # 删除文章

交互模块:
POST   /api/v1/posts/{id}/like      # 点赞
DELETE /api/v1/posts/{id}/like      # 取消点赞
GET    /api/v1/posts/{id}/like/status  # 查询是否点赞

POST   /api/v1/posts/{id}/favorite   # 收藏
DELETE /api/v1/posts/{id}/favorite   # 取消收藏
GET    /api/v1/users/me/favorites    # 我的收藏列表

个人中心:
GET    /api/v1/users/me/profile      # 获取个人资料
PUT    /api/v1/users/me/profile      # 更新资料
GET    /api/v1/users/me/liked-posts  # 我点赞的文章