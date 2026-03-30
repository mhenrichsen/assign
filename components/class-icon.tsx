import type { WowClass } from "@/lib/types"
import { CLASS_COLORS } from "@/lib/wow"
import { cn } from "@/lib/utils"

// WoW class icon SVG paths - simplified iconic representations
const CLASS_ICONS: Record<WowClass, string> = {
  Warrior:
    "M12 2L4 8l2 4 2-1 4 9 4-9 2 1 2-4-8-6zm0 3.5L16 9l-1 2-1-.5L12 16l-2-5.5L9 11l-1-2 4-3.5z",
  Paladin:
    "M12 2l-2 4H6l4 3-1.5 5L12 11.5 15.5 14 14 9l4-3h-4L12 2zm0 10a4 4 0 100 8 4 4 0 000-8zm0 2a2 2 0 110 4 2 2 0 010-4z",
  Hunter:
    "M12 2C8 2 5 5.5 5 9c0 2 1 3.5 2 4.5L12 22l5-8.5c1-1 2-2.5 2-4.5 0-3.5-3-7-7-7zm0 2c1.5 0 3 1.5 3 3s-1 2.5-3 4c-2-1.5-3-2.5-3-4s1.5-3 3-3z",
  Rogue:
    "M12 2L8 6l-4 1 3 3-1 5 6-3 6 3-1-5 3-3-4-1-4-4zm-5 12l-3 4 2 2 4-3-3-3zm10 0l-3 3 4 3 2-2-3-4z",
  Priest:
    "M11 2v4H7v2h4v4h2V8h4V6h-4V2h-2zm-5 10v2h2v6h2v-6h4v6h2v-6h2v-2H6z",
  Shaman:
    "M12 2l-3 5H4l2.5 4L5 16l5-2v6h4v-6l5 2-1.5-5L20 7h-5l-3-5zm0 3l1.5 3h-3L12 5zm-3 5h6l-1 3H10l-1-3z",
  Mage: "M12 2l-2 3-3-1 1 3-3 2 3 1-1 3 3-1 2 3 2-3 3 1-1-3 3-1-3-2 1-3-3 1-2-3zm0 6a2 2 0 100 4 2 2 0 000-4zm-6 8l-2 4h16l-2-4H6z",
  Warlock:
    "M12 2C9 2 7 4 7 7c0 2 1 3 2 4l-4 9h3l2-4 2 6 2-6 2 4h3l-4-9c1-1 2-2 2-4 0-3-2-5-5-5zm0 2c1.5 0 3 1 3 3s-1.5 3-3 3-3-1-3-3 1.5-3 3-3z",
  Druid:
    "M12 2C8 2 5 4.5 5 8c0 2.5 1.5 4.5 4 5.5V22h6v-8.5c2.5-1 4-3 4-5.5 0-3.5-3-6-7-6zm-2 4c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm4 0c.5 0 1 .5 1 1s-.5 1-1 1-1-.5-1-1 .5-1 1-1zm-2 3c1 0 2 .5 2 1s-1 1.5-2 2c-1-.5-2-1-2-2s1-1 2-1z",
}

export function ClassIcon({
  wowClass,
  size = 20,
  className,
}: {
  wowClass: WowClass
  size?: number
  className?: string
}) {
  const color = CLASS_COLORS[wowClass]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={cn("shrink-0", className)}
    >
      <path d={CLASS_ICONS[wowClass]} />
    </svg>
  )
}

export function ClassBadge({
  wowClass,
  size = "sm",
  className,
}: {
  wowClass: WowClass
  size?: "xs" | "sm" | "md"
  className?: string
}) {
  const color = CLASS_COLORS[wowClass]
  const sizeClasses = {
    xs: "text-[10px] px-1.5 py-0.5 gap-1",
    sm: "text-xs px-2 py-0.5 gap-1.5",
    md: "text-sm px-2.5 py-1 gap-1.5",
  }
  const iconSize = { xs: 12, sm: 14, md: 16 }

  return (
    <span
      className={cn(
        "inline-flex items-center rounded font-medium",
        sizeClasses[size],
        className
      )}
      style={{
        color,
        backgroundColor: `${color}15`,
        border: `1px solid ${color}30`,
      }}
    >
      <ClassIcon wowClass={wowClass} size={iconSize[size]} />
      {wowClass}
    </span>
  )
}

