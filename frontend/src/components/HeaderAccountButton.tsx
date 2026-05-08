import { useState } from 'react'

import { useAuth } from '../contexts/AuthContext.tsx'
import { useTheme } from '../contexts/ThemeContext.tsx'
import UserCenterDrawer from './UserCenterDrawer.tsx'

/** 导航栏：未登录显示 LOGIN（悬停变黑底白字）；已登录显示 ACCOUNT 黑胶囊，点击打开个人中心 */
export default function HeaderAccountButton() {
  const { isLoggedIn } = useAuth()
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const isDark = theme === 'luxury-dark'

  const label = isLoggedIn ? 'Account' : 'Login'

  const base =
    'inline-flex h-7 items-center justify-center rounded-full px-2.5 text-[0.56rem] leading-none font-semibold uppercase tracking-[0.1em] transition-colors'

  const loginStyles = isDark
    ? 'border border-[var(--gold)]/70 bg-transparent text-[var(--gold)] hover:bg-[var(--gold)]/20 hover:!text-[var(--gold)]'
    : 'border border-neutral-300 bg-transparent text-neutral-800 hover:bg-neutral-950 hover:!text-white'

  const accountStyles = isDark
    ? 'border border-[var(--gold)] bg-transparent text-[var(--gold)] hover:bg-[var(--gold)]/20 hover:!text-[var(--gold)]'
    : 'border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-950 hover:!text-white'

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`${base} ${isLoggedIn ? accountStyles : loginStyles}`}
      >
        {label}
      </button>
      <UserCenterDrawer open={open} onClose={() => setOpen(false)} />
    </>
  )
}
