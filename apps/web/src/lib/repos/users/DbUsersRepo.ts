import type { db } from '$lib/server/db';
import type { UserInsert } from '$lib/server/db/schema/auth';
import * as table from '$lib/server/db/schema/auth';
import { eq } from 'drizzle-orm';
import type { UsersRepoInterface } from './UsersRepoInterface';

export class DbUsersRepo implements UsersRepoInterface {
	#db: db;

	constructor(db: db) {
		this.#db = db;
	}

	createUser = async (user: UserInsert) => {
		await this.#db.insert(table.user).values(user);
	};

	getUserByEmail = async (email: string) => {
		const user = await this.#db.select().from(table.user).where(eq(table.user.email, email));
		return user[0] ?? null;
	};

	exists = async (email: string) => {
		const user = await this.getUserByEmail(email);
		return user ? true : false;
	};
}
