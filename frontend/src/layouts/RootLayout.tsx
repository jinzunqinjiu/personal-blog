import { NavLink, Outlet, Link as RouterLink } from 'react-router-dom'

import HeaderAccountButton from '../components/HeaderAccountButton.tsx'
import ThemeToggleButton from '../components/ThemeToggleButton.tsx'
import { UI_TEXT } from '../config/uiText.ts'

function navLinkClass({ isActive }: { isActive: boolean }) {
  return [
    'text-sm font-medium tracking-wide no-underline transition-colors hover:text-[var(--accent)]',
    isActive ? 'text-[var(--accent)]' : 'text-[var(--text)]',
  ].join(' ')
}

export default function RootLayout() {
  return (
    <div className="flex min-h-svh min-h-[100dvh] flex-1 flex-col">
      <header
        className="fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)]"
        style={{
          borderColor: 'var(--line)',
          color: 'var(--text)',
          backgroundColor: 'var(--header-bg)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="page-shell flex min-h-[3.25rem] items-center justify-between gap-4 px-6 py-3 md:min-h-[3.5rem] md:px-8 md:py-3.5">
          <RouterLink
            to="/"
            className="font-serif-blog text-xl font-bold tracking-[0.04em] no-underline md:text-[1.35rem]"
            style={{ color: 'var(--text-heading)' }}
          >
            {UI_TEXT.brand.brandTitle}
          </RouterLink>
          <nav
            className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2"
            aria-label="主导航"
          >
            <NavLink to="/" end className={navLinkClass}>
              首页
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              撰写
            </NavLink>
            <ThemeToggleButton />
            <HeaderAccountButton />
          </nav>
        </div>
      </header>

      <main className="flex flex-1 flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(5.25rem+env(safe-area-inset-top))] md:px-8 md:pt-[calc(5.75rem+env(safe-area-inset-top))] lg:pt-[calc(6rem+env(safe-area-inset-top))]">
        <Outlet />
      </main>
    </div>
  )
}
