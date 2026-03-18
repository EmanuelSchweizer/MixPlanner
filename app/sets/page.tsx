import Link from "next/link"

export default function SetsPage() {
  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Sets</h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
          Manage your song sets. Create new sets and add tracks to them.
        </p>
      </header>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          This page is a placeholder. Implement your sets list and editing UI here.
        </p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
