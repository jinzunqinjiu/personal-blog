import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/* eslint-disable react-refresh/only-export-components -- AuthProvider 与 useAuth 成对导出 */

type AuthContextValue = {
  isLoggedIn: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const login = useCallback(() => setLoggedIn(true), [])
  const logout = useCallback(() => setLoggedIn(false), [])

  const value = useMemo(
    () => ({ isLoggedIn, login, logout }),
    [isLoggedIn, login, logout],
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
