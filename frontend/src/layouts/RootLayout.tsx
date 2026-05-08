import { NavLink, Outlet, Link as RouterLink } from 'react-router-dom'

import BrandLogo from '../components/BrandLogo.tsx'
import HeaderAccountButton from '../components/HeaderAccountButton.tsx'
import ThemeToggleButton from '../components/ThemeToggleButton.tsx'

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
        <div className="flex min-h-[4.8rem] w-full items-center justify-between gap-4 px-8 py-3 md:min-h-[5rem] md:px-10 md:py-3.5">
          <RouterLink
            to="/"
            className="no-underline"
            style={{ color: 'var(--text-heading)' }}
          >
            <BrandLogo />
          </RouterLink>
          <nav
            className="flex flex-wrap items-center justify-end gap-x-7 gap-y-2"
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

      <main className="flex flex-1 flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-[calc(5.8rem+env(safe-area-inset-top))] md:pt-[calc(6.2rem+env(safe-area-inset-top))] lg:pt-[calc(6.4rem+env(safe-area-inset-top))]">
        <Outlet />
      </main>
    </div>
  )
}
