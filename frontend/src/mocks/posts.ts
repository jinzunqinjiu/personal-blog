import type { BlogPostPreview } from '../types/post.ts'

export const mockPosts: BlogPostPreview[] = [
  {
    id: '1',
    slug: 'kyoto-morning',
    category: 'LIFE',
    title: '京都的清晨与那些被遗忘的瞬间',
    accentTitle: true,
    summary:
      '晨光从窄巷漫进来时，整座城市像在呼吸。那些稍纵即逝的瞬间，往往比刻意的风景更值得被记住。',
    publishedAt: '2024-04-15T08:00:00.000Z',
    readingMinutes: 8,
    likeCount: 42,
    favoriteCount: 12,
  },
  {
    id: '2',
    slug: 'frontend-sensory-future',
    category: 'TECHNOLOGY',
    title: '未来前端开发的感官体验',
    summary:
      '当界面不再只是点击率与转化率，触感、节律与留白同样构成体验。技术是手段，对人的感知才是真题目。',
    publishedAt: '2024-04-08T12:30:00.000Z',
    readingMinutes: 12,
    likeCount: 27,
    favoriteCount: 9,
  },
  {
    id: '3',
    slug: 'vite-react-blog-frontend',
    category: 'TECHNOLOGY',
    title: '用 Vite + React 搭个人博客前台',
    accentTitle: true,
    summary:
      '从路由、布局到列表数据结构的一点约定，方便日后接入真实数据源而不改组件形状。',
    publishedAt: '2026-05-01T08:00:00.000Z',
    readingMinutes: 8,
    likeCount: 31,
    favoriteCount: 15,
  },
  {
    id: '4',
    slug: 'tailwind-design-tokens',
    category: 'DESIGN',
    title: '在样式里养好一套变量',
    summary:
      '色彩与字重尽量落在 CSS 变量上，正文与次级信息层次分明，改版时就不必全局搜颜色。',
    publishedAt: '2026-04-18T10:30:00.000Z',
    readingMinutes: 5,
    likeCount: 19,
    favoriteCount: 6,
  },
]

export function getPostBySlug(slug: string): BlogPostPreview | undefined {
  return mockPosts.find((p) => p.slug === slug)
}
