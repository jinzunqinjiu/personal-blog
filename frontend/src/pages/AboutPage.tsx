import {
  AppstoreOutlined,
  ArrowLeftOutlined,
  EllipsisOutlined,
  ExpandOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, Select, message } from 'antd'
import { useMemo, useState, type CSSProperties } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../api/posts.ts'
import { getApiErrorMessage } from '../api/http.ts'
import MarkdownEditor from '../components/MarkdownEditor.tsx'
import { useAuth } from '../contexts/AuthContext.tsx'
import { useTheme } from '../contexts/ThemeContext.tsx'
import { POST_CATEGORY_OPTIONS } from '../config/postCategories.ts'

type PublishFormValues = {
  title: string
  category: string
  summary?: string
  content_md: string
}

export default function AboutPage() {
  const [form] = Form.useForm<PublishFormValues>()
  const [submitting, setSubmitting] = useState(false)
  const [api, contextHolder] = message.useMessage()
  const { isLoggedIn } = useAuth()
  const { theme } = useTheme()
  const navigate = useNavigate()
  const isLuxuryDark = theme === 'luxury-dark'
  const content = Form.useWatch('content_md', form) ?? ''

  const metrics = useMemo(() => {
    const parts = content.match(/[\u4e00-\u9fff]|[A-Za-z0-9_]+/g) ?? []
    const words = parts.length
    const minutes = Math.max(1, Math.ceil(words / 300))
    return { words, minutes }
  }, [content])

  const onFinish = async (values: PublishFormValues) => {
    setSubmitting(true)
    try {
      const generatedSummary = values.content_md.trim().slice(0, 120) || undefined
      const created = await createPost({
        ...values,
        summary: values.summary?.trim() || generatedSummary,
      })
      api.success('发布成功')
      form.resetFields()
      navigate(`/posts/${created.slug}`)
    } catch (error) {
      api.error(getApiErrorMessage(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="page-shell write-page flex w-full flex-1 flex-col pb-16 md:pb-24">
      {contextHolder}
      {isLoggedIn ? (
        <Form<PublishFormValues>
          form={form}
          layout="vertical"
          className="prose-width compose-form mt-4 md:mt-6"
          initialValues={{ category: 'TECHNOLOGY' }}
          onFinish={onFinish}
          requiredMark={false}
        >
          <button
            type="button"
            className="compose-back-btn"
            aria-label="返回首页"
            onClick={() => navigate('/')}
          >
            <ArrowLeftOutlined />
          </button>

          <Form.Item
            name="title"
            rules={[{ required: true, message: '请输入标题' }]}
            className="!mb-6"
          >
            <Input
              variant="borderless"
              className="compose-title-input"
              placeholder="在此输入标题..."
            />
          </Form.Item>

          <div className="compose-meta-row">
            <span className="compose-meta-pill">新文章</span>
            <span className="compose-meta-dot" />
            <Form.Item
              name="category"
              rules={[{ required: true, message: '请选择分类' }]}
              className="!mb-0 min-w-[140px]"
            >
              <Select
                variant="borderless"
                options={[...POST_CATEGORY_OPTIONS]}
                popupClassName="compose-category-dropdown"
                className="compose-category-select"
                styles={
                  isLuxuryDark
                    ? {
                        root: {
                          color: 'var(--gold)',
                          ...( {
                            '--ant-select-color': 'var(--gold)',
                            '--ant-color-text': 'var(--gold)',
                          } as CSSProperties ),
                        },
                        suffix: { color: 'var(--gold)' },
                      }
                    : undefined
                }
              />
            </Form.Item>
          </div>

          <Form.Item
            name="content_md"
            rules={[{ required: true, message: '请输入正文内容' }]}
            className="!mb-0"
          >
            <MarkdownEditor
              showModeSwitch={false}
              minRows={6}
              textareaClassName="compose-editor-textarea"
              previewClassName="compose-editor-preview"
              placeholder="开始写正文..."
              showCount={false}
            />
          </Form.Item>

          <div className="compose-bottom-bar">
            <p>
              {metrics.words} 字 <span>/</span> 约 {metrics.minutes} 分钟读完
            </p>
            <Button
              className="compose-publish-btn"
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              发布文章
            </Button>
          </div>

          <div className="compose-float-tools" aria-hidden>
            <EllipsisOutlined />
            <AppstoreOutlined />
            <ExpandOutlined />
          </div>
        </Form>
      ) : (
        <div className="prose-width mt-4 md:mt-6">
          <button
            type="button"
            className="compose-back-btn"
            aria-label="返回首页"
            onClick={() => navigate('/')}
          >
            <ArrowLeftOutlined />
          </button>
          <p className="pt-4 text-lg text-[var(--text-muted)]">请先登录后撰写。</p>
        </div>
      )}
    </section>
  )
}
