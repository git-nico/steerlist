import { ResendNewsletterRepo } from '$lib/repos/newsletter/ResendNewsletterRepo';
import { HardcodedProgramRepo } from '$lib/repos/programme/HardcodedProgramRepo';
import { SanityProgramRepo } from '$lib/repos/programme/SanityProgramRepo';
import { DbUsersRepo } from '$lib/repos/users/DbUsersRepo';
import { createClient } from '$lib/server/db';
import type { Handle } from '@sveltejs/kit';

export const dependencyInjectionHandle: Handle = async ({ event, resolve }) => {
	event.locals.newsletterRepo = new ResendNewsletterRepo();
	event.locals.hardcodedProgrammeRepo = new HardcodedProgramRepo();
	event.locals.programmeRepo = new SanityProgramRepo();

	const db = createClient(event.platform?.env.DEV_DB);

	event.locals.usersRepo = new DbUsersRepo(db);

	const response = await resolve(event);
	return response;
};
