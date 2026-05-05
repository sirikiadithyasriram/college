import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';
import path from 'path';

// Create SQLite db
const dbPath = path.resolve(process.cwd(), 'sqlite.db');
const sqlite = new Database(dbPath);

// Create Drizzle ORM instance
export const db = drizzle(sqlite, { schema });

// Simple migration using raw sql for prototyping without heavy tooling
export function initDB() {
  sqlite.exec(`
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
}
