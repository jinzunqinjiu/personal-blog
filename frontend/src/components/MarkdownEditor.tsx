import { Input, Segmented } from 'antd'
import DOMPurify from 'dompurify'
import { marked } from 'marked'
import { useMemo, useState } from 'react'

type Props = {
  value?: string
  onChange?: (value: string) => void
  minRows?: number
  showModeSwitch?: boolean
  textareaClassName?: string
  previewClassName?: string
  placeholder?: string
  showCount?: boolean
}

export default function MarkdownEditor({
  value = '',
  onChange,
  minRows = 14,
  showModeSwitch = true,
  textareaClassName = '',
  previewClassName = '',
  placeholder = '支持 Markdown，例如 # 标题、**加粗**、- 列表...',
  showCount = true,
}: Props) {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  const html = useMemo(() => {
    const rendered = marked.parse(value || '', { async: false, breaks: true })
    const htmlString = typeof rendered === 'string' ? rendered : ''
    return DOMPurify.sanitize(htmlString)
  }, [value])

  return (
    <div className="md-editor space-y-3">
      {showModeSwitch ? (
        <Segmented<'edit' | 'preview'>
          options={[
            { label: '编辑', value: 'edit' },
            { label: '预览', value: 'preview' },
          ]}
          value={mode}
          onChange={setMode}
        />
      ) : null}

      {mode === 'edit' ? (
        <Input.TextArea
          className={`md-editor-textarea ${textareaClassName}`.trim()}
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          autoSize={{ minRows }}
          showCount={showCount}
        />
      ) : (
        <article
          className={`md-editor-preview min-h-[260px] rounded-2xl p-5 text-[15px] leading-7 ${previewClassName}`.trim()}
          dangerouslySetInnerHTML={{ __html: html || '<p>暂无内容</p>' }}
        />
      )}
    </div>
  )
}
