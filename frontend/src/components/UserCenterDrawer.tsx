import { Avatar, Badge, Divider, Drawer, Tooltip, message } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { login as loginRequest, register as registerRequest } from '../api/auth.ts'
import { getApiErrorMessage } from '../api/http.ts'
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
  const { isLoggedIn, user, loginWithSession, logout } = useAuth()
  const { theme } = useTheme()
  const isDark = theme === 'luxury-dark'
  const [mode, setMode] = useState<AuthMode>('login')

  const favorites = slugListTitles([...MOCK_FAVORITE_SLUGS])
  const recent = slugListTitles([...MOCK_RECENT_SLUGS])

  async function submitAuth(values: {
    nickname?: string
    email: string
    password: string
  }) {
    try {
      if (mode === 'register') {
        if (!values.nickname?.trim()) {
          message.error('请输入昵称')
          return
        }
        const data = await registerRequest({
          nickname: values.nickname.trim(),
          email: values.email.trim(),
          password: values.password,
        })
        loginWithSession(data)
        message.success('注册成功')
      } else {
        const data = await loginRequest({
          email: values.email.trim(),
          password: values.password,
        })
        loginWithSession(data)
        message.success('登录成功')
      }
      setMode('login')
      onClose()
    } catch (err) {
      message.error(getApiErrorMessage(err))
    }
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
              src={user?.avatar_url}
              className={isDark ? '!bg-[#d3b24f] !text-[#151515]' : '!bg-neutral-100 !text-neutral-400'}
            >
              {(user?.nickname ?? 'U').slice(0, 1).toUpperCase()}
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <p
                  className="font-serif-blog text-[1.5rem] leading-none"
                  style={{ color: isDark ? '#f2efe8' : '#171717' }}
                >
                  {user?.nickname ?? UI_TEXT.drawer.guestName}
                </p>
                {user?.is_vip ? (
                  <Tooltip title="尊贵的内测玩家">
                    <span
                    className="inline-flex h-6 items-center gap-1.5 rounded-full border px-2"
                    style={{
                      borderColor: isDark ? 'rgba(226, 200, 117, 0.58)' : 'rgba(23, 23, 23, 0.22)',
                      backgroundColor: isDark
                        ? 'linear-gradient(135deg, rgba(226, 200, 117, 0.2), rgba(86, 64, 24, 0.25))'
                        : 'linear-gradient(135deg, rgba(26, 26, 26, 0.08), rgba(26, 26, 26, 0.04))',
                      boxShadow: isDark
                        ? '0 0 10px rgba(226,200,117,0.2), inset 0 0 8px rgba(226,200,117,0.14)'
                        : '0 0 8px rgba(23,23,23,0.12)',
                    }}
                    aria-label="尊贵的内测玩家"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <linearGradient id="vipCrownGradient" x1="4" y1="6" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor={isDark ? '#fff4cf' : '#3a3a3a'}>
                            <animate attributeName="offset" values="0;0.15;0" dur="2.6s" repeatCount="indefinite" />
                          </stop>
                          <stop offset="55%" stopColor={isDark ? '#e2c875' : '#111111'} />
                          <stop offset="100%" stopColor={isDark ? '#a6802f' : '#555555'}>
                            <animate attributeName="offset" values="1;0.85;1" dur="2.6s" repeatCount="indefinite" />
                          </stop>
                        </linearGradient>
                      </defs>
                      <circle
                        cx="14"
                        cy="14"
                        r="11.2"
                        stroke={isDark ? 'rgba(255,236,180,0.5)' : 'rgba(23,23,23,0.22)'}
                        strokeWidth="1.1"
                        strokeDasharray="4 4"
                      >
                        <animateTransform
                          attributeName="transform"
                          type="rotate"
                          from="0 14 14"
                          to="360 14 14"
                          dur="7s"
                          repeatCount="indefinite"
                        />
                      </circle>
                      <path
                        d="M6.2 10.3L10.1 13.4L14 7.4L17.9 13.4L21.8 10.3L18.8 20.1H9.2L6.2 10.3Z"
                        fill="url(#vipCrownGradient)"
                      />
                      <path
                        d="M10.1 13.4L14 7.4L17.9 13.4"
                        stroke={isDark ? '#fff6d7' : '#f8f8f8'}
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="14" cy="14.2" r="1.35" fill={isDark ? '#fff2c5' : '#fafafa'}>
                        <animate
                          attributeName="r"
                          values="1;1.7;1"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="1;0.55;1"
                          dur="1.8s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    </svg>
                    <span
                      className="text-[10px] font-semibold tracking-[0.14em]"
                      style={{ color: isDark ? '#f0db9a' : '#171717' }}
                    >
                      VIP
                    </span>
                    </span>
                  </Tooltip>
                ) : null}
              </div>
              <p className="mt-2 text-xs tracking-[0.08em]" style={{ color: isDark ? '#8f8a7a' : '#a3a3a3' }}>
                {user?.email ?? `ID · ${user?.id ?? '—'}`}
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
