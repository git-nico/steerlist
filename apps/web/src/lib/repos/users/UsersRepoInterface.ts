import type { User, UserInsert } from '$lib/server/db/schema/auth';

export interface UsersRepoInterface {
	createUser(user: UserInsert): Promise<string>;
	getUserByEmail(email: string): Promise<User>;
	exists(email: string): Promise<boolean>;
}
