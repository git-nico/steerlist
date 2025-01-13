import dotenvFlow from 'dotenv-flow';
import { defineConfig } from 'drizzle-kit';
import { readdirSync } from 'node:fs';
import { relative, resolve, sep } from 'node:path';

dotenvFlow.config();
if (process.env.NODE_ENV === 'production') {
	console.log('Using remote database');
}

function getLocalD1DB() {
	try {
		const currentPath = resolve('.');
		const basePath = resolve('.wrangler');

		const dbFile = readdirSync(basePath, { encoding: 'utf-8', recursive: true }).find(f => {
			const filePath = resolve(basePath, f);
			const pathArray = filePath.split(sep);
			return pathArray.length > 2 && pathArray.at(-1)?.endsWith('.sqlite') && pathArray.at(-3) === 'd1';
		});

		if (!dbFile) {
			throw new Error(`D1 Database not found in ${basePath}`);
		}
		const filePath = resolve(basePath, dbFile);
		const url = relative(currentPath, filePath);
		console.log(`Using local database at ${url}`);
		return url;
	} catch (err) {
		console.log(`Error  ${err}`);
	}
}

export default defineConfig({
	// Stores migration files, meta, and journal
	out: './drizzle',
	schema: './src/lib/server/db/schema',
	dialect: 'sqlite',
	// Print all statements
	verbose: true,
	// Always ask for confirmation
	strict: true,
	...(process.env.NODE_ENV === 'production'
		? {
				driver: 'd1-http',
				dbCredentials: {
					accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
					databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
					token: process.env.CLOUDFLARE_D1_TOKEN!,
				},
			}
		: {
				dbCredentials: {
					url: getLocalD1DB(),
				},
			}),
});
