# Assign

Drag-and-drop raid assignments for World of Warcraft: The Burning Crusade.

Raid leaders create a session, import their roster, assign players to encounter roles, and share a URL with the raid. No accounts, no database — everything is encoded in the URL.

## Features

- **Drag & drop** players from the roster into encounter slots (tanks, healers, interrupts, cube clickers, etc.)
- **General Assignments** tab with smart auto-fill — innervates auto-match druids, MDs auto-match hunters
- **Dropdown selectors** for warlock curses, paladin judgements, mage debuffs — with exclusivity (one curse per warlock)
- **WoW raid marks** (Star, Circle, Diamond, Triangle, Skull) on Magtheridon channeler/cube assignments
- **Actual WoW ability icons** for all debuffs, buffs, and utility spells
- **Shareable URLs** — all state compressed into the URL hash, no server needed
- **Read-only view** at `/view#...` for raid members
- **Dynamic slots** — "+" button to expand healer/interrupt/MD counts as needed
- **Paired slots** — Misdirection shows "Hunter → Target", Innervate shows "Druid → Target"
- **25-man demo** — one click to see a fully populated raid with assignments

## Encounters

Currently supports TBC Phase 1 raids:

- **Gruul's Lair** — High King Maulgar (5-mob council) + Gruul the Dragonkiller
- **Magtheridon's Lair** — 5 channelers, 5 cube clickers, interrupts

Each raid includes a **General Assignments** tab for raid-wide utility (curses, debuffs, innervates, MDs, bloodlust, judgements).

## Tech Stack

- [Next.js](https://nextjs.org) 16 with App Router
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org) (strict mode)
- [Tailwind CSS](https://tailwindcss.com) 4 + [shadcn/ui](https://ui.shadcn.com)
- [@dnd-kit](https://dndkit.com) for drag and drop
- [fflate](https://github.com/101arrowz/fflate) for URL compression

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Try Demo** to see it in action.

## How Sharing Works

All raid data (roster, assignments, slot overrides) is serialized to JSON, gzip-compressed, and base64url-encoded into the URL hash fragment:

```
https://assign.example.com/r#eJyLzs...
```

- No server storage required
- Hash fragment is never sent to the server
- 25-man raids with full assignments compress to ~500-1500 characters
- `/r#...` is the editor, `/view#...` is read-only

### Short URLs (optional)

The Share dialog has a **Shorten** button that turns the long hash URL into something like `/r/abc123`. Short URLs are server-stored snapshots — once a viewer edits the session, the URL transitions back to a `/r/abc123#hash` form so edits live in the hash and survive reloads.

Short links are stored in a single-file SQLite database. Configure with:

- `LINKS_DB_PATH` — path to the SQLite file. Defaults to `./data/links.db`.

**Coolify deployment:**

1. Set env var `LINKS_DB_PATH=/app/data/links.db`.
2. Mount a persistent volume at `/app/data` (the directory, not the file — WAL mode creates `links.db-wal` and `links.db-shm` siblings that all need to live on the volume).
3. `better-sqlite3` is a native module. The default `node:20-bookworm-slim` style images work; Alpine needs extra build deps.

## Project Structure

```
app/
  page.tsx          — Landing page (create raid / try demo)
  r/page.tsx        — Raid editor (DnD + roster sidebar)
  view/page.tsx     — Read-only view for raid members
components/
  encounter/        — Slot groups, drag-drop slots, select dropdowns
  roster/           — Player cards, import dialog, class filters
  raid/             — Header, share dialog
lib/
  encounters/       — Encounter definitions (Maulgar, Gruul, Magtheridon, General)
  abilities.ts      — WoW ability icon mappings
  raid-reducer.ts   — State management (useReducer)
  raid-context.tsx   — React context + URL hash sync
  url-codec.ts      — Gzip encode/decode for URL sharing
```
