import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { randomUUID } from 'node:crypto';

export const user = sqliteTable(
	'user',
	{
		id: text('id')
			.primaryKey()
			.$default(() => randomUUID()),
		email: text('email').notNull().unique(),
		username: text('username'),
		name: text('name'),
		avatarUrl: text('avatar_url'),
		emailVerified: integer('email_verified', { mode: 'boolean' }).default(false),
		passwordHash: text('password_hash').notNull(),
	}
	// Not nenessary because unique() already implements a CREATE UNIQUE INDEX
	// table => [uniqueIndex('email_idx').on(table.email)]
);

export const session = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
});

export type Session = typeof session.$inferSelect;
export type SessionInsert = typeof session.$inferInsert;

export type User = typeof user.$inferSelect;
export type UserInsert = typeof user.$inferInsert;
