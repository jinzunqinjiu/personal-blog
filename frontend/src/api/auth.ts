import { http } from './http.ts'
import type { LoginBody, RegisterBody, TokenResponse } from '../types/authApi.ts'

export async function login(body: LoginBody): Promise<TokenResponse> {
  const { data } = await http.post<TokenResponse>('/api/v1/auth/login', body)
  return data
}

export async function register(body: RegisterBody): Promise<TokenResponse> {
  const { data } = await http.post<TokenResponse>('/api/v1/auth/register', body)
  return data
}

/** 清除服务端 HttpOnly refresh Cookie（需 withCredentials，已由 http 实例开启） */
export async function logoutRemote(): Promise<void> {
  await http.post('/api/v1/auth/logout')
}
