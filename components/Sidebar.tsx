"use client"

import NavLinks from "@/components/NavLinks"

export default function Sidebar({
  onItemClick,
}: {
  onItemClick?: () => void
}) {
  return (
    <aside className="hidden w-60 shrink-0 flex-col gap-3 border-r border-zinc-200 bg-white/70 p-4 dark:border-zinc-800 dark:bg-zinc-950/70 md:flex">
      <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Navigation
      </div>
      <NavLinks onClick={onItemClick} />
    </aside>
  )
}