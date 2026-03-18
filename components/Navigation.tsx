"use client"

import Link from "next/link"
import { useState } from "react"
import MobileNav from "@/components/MobileNav"
import { FiMenu, FiX } from "react-icons/fi"
import { Button } from "@heroui/react"

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="relative border-b border-zinc-200 bg-white/80 px-6 py-4 shadow-sm backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/70">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          MixPlanner
        </Link>

        <Button
          type="button"
          isIconOnly
          variant="bordered"
          radius="md"
          onClick={() => setMobileOpen((open) => !open)}
          className="text-zinc-700 dark:text-zinc-200 md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </Button>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}