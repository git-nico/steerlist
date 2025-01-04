import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': `public, ${60 * 5}s`,
	});

	return {
		meta: {
			title: 'Random',
			description: '[TODO: Server-side redirect to a random tier-list]',
		},
	};
};
