import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { Components } from 'react-markdown'

interface Props {
  content: string
}

export default function MarkdownRenderer({ content }: Props) {
  const [showToc, setShowToc] = useState(false)
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const els = contentRef.current.querySelectorAll('h2, h3')
    const hs = Array.from(els).map((el) => ({
      id: el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-') || '',
      text: el.textContent || '',
      level: el.tagName === 'H2' ? 2 : 3,
    }))
    setHeadings(hs)
  }, [content])

  const components: Components = {
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      const codeStr = String(children).replace(/\n$/, '')
      if (match) {
        return (
          <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" customStyle={{ borderRadius: '0.5rem', fontSize: '0.875rem', margin: '1rem 0' }}>
            {codeStr}
          </SyntaxHighlighter>
        )
      }
      return (
        <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-sm font-mono text-orange-600 dark:bg-zinc-800 dark:text-orange-400" {...props}>
          {children}
        </code>
      )
    },
    h2({ children, ...props }) {
      const id = String(children).toLowerCase().replace(/\s+/g, '-')
      return <h2 id={id} className="mt-8 mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100" {...props}>{children}</h2>
    },
    h3({ children, ...props }) {
      const id = String(children).toLowerCase().replace(/\s+/g, '-')
      return <h3 id={id} className="mt-6 mb-3 text-lg font-semibold text-zinc-800 dark:text-zinc-200" {...props}>{children}</h3>
    },
    p({ children, ...props }) {
      return <p className="mb-4 leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>{children}</p>
    },
    ul({ children, ...props }) {
      return <ul className="mb-4 list-disc pl-6 text-zinc-700 dark:text-zinc-300 space-y-1" {...props}>{children}</ul>
    },
    ol({ children, ...props }) {
      return <ol className="mb-4 list-decimal pl-6 text-zinc-700 dark:text-zinc-300 space-y-1" {...props}>{children}</ol>
    },
    table({ children, ...props }) {
      return <div className="overflow-x-auto mb-4"><table className="min-w-full border-collapse text-sm" {...props}>{children}</table></div>
    },
    th({ children, ...props }) {
      return <th className="border border-zinc-300 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800 px-3 py-2 font-semibold text-left" {...props}>{children}</th>
    },
    td({ children, ...props }) {
      return <td className="border border-zinc-300 dark:border-zinc-600 px-3 py-2" {...props}>{children}</td>
    },
    a({ children, href, ...props }) {
      return <a href={href} className="text-orange-600 hover:text-orange-700 underline underline-offset-2 dark:text-orange-400" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
    },
    blockquote({ children, ...props }) {
      return <blockquote className="border-l-4 border-orange-400 bg-orange-50 dark:bg-orange-950/30 pl-4 py-2 mb-4 italic text-zinc-600 dark:text-zinc-400" {...props}>{children}</blockquote>
    },
  }

  return (
    <div className="relative">
      {/* TOC toggle */}
      {headings.length > 2 && (
        <button
          onClick={() => setShowToc(!showToc)}
          className="sticky top-20 z-10 mb-4 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
        >
          {showToc ? '− 隐藏目录' : '+ 显示目录'} / {showToc ? '− Hide TOC' : '+ Show TOC'}
        </button>
      )}

      {showToc && headings.length > 2 && (
        <nav className="mb-6 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 p-4">
          <ul className="space-y-1">
            {headings.map((h) => (
              <li key={h.id} style={{ paddingLeft: h.level === 3 ? '1rem' : '0' }}>
                <a
                  href={`#${h.id}`}
                  className="text-sm text-zinc-600 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-400 transition-colors"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <div ref={contentRef} className="prose-custom">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  )
}