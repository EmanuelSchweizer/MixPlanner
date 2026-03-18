"use client"

import NavLinks from "@/components/NavLinks"

export default function MobileNav({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 w-full border-t border-zinc-200 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 md:hidden">
      <NavLinks onClick={onClose} />
    </div>
  )
}