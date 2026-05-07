import { Button, Form, Input } from 'antd'
import { UI_TEXT } from '../config/uiText.ts'
import { useTheme } from '../contexts/ThemeContext.tsx'

export type AuthMode = 'login' | 'register'

type AuthFormValues = {
  nickname?: string
  email: string
  password: string
}

type Props = {
  mode: AuthMode
  onModeChange: (mode: AuthMode) => void
  onSubmit: (values: AuthFormValues) => void
}

/** 抽屉内的登录/注册表单（Ant Design Form） */
export default function AuthDrawerForm({ mode, onModeChange, onSubmit }: Props) {
  const { theme } = useTheme()
  const isDark = theme === 'luxury-dark'

  const inputClass =
    '!mt-2 !w-full !border-0 !bg-transparent !px-0 !pb-3 !pt-1 !text-base !shadow-none !rounded-none'

  return (
    <Form<AuthFormValues>
      layout="vertical"
      className="auth-drawer-form"
      style={{ paddingTop: 112 }}
      onFinish={onSubmit}
      requiredMark={false}
    >
      <div>
        <p
          className="font-serif-blog text-[2.8rem] leading-none font-semibold tracking-tight md:text-[3rem]"
          style={{ color: isDark ? '#f2efe8' : '#171717' }}
        >
          {mode === 'login' ? UI_TEXT.auth.loginTitle : UI_TEXT.auth.registerTitle}
        </p>
        <p
          className="mt-4 text-[15px] leading-relaxed md:text-base"
          style={{ color: isDark ? '#8f8a7a' : '#a3a3a3' }}
        >
          {mode === 'login'
            ? UI_TEXT.auth.loginSubtitle
            : UI_TEXT.auth.registerSubtitle}
        </p>
      </div>

      <div style={{ marginTop: 72 }}>
        {mode === 'register' ? (
          <Form.Item<AuthFormValues>
            name="nickname"
            rules={[{ required: true, message: '请输入昵称' }]}
            style={{ marginBottom: 40 }}
          >
            <Input
              placeholder={UI_TEXT.auth.nicknamePlaceholder}
              variant="borderless"
              className={inputClass}
              style={{ color: isDark ? '#ece8dc' : '#262626' }}
            />
          </Form.Item>
        ) : null}

        <Form.Item<AuthFormValues>
          name="email"
          rules={[
            { required: true, message: '请输入邮箱地址' },
            { type: 'email', message: '邮箱格式不正确' },
          ]}
          style={{ marginBottom: 40 }}
        >
          <Input
            placeholder={UI_TEXT.auth.emailPlaceholder}
            variant="borderless"
            className={inputClass}
            style={{ color: isDark ? '#ece8dc' : '#262626' }}
          />
        </Form.Item>

        <Form.Item<AuthFormValues>
          name="password"
          rules={[
            { required: true, message: mode === 'login' ? '请输入密码' : '请设置密码' },
            ...(mode === 'register'
              ? [{ min: 8, message: '密码至少 8 位字符' }]
              : []),
          ]}
          className="!mb-0"
        >
          <Input.Password
            placeholder={
              mode === 'login'
                ? UI_TEXT.auth.passwordPlaceholder
                : UI_TEXT.auth.createPasswordPlaceholder
            }
            iconRender={() => null}
            variant="borderless"
            className={inputClass}
            style={{ color: isDark ? '#ece8dc' : '#262626' }}
          />
        </Form.Item>
      </div>

      <Button
        htmlType="submit"
        type="primary"
        block
        size="large"
        className="!rounded-2xl !text-base !font-medium"
        style={{ marginTop: 56, height: 52 }}
        styles={{
          root: {
            background: isDark ? '#0b0b0d' : '#111111',
            borderColor: isDark ? 'rgba(200,162,74,0.2)' : '#111111',
            color: isDark ? '#ece8dc' : '#ffffff',
            boxShadow: isDark ? '0 0 0 1px rgba(200,162,74,0.08) inset' : 'none',
          },
        }}
      >
        {mode === 'login' ? UI_TEXT.auth.loginButton : UI_TEXT.auth.registerButton}
      </Button>

      <p
        className="text-center text-[15px] md:text-base"
        style={{ marginTop: 40, color: isDark ? '#8f8a7a' : '#a3a3a3' }}
      >
        {mode === 'login'
          ? UI_TEXT.auth.noAccountPrefix
          : UI_TEXT.auth.hasAccountPrefix}{' '}
        <button
          type="button"
          className="font-semibold underline underline-offset-4"
          style={{ color: isDark ? '#e2c875' : '#171717' }}
          onClick={() => onModeChange(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login'
            ? UI_TEXT.auth.noAccountAction
            : UI_TEXT.auth.hasAccountAction}
        </button>
      </p>
    </Form>
  )
}
