import Link from "next/link"
import { Swords } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-900/10 rounded-full blur-[128px]" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <Swords className="h-7 w-7 text-wow-gold" />
          <h1 className="text-3xl font-bold wow-gold-text font-[family-name:var(--font-heading)]">
            Link not found
          </h1>
        </div>
        <p className="text-sm text-[#a89880] mb-6">
          This share link does not exist, or it has been removed.
        </p>
        <Link
          href="/"
          className="inline-block rounded-lg border border-wow-gold/50 bg-gradient-to-b from-[#7a6a4a] to-[#3d2e1a] px-5 py-2.5 text-sm font-semibold text-wow-gold-light font-[family-name:var(--font-heading)] hover:from-[#6b5a35] hover:to-[#4d3e25] hover:shadow-[0_0_16px_rgba(201,170,113,0.2)] transition-all"
        >
          Back to start
        </Link>
      </div>
    </div>
  )
}
