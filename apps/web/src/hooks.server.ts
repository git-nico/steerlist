import { MSW_ENABLED } from '$env/static/private';
import { sequence } from '@sveltejs/kit/hooks';
import type { RequestHandler, WebSocketHandler } from 'msw';
import { handleAuth } from './handles/authHandle';
import { dependencyInjectionHandle } from './handles/dependencyInjectionHandle';
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

// const demoHandle: Handle = async ({ event, resolve }) => {
// 	if (!event.platform) throw new Error('Cloudflare Platform not available!');

// 	const sql = `SELECT 'Hello Database!' AS greeting, CURRENT_TIMESTAMP AS now;`;
// 	const ps = event.platform.env.DEV_DB.prepare(sql);
// 	const data = await ps?.first();
// 	console.log('data', data);
// 	if (data && data.now) {
// 		const d = new Date(data.now + ' UTC');
// 		console.log('local timestamp:', d.toLocaleString());
// 	}

// 	const response = await resolve(event);
// 	return response;
// };

// const demoDrizzleHandle: Handle = async ({ event, resolve }) => {
// 	if (!event.platform) throw new Error('Cloudflare Platform not available!');

// 	const db = await createClient(event.platform.env.DEV_DB);
// 	const statement = sql`SELECT 'Hello Database via Drizzle!' AS greeting, CURRENT_TIMESTAMP AS now;`;
// 	const res = await db.get(statement);

// 	console.log(res);

// 	const response = await resolve(event);
// 	return response;
// };

export const handle = sequence(dependencyInjectionHandle, handleAuth);
