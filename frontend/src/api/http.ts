import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

import { API_BASE_URL } from '../config/api.ts'
import { refreshAccessToken } from './authRefresh.ts'
import { clearAuthStorage, getStoredToken } from './tokenStorage.ts'

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let refreshing: Promise<string> | null = null

function sessionLost() {
  clearAuthStorage()
  window.dispatchEvent(new Event('muse:auth-logout'))
}

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status
    const cfg = error.config as (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined

    if (status !== 401 || !cfg || cfg._retry) {
      return Promise.reject(error)
    }

    const reqUrl = cfg.url ?? ''
    if (
      reqUrl.includes('/auth/refresh') ||
      reqUrl.includes('/auth/login') ||
      reqUrl.includes('/auth/register')
    ) {
      return Promise.reject(error)
    }

    cfg._retry = true

    try {
      if (!refreshing) {
        refreshing = refreshAccessToken().finally(() => {
          refreshing = null
        })
      }
      const newAccess = await refreshing
      if (cfg.headers) {
        cfg.headers.Authorization = `Bearer ${newAccess}`
      }
      return http(cfg)
    } catch {
      sessionLost()
      return Promise.reject(error)
    }
  },
)

type FastApiValidationDetail = {
  loc?: (string | number)[]
  msg?: string
  type?: string
}

function detailToMessage(detail: unknown): string | null {
  if (typeof detail === 'string') return detail
  if (Array.isArray(detail)) {
    const first = detail[0] as FastApiValidationDetail | undefined
    if (first && typeof first === 'object' && typeof first.msg === 'string') {
      return first.msg
    }
  }
  return null
}

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const ax = error as AxiosError<{ detail?: unknown }>
    const msg = detailToMessage(ax.response?.data?.detail)
    if (msg) return msg
    if (typeof ax.response?.status === 'number') {
      return `请求失败（${ax.response.status}）`
    }
  }
  if (error instanceof Error) return error.message
  return '请求失败，请稍后重试'
}
