import { useLang } from '../context/LanguageContext'
import { categories, getArticlesByCategory, articles } from '../data/articles'
import { Link } from 'react-router-dom'
import { ChevronRight, BookOpen, Code2, Brackets, Layers, Globe } from 'lucide-react'

const categoryIcons = [BookOpen, Code2, Brackets, Layers, Globe]
const categoryGradients = [
  'from-rose-500 to-pink-600',
  'from-blue-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-violet-500 to-purple-600',
  'from-orange-500 to-red-500',
]

export default function HomePage() {
  const { t, lang } = useLang()

  return (
    <div>
      {/* Hero */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          JS {t('面试知识库', 'Interview Knowledge Base')}
        </h1>
        <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">
          {t(
            `${articles.length} 篇文章 · ${categories.length} 个分类`,
            `${articles.length} articles · ${categories.length} categories`
          )}
        </p>
        <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
          {t('通过面试题巩固 JavaScript 知识', 'Master JavaScript through interview questions')}
        </p>
      </section>

      {/* Category Grid */}
      <section className="mb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = categoryIcons[i]
            const articleList = getArticlesByCategory(cat.id)
            return (
              <Link
                key={cat.id}
                to={`/?cat=${cat.id}`}
                className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${categoryGradients[i]} p-5 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="relative z-10">
                  <Icon size={24} className="mb-3 opacity-80" />
                  <h3 className="text-lg font-bold">{lang === 'zh' ? cat.name.zh : cat.name.en}</h3>
                  <p className="mt-1 text-sm opacity-80">
                    {lang === 'zh' ? cat.name.en : cat.name.zh}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm opacity-75">
                      {t(`${articleList.length} 篇文章`, `${articleList.length} articles`)}
                    </span>
                    <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-white/0 transition-colors duration-300 group-hover:bg-white/10" />
              </Link>
            )
          })}
        </div>
      </section>

      {/* All Articles */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
          {t('全部题目', 'All Questions')}
        </h2>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800/50">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/article/${article.id}`}
              className="flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0 text-xs font-mono text-zinc-400 dark:text-zinc-500">
                  #{article.id}
                </span>
                <span className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  {lang === 'zh' ? article.title.zh : article.title.en}
                </span>
              </div>
              <div className="shrink-0 ml-3">
                <span className="text-xs text-zinc-400 dark:text-zinc-500">
                  {lang === 'zh' ? article.category.zh : article.category.en}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}