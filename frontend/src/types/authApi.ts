export type UserPublic = {
  id: number
  nickname: string
  email: string
  is_vip: boolean
}

export type TokenResponse = {
  access_token: string
  token_type: string
  user: UserPublic
}

export type LoginBody = {
  email: string
  password: string
}

export type RegisterBody = {
  nickname: string
  email: string
  password: string
}
