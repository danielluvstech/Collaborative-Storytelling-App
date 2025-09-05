import 'dotenv/config';
import { Pool, QueryResultRow } from 'pg';

const isProd = process.env.NODE_ENV === 'production';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProd ? { rejectUnauthorized: false } : undefined,
});

// Constrain T so it satisfies pg's typing rules
export async function query<T extends QueryResultRow = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[] }> {
  return pool.query<T>(text, params);
}
