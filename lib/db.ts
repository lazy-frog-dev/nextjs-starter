import pg from "pg";

// One pool per server process. DATABASE_URL is set by the platform in every environment.
const globalForDb = globalThis as unknown as { db?: pg.Pool };

export const db: pg.Pool =
  globalForDb.db ?? new pg.Pool({ connectionString: process.env.DATABASE_URL, max: 5 });

if (process.env.NODE_ENV !== "production") globalForDb.db = db;
