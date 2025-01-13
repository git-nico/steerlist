import type { User, UserInsert } from '$lib/server/db/schema/auth';

export interface UsersRepoInterface {
	createUser(user: UserInsert): Promise<void>;
	getUserByEmail(email: string): Promise<User>;
	exists(email: string): Promise<boolean>;
}
