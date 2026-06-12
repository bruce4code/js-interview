import { useLang } from '../context/LanguageContext'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function LanguageToggle() {
  const { lang, setLang } = useLang()
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="flex items-center gap-3">
      {/* Language toggle */}
      <button
        onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
        className="relative inline-flex h-8 w-16 items-center rounded-full bg-zinc-200 dark:bg-zinc-700 transition-colors duration-300"
        aria-label="Toggle language"
      >
        <span
          className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 text-xs font-medium ${
            lang === 'en' ? 'translate-x-9' : 'translate-x-1'
          }`}
        >
          {lang === 'zh' ? '中' : 'EN'}
        </span>
      </button>

      {/* Dark mode toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="rounded-full p-1.5 text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
        aria-label="Toggle dark mode"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    </div>
  )
}