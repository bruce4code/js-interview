import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
import LanguageToggle from './LanguageToggle'
import { BookOpen } from 'lucide-react'

export default function Navbar() {
  const { t } = useLang()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-900/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-zinc-800 dark:text-zinc-100">
          <BookOpen size={22} className="text-orange-500" />
          <span className="font-semibold tracking-tight">JS Interview</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isHome && (
            <Link
              to="/"
              className="text-sm text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
            >
              {t('首页', 'Home')}
            </Link>
          )}
          <LanguageToggle />
        </div>
      </div>
    </header>
  )
}