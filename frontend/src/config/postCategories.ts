/** 分类存库仍为英文大写，界面统一展示中文 */

export const POST_CATEGORY_OPTIONS = [
  { label: '科技', value: 'TECHNOLOGY' },
  { label: '生活', value: 'LIFE' },
  { label: '设计', value: 'DESIGN' },
  { label: '吐槽', value: 'RANT' },
] as const

const LABEL_BY_VALUE = Object.fromEntries(
  POST_CATEGORY_OPTIONS.map((o) => [o.value, o.label]),
) as Record<string, string>

export function postCategoryLabel(value: string): string {
  const key = value.trim().toUpperCase()
  return LABEL_BY_VALUE[key] ?? value
}
