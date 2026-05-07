import { Avatar, Badge, Divider, Drawer } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext.tsx'
import { UI_TEXT } from '../config/uiText.ts'
import { useTheme } from '../contexts/ThemeContext.tsx'
import AuthDrawerForm, { type AuthMode } from './AuthDrawerForm.tsx'
import { getPostBySlug } from '../mocks/posts.ts'
import { MOCK_FAVORITE_SLUGS, MOCK_RECENT_SLUGS } from '../mocks/userLibrary.ts'

type Props = {
  open: boolean
  onClose: () => void
}

function slugListTitles(slugs: readonly string[]) {
  return slugs
    .map((slug) => {
      const p = getPostBySlug(slug)
      return p ? { slug, title: p.title } : null
    })
    .filter(Boolean) as { slug: string; title: string }[]
}

export default function UserCenterDrawer({ open, onClose }: Props) {
  const { isLoggedIn, login, logout } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'luxury-dark'
  const [mode, setMode] = useState<AuthMode>('login')

  const favorites = slugListTitles([...MOCK_FAVORITE_SLUGS])
  const recent = slugListTitles([...MOCK_RECENT_SLUGS])

  function submitAuth() {
    // 当前阶段先走 mock 登录流程，后续可替换为真实接口
    login()
    setMode('login')
    onClose()
  }

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={
        <span
          className="text-sm font-normal tracking-[0.08em]"
          style={{ color: isDark ? '#8f8a7a' : '#a3a3a3' }}
        >
          {isDark
            ? UI_TEXT.drawer.personalSpaceTitle
            : UI_TEXT.drawer.personalCenterTitle}
        </span>
      }
      placement="right"
      size={460}
      mask={{ closable: true }}
      destroyOnClose
      styles={{
        mask: {
          backgroundColor: isDark ? 'rgba(3, 3, 4, 0.58)' : 'rgba(10, 10, 10, 0.22)',
          backdropFilter: isDark ? 'blur(10px)' : 'blur(8px)',
          WebkitBackdropFilter: isDark ? 'blur(10px)' : 'blur(8px)',
        },
        section: {
          backgroundColor: isDark
            ? 'color-mix(in srgb, #080808 95%, transparent)'
            : 'color-mix(in srgb, var(--bg) 86%, transparent)',
          backdropFilter: isDark ? 'blur(28px) saturate(145%)' : 'blur(22px) saturate(165%)',
          WebkitBackdropFilter: isDark
            ? 'blur(28px) saturate(145%)'
            : 'blur(22px) saturate(165%)',
          borderLeft: isDark
            ? '1px solid rgba(200, 162, 74, 0.35)'
            : '1px solid rgb(229 229 229 / 0.9)',
        },
        body: {
          padding: '0 30px 30px',
        },
        header: isDark
          ? {
              borderBottom: '1px solid rgba(200, 162, 74, 0.28)',
            }
          : undefined,
      }}
    >
      {!isLoggedIn ? (
        <AuthDrawerForm mode={mode} onModeChange={setMode} onSubmit={submitAuth} />
      ) : (
        <div className="flex min-h-[calc(100svh-170px)] flex-col text-left">
          <section
            className="flex min-h-[7.5rem] items-center gap-4 border-b py-5"
            style={{
              borderColor: isDark ? 'rgba(200, 162, 74, 0.26)' : 'rgb(229 229 229)',
            }}
          >
            <Avatar
              size={52}
              className={isDark ? '!bg-[#d3b24f] !text-[#151515]' : '!bg-neutral-100 !text-neutral-400'}
            >
              {isDark ? 'M' : '👤'}
            </Avatar>
            <div>
              <p
                className="font-serif-blog text-[1.5rem] leading-none"
                style={{ color: isDark ? '#f2efe8' : '#171717' }}
              >
                {isDark ? UI_TEXT.drawer.memberName : UI_TEXT.drawer.guestName}
              </p>
              <p className="mt-2 text-xs tracking-[0.08em]" style={{ color: isDark ? '#8f8a7a' : '#a3a3a3' }}>
                {isDark ? UI_TEXT.drawer.memberTagline : UI_TEXT.drawer.guestId}
              </p>
            </div>
          </section>
          <div className="mt-10 space-y-10">
            <section>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: isDark ? '#c7c2b3' : '#a3a3a3' }}>
                  {UI_TEXT.drawer.favoritesTitle}
                </h3>
                <Badge
                  count={favorites.length}
                  color={isDark ? '#6b5a2d' : '#f3f4f6'}
                  className={isDark ? 'text-[#f2e2ad]' : 'text-neutral-500'}
                />
              </div>
              <ul
                className="mt-4 space-y-2 border-t pt-4"
                style={{ borderColor: isDark ? 'rgba(200, 162, 74, 0.26)' : 'transparent' }}
              >
                {favorites.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/posts/${item.slug}`}
                      onClick={onClose}
                      className="block rounded-md px-1 py-1.5 text-sm leading-snug transition-colors hover:text-[var(--accent)]"
                      style={{ color: isDark ? '#d8d3c6' : '#404040' }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              {favorites.length === 0 ? (
                <p className="mt-4 text-[1rem]" style={{ color: isDark ? '#8f8a7a' : '#d4d4d4' }}>
                  {UI_TEXT.drawer.emptyFavorites}
                </p>
              ) : null}
            </section>
            <section>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: isDark ? '#c7c2b3' : '#a3a3a3' }}>
                  {UI_TEXT.drawer.recentTitle}
                </h3>
                <Badge
                  count={recent.length}
                  color={isDark ? '#6b5a2d' : '#f3f4f6'}
                  className={isDark ? 'text-[#f2e2ad]' : 'text-neutral-500'}
                />
              </div>
              <ul
                className="mt-4 space-y-2 border-t pt-4"
                style={{ borderColor: isDark ? 'rgba(200, 162, 74, 0.26)' : 'transparent' }}
              >
                {recent.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to={`/posts/${item.slug}`}
                      onClick={onClose}
                      className="block rounded-md px-1 py-1.5 text-sm leading-snug transition-colors hover:text-[var(--accent)]"
                      style={{ color: isDark ? '#d8d3c6' : '#404040' }}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="mt-auto pt-10">
            <Divider
              className="!my-0"
              style={{ borderColor: isDark ? 'rgba(200, 162, 74, 0.26)' : undefined }}
            />
            <button
              type="button"
              className="mt-6 w-full rounded-2xl border px-4 py-3 text-xs font-semibold tracking-[0.15em] uppercase transition-colors hover:opacity-90"
              style={{
                borderColor: isDark ? 'rgba(128, 42, 52, 0.55)' : 'transparent',
                color: isDark ? '#d66f75' : '#f87171',
                background: isDark ? 'rgba(60, 18, 24, 0.28)' : 'transparent',
              }}
              onClick={() => {
                logout()
                onClose()
              }}
            >
              {UI_TEXT.drawer.logout}
            </button>
          </div>
        </div>
      )}
    </Drawer>
  )
}
