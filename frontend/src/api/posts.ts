import { http } from './http.ts'
import type { PostCreateBody, PostResponse } from '../types/postApi.ts'

export async function createPost(body: PostCreateBody): Promise<PostResponse> {
  const { data } = await http.post<PostResponse>('/api/v1/posts', body)
  return data
}

export async function fetchPosts(): Promise<PostResponse[]> {
  const { data } = await http.get<PostResponse[]>('/api/v1/posts')
  return data
}

export async function fetchPostBySlug(slug: string): Promise<PostResponse> {
  const { data } = await http.get<PostResponse>(`/api/v1/posts/${slug}`)
  return data
}
