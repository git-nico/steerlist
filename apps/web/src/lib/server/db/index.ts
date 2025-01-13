import { drizzle } from 'drizzle-orm/d1';

/**
 * @throws {Error} When Cloudflare Platform is not available
 */
export const createClient = (platformDb: D1Database | undefined) => {
	if (!platformDb) throw new Error('Cloudflare Platform not available!');
	return drizzle(platformDb, { logger: true });
};

export type db = ReturnType<typeof createClient>;
