import { createContext, useContext, useState, type ReactNode } from 'react'

type Lang = 'zh' | 'en'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (zh: string, en: string) => string
}

const LangContext = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    return (localStorage.getItem('lang') as Lang) || 'zh'
  })

  const t = (zh: string, en: string) => (lang === 'zh' ? zh : en)

  const handleSetLang = (newLang: Lang) => {
    setLang(newLang)
    localStorage.setItem('lang', newLang)
  }

  return (
    <LangContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}