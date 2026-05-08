import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { clearAuthStorage, getStoredToken, getStoredUser, persistAuth } from '../api/tokenStorage.ts'
import type { TokenResponse, UserPublic } from '../types/authApi.ts'

/* eslint-disable react-refresh/only-export-components -- AuthProvider 与 useAuth 成对导出 */

type AuthContextValue = {
  isLoggedIn: boolean
  token: string | null
  user: UserPublic | null
  loginWithSession: (payload: TokenResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null)
  const [user, setUser] = useState<UserPublic | null>(null)

  useEffect(() => {
    const t = getStoredToken()
    const u = getStoredUser()
    if (t && u) {
      setToken(t)
      setUser(u)
    }
  }, [])

  const loginWithSession = useCallback((payload: TokenResponse) => {
    persistAuth(payload.access_token, payload.user)
    setToken(payload.access_token)
    setUser(payload.user)
  }, [])

  const logout = useCallback(() => {
    clearAuthStorage()
    setToken(null)
    setUser(null)
  }, [])

  const isLoggedIn = Boolean(token && user)

  const value = useMemo(
    () => ({ isLoggedIn, token, user, loginWithSession, logout }),
    [isLoggedIn, token, user, loginWithSession, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth 必须在 AuthProvider 内使用')
  }
  return ctx
}
