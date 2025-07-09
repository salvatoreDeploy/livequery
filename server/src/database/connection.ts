import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../env.ts';
import { schema } from './schema/index.ts';

export const sqlClient = postgres(env.DATABASE_URL);
export const database = drizzle(sqlClient, {
  schema,
  casing: 'snake_case'
});
