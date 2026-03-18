"use client"

import Link from "next/link"

const navItems = [
  { href: "/sets", label: "Sets" },
  { href: "/tracks", label: "Tracks" },
]

export default function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-white"
          onClick={onClick}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}