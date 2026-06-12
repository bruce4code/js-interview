import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}