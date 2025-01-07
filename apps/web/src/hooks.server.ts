import { MSW_ENABLED } from '$env/static/private';
import { ResendNewsletterRepo } from '$lib/repos/newsletter/ResendNewsletterRepo';
import { HardcodedProgramRepo } from '$lib/repos/programme/HardcodedProgramRepo';
import { SanityProgramRepo } from '$lib/repos/programme/SanityProgramRepo';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import type { RequestHandler, WebSocketHandler } from 'msw';
// import { mswServer } from './mocks/node';

// this file is only read once at the very first request to the server
if (MSW_ENABLED === 'true') {
	console.log('start MSW server');
	import('./mocks/node').then(({ mswServer }) => {
		// mswServer.listen({ onUnhandledRequest: dev ? 'warn' : 'bypass' });
		// mswServer.listen({ onUnhandledRequest: 'error' });
		mswServer.listen();

		// list all handlers
		console.log('MSW handlers:');
		mswServer.listHandlers().forEach((handler: WebSocketHandler | RequestHandler) => {
			console.log('- ', (handler as RequestHandler).info.header);
		});
	});
}

const dependencyInjectionHandle: Handle = async ({ event, resolve }) => {
	event.locals.newsletterRepo = new ResendNewsletterRepo();
	event.locals.hardcodedProgrammeRepo = new HardcodedProgramRepo();
	event.locals.programmeRepo = new SanityProgramRepo();

	const response = await resolve(event);
	return response;
};

const demoHandle: Handle = async ({ event, resolve }) => {
	if (!event.platform) throw new Error('DEV_DB not found');

	const sql = `SELECT 'Hello Database!' AS greeting, CURRENT_TIMESTAMP AS now;`
	const ps = event.platform.env.DEV_DB.prepare(sql);
	const data = await ps?.first();
	console.log('data', data);
	if (data && data.now) {
		const d = new Date(data.now + ' UTC');
		console.log('local timestamp:', d.toLocaleString());
	}

	const response = await resolve(event);
	return response;
};

export const handle = sequence(dependencyInjectionHandle, demoHandle);
