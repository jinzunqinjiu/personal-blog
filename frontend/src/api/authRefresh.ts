import axios from 'axios'

import { API_BASE_URL } from '../config/api.ts'
import type { TokenResponse } from '../types/authApi.ts'
import { persistAuth } from './tokenStorage.ts'

/**
 * 使用 HttpOnly Cookie 中的 refresh 换新 access（后端 Set-Cookie 轮转 refresh）。
 */
export async function refreshAccessToken(): Promise<string> {
  const base = API_BASE_URL.replace(/\/$/, '')
  const url = `${base}/api/v1/auth/refresh`
  const { data } = await axios.post<TokenResponse>(
    url,
    {},
    {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15_000,
      withCredentials: true,
    },
  )
  persistAuth(data.access_token, data.user)
  window.dispatchEvent(new Event('muse:auth-sync'))
  return data.access_token
}
