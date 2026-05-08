import axios, { type AxiosError } from 'axios'

import { API_BASE_URL } from '../config/api.ts'
import { getStoredToken } from './tokenStorage.ts'

export const http = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30_000,
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
