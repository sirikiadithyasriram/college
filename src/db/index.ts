import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

// Railway volumes mount at /data
const dbPath = path.resolve(process.env.NODE_ENV === "production" ? "/data/sqlite.db" : "sqlite.db");

// Ensure production DB folder exists
if (process.env.NODE_ENV === "production" && !fs.existsSync("/data")) {
  fs.mkdirSync("/data", { recursive: true });
}

let sqlite: Database;

// Try to open DB safely
try {
  sqlite = new Database(dbPath, {
    fileMustExist: false,
    timeout: 5000,
  });
} catch (err) {
  console.error("Failed to open SQLite DB:", err);
  throw err;
}

export const db = drizzle(sqlite, { schema });

// Auto recover from corruption
function resetDB() {
  console.log("Deleting corrupted sqlite.db …");
  try {
    fs.unlinkSync(dbPath);
  } catch {}
  console.log("Recreating clean database …");
  sqlite = new Database(dbPath);
}

// Initialize schema
export function initDB() {
  try {
    sqlite.exec(`
      PRAGMA journal_mode = WAL;
      PRAGMA synchronous = NORMAL;

      CREATE TABLE IF NOT EXISTS colleges (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE,
        location TEXT NOT NULL,
        state TEXT NOT NULL,
        type TEXT NOT NULL,
        rating REAL NOT NULL,
        ranking INTEGER,
        fees_annual INTEGER NOT NULL,
        placement_average_lpa REAL NOT NULL,
        placement_highest_lpa REAL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        logo_url TEXT NOT NULL,
        website TEXT
      );

      CREATE TABLE IF NOT EXISTS courses (
        id TEXT PRIMARY KEY,
        college_id TEXT NOT NULL,
        name TEXT NOT NULL,
        degree TEXT NOT NULL,
        duration_years INTEGER NOT NULL,
        fees_annual INTEGER NOT NULL,
        FOREIGN KEY (college_id) REFERENCES colleges(id)
      );

      CREATE TABLE IF NOT EXISTS shortlists (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        college_id TEXT NOT NULL,
        created_at INTEGER NOT NULL,
        FOREIGN KEY (college_id) REFERENCES colleges(id)
      );

      CREATE INDEX IF NOT EXISTS idx_colleges_slug ON colleges(slug);
      CREATE INDEX IF NOT EXISTS idx_courses_college_id ON courses(college_id);
      CREATE INDEX IF NOT EXISTS idx_shortlists_user_id ON shortlists(user_id);
    `);
  } catch (err: any) {
    console.error("DB init failed:", err);

    // Auto-fix corruption
    if (err.message.includes("malformed")) {
      resetDB();
      initDB(); // retry
    } else {
      throw err;
    }
  }
}
