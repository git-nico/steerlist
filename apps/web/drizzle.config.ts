import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	// Stores migration files, meta, and journal
	out: './drizzle',
	schema: './src/lib/server/db/schema/*.ts',
	dialect: 'sqlite',
	driver: 'd1-http',
	dbCredentials: {
		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
		databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
		token: process.env.CLOUDFLARE_D1_TOKEN!,
	},
	// Print all statements
	verbose: true,
	// Always ask for confirmation
	strict: true,
});
