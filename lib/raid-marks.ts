export type TokenPart =
  | { type: "text"; value: string }
  | { type: "mark"; key: string }
  | { type: "ability"; key: string }

// Parse a label like "{star} Star" or "{ability:curse-of-elements} Curse of Elements"
export function parseMarkTokens(label: string): TokenPart[] {
  const parts: TokenPart[] = []
  const regex = /\{(ability:)?(\w[\w-]*)\}/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(label)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: label.slice(lastIndex, match.index) })
    }
    if (match[1] === "ability:") {
      parts.push({ type: "ability", key: match[2] })
    } else {
      parts.push({ type: "mark", key: match[2] })
    }
    lastIndex = regex.lastIndex
  }

  if (lastIndex < label.length) {
    parts.push({ type: "text", value: label.slice(lastIndex) })
  }

  return parts
}
