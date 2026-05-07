import { PostTitleList } from '../components/PostTitleList.tsx'
import { useTheme } from '../contexts/ThemeContext.tsx'
import { mockPosts } from '../mocks/posts.ts'

export default function HomePage() {
  const { theme } = useTheme()
  const isDark = theme === 'luxury-dark'

  return (
    <div className="page-shell flex w-full flex-1 flex-col">
      <header className="mb-10 max-w-none md:mb-12 lg:mb-14">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] md:text-xs">
          {isDark ? 'Premium Journaling' : 'Sense the world'}
        </p>
        <h1 className="hero-title mt-4 md:mt-5">记录思考的温度。</h1>
        <p className="mt-5 font-serif-blog text-lg italic text-[var(--text-muted)] md:mt-6 md:text-xl">
          “在极简中，发现繁花似锦。”
        </p>
        <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-[var(--text)] md:mt-6 md:text-base">
          下面是最新条目，节选与正文长度以后可由 Markdown 或 CMS 决定。
        </p>
      </header>

      <PostTitleList posts={mockPosts} className="w-full flex-1" />
    </div>
  )
}
