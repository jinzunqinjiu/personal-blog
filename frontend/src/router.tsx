import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'

import RootLayout from './layouts/RootLayout.tsx'
import AboutPage from './pages/AboutPage.tsx'
import HomePage from './pages/HomePage.tsx'
import PostPage from './pages/PostPage.tsx'

/**
 * 站点路由表：后续加页面只改这个数组即可（嵌套在 RootLayout 的 children 里）。
 *
 * 根节点必须用 `path: '/*'`：带 Outlet 的布局路由若只写 `'/'`，在 useRoutes 下子路径常常匹配不到，
 * 会返回 null，整页白屏。（与 `<Route path="/*" element={<Layout />}>` 一致。）
 *
 * - index → 首页
 * - about → 关于 / 撰写
 * - posts/:slug → 文章详情
 */
/* eslint-disable react-refresh/only-export-components -- 路由表与 AppRoutes 同文件维护 */
export const routes: RouteObject[] = [
  {
    path: '/*',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'posts/:slug', element: <PostPage /> },
      // { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export function AppRoutes() {
  return useRoutes(routes)
}
