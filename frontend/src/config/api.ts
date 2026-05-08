/**
 * 后端 API 根地址（末尾不要斜杠）。
 * - 本地 `npm run dev`：未配置时用 http://127.0.0.1:8000
 * - 生产构建（Docker + Nginx 同源反代）：未配置时用空字符串，请求走当前站点 /api/...
 */
function resolveApiBaseUrl(): string {
  const raw = import.meta.env.VITE_API_BASE_URL
  const trimmed =
    raw === undefined || raw === null ? '' : String(raw).trim()
  if (trimmed !== '') {
    return trimmed.replace(/\/$/, '')
  }
  if (import.meta.env.PROD) {
    return ''
  }
  return 'http://127.0.0.1:8000'
}

export const API_BASE_URL = resolveApiBaseUrl()
