import { drizzle } from 'drizzle-orm/d1';

export const createClient = async (platformDb: D1Database) => drizzle(platformDb);

export type DBClient = ReturnType<typeof createClient>;
