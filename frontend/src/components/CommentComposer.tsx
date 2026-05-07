import { useState } from 'react'

type Props = {
  onSubmit: (content: string) => void
}

export default function CommentComposer({ onSubmit }: Props) {
  const [value, setValue] = useState('')

  return (
    <form
      className="mt-4"
      onSubmit={(e) => {
        e.preventDefault()
        const text = value.trim()
        if (!text) return
        onSubmit(text)
        setValue('')
      }}
    >
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={4}
        placeholder="写下你的评论..."
        className="w-full resize-y rounded-lg border border-[var(--line)] bg-transparent px-3 py-2 text-sm leading-relaxed text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)]"
      />
      <div className="mt-3 flex justify-end">
        <button
          type="submit"
          className="rounded-full border border-[var(--line)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          发布评论
        </button>
      </div>
    </form>
  )
}

