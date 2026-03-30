import { parseMarkTokens } from "@/lib/raid-marks"
import { getAbilityIconUrl, ABILITIES } from "@/lib/abilities"

// SVG raid target icons matching the in-game WoW markers
function StarMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <polygon
        points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
        fill="#FFD100"
        stroke="#B8960A"
        strokeWidth="0.5"
      />
    </svg>
  )
}

function CircleMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <circle cx="12" cy="12" r="9" fill="#FF8000" stroke="#CC6600" strokeWidth="0.5" />
    </svg>
  )
}

function DiamondMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <polygon
        points="12,2 22,12 12,22 2,12"
        fill="#CC00FF"
        stroke="#9900CC"
        strokeWidth="0.5"
      />
    </svg>
  )
}

function TriangleMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <polygon
        points="12,3 22,21 2,21"
        fill="#00FF00"
        stroke="#00CC00"
        strokeWidth="0.5"
      />
    </svg>
  )
}

function MoonMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <path
        d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"
        fill="#B0C4DE"
        stroke="#8BA8C4"
        strokeWidth="0.5"
      />
    </svg>
  )
}

function SquareMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <rect x="3" y="3" width="18" height="18" rx="1" fill="#0070DD" stroke="#0055AA" strokeWidth="0.5" />
    </svg>
  )
}

function CrossMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <path
        d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7a1 1 0 00-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 101.4 1.4L12 13.4l4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z"
        fill="#FF0000"
        stroke="#CC0000"
        strokeWidth="0.3"
      />
    </svg>
  )
}

function SkullMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className="inline-block shrink-0">
      <path
        d="M12 2C7.58 2 4 5.58 4 10c0 2.76 1.39 5.2 3.5 6.65V20a1 1 0 001 1h7a1 1 0 001-1v-3.35C18.61 15.2 20 12.76 20 10c0-4.42-3.58-8-8-8z"
        fill="#E8E8E8"
        stroke="#AAAAAA"
        strokeWidth="0.5"
      />
      <circle cx="9" cy="10" r="2" fill="#1c1a16" />
      <circle cx="15" cy="10" r="2" fill="#1c1a16" />
      <path d="M10 15h4" stroke="#1c1a16" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 17h5" stroke="#AAAAAA" strokeWidth="0.5" />
    </svg>
  )
}

const MARK_COMPONENTS: Record<string, React.ComponentType<{ size: number }>> = {
  star: StarMark,
  circle: CircleMark,
  diamond: DiamondMark,
  triangle: TriangleMark,
  moon: MoonMark,
  square: SquareMark,
  cross: CrossMark,
  skull: SkullMark,
}

export function RaidMark({ markKey, size = 16 }: { markKey: string; size?: number }) {
  const Component = MARK_COMPONENTS[markKey]
  if (!Component) return null
  return <Component size={size} />
}

export function AbilityIcon({ abilityKey, size = 18 }: { abilityKey: string; size?: number }) {
  const url = getAbilityIconUrl(abilityKey, "small")
  const ability = ABILITIES[abilityKey]
  if (!url || !ability) return null

  return (
    <img
      src={url}
      alt={ability.name}
      title={ability.name}
      width={size}
      height={size}
      className="inline-block shrink-0 rounded-sm border border-[#3e3830]"
      style={{ imageRendering: "auto" }}
    />
  )
}

export function SlotLabel({ label }: { label: string }) {
  const parts = parseMarkTokens(label)

  if (parts.length === 1 && parts[0].type === "text") {
    return <>{label}</>
  }

  return (
    <span className="inline-flex items-center gap-1">
      {parts.map((part, i) => {
        switch (part.type) {
          case "mark":
            return <RaidMark key={i} markKey={part.key} size={14} />
          case "ability":
            return <AbilityIcon key={i} abilityKey={part.key} size={16} />
          case "text":
            return <span key={i}>{part.value}</span>
        }
      })}
    </span>
  )
}
