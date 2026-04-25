import "server-only"
import Database from "better-sqlite3"
import { customAlphabet } from "nanoid"
import path from "node:path"
import fs from "node:fs"

const DB_PATH = process.env.LINKS_DB_PATH ?? "./data/links.db"

declare global {
  var __linksDb: Database.Database | undefined
}

function openDb(): Database.Database {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true })
  const db = new Database(DB_PATH)
  db.pragma("journal_mode = WAL")
  db.exec(`CREATE TABLE IF NOT EXISTS links (
    id TEXT PRIMARY KEY,
    payload TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`)
  return db
}

const db = globalThis.__linksDb ?? openDb()
if (process.env.NODE_ENV !== "production") {
  globalThis.__linksDb = db
}

const insertStmt = db.prepare(
  "INSERT INTO links (id, payload, created_at) VALUES (?, ?, ?)"
)
const selectStmt = db.prepare("SELECT payload FROM links WHERE id = ?")

const newId = customAlphabet("23456789abcdefghjkmnpqrstuvwxyz", 8)

export function createLink(payload: string): string {
  for (let attempt = 0; attempt < 3; attempt++) {
    const id = newId()
    try {
      insertStmt.run(id, payload, Date.now())
      return id
    } catch (err) {
      const code = (err as { code?: string }).code
      if (code !== "SQLITE_CONSTRAINT_PRIMARYKEY") throw err
    }
  }
  throw new Error("could not allocate unique id after 3 attempts")
}

export function getLink(id: string): string | null {
  const row = selectStmt.get(id) as { payload: string } | undefined
  return row?.payload ?? null
}
