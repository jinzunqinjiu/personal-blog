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
