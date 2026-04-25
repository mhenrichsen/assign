import type { Player } from "@/lib/types"
import { getSpecIconUrl } from "@/lib/wow"
import { cn } from "@/lib/utils"
import { ClassIcon } from "./class-icon"

export function PlayerIcon({
  player,
  size = 16,
  className,
}: {
  player: Pick<Player, "class" | "spec" | "specIcon">
  size?: number
  className?: string
}) {
  const url = getSpecIconUrl(player.specIcon)
  if (url) {
    const title = player.spec ? `${player.spec} ${player.class}` : player.class
    return (
      <img
        src={url}
        alt={title}
        title={title}
        width={size}
        height={size}
        loading="lazy"
        className={cn("shrink-0 rounded-sm", className)}
      />
    )
  }
  return (
    <ClassIcon wowClass={player.class} size={size} className={className} />
  )
}
