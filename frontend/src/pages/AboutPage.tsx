export default function AboutPage() {
  return (
    <section className="page-shell flex w-full flex-1 flex-col pb-16 md:pb-24">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)] md:text-xs">
        Muse
      </p>
      <h1 className="article-title mt-4 md:mt-5">关于与撰写</h1>
      <div className="prose-width mt-9 space-y-5 text-[0.9375rem] leading-relaxed text-neutral-600 md:mt-10 md:space-y-6 md:text-base dark:text-neutral-400">
        <p>
          这一页可放作者简介、撰稿说明或联系方式。编辑{' '}
          <code>src/pages/AboutPage.tsx</code> 即可。
        </p>
        <p className="text-neutral-500 dark:text-neutral-500">
          多写一两个自然段，就能把版面撑得更稳；真正上线后也可用固定模块（例如「正在读」「联系」）
          占住侧栏或页脚，观感会更饱满。
        </p>
      </div>
    </section>
  )
}
