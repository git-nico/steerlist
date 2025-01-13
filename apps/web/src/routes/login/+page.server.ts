import { TEN_MINUTES_IN_SECONDS } from '$lib/constants';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': `public, max-age=${TEN_MINUTES_IN_SECONDS}s`,
	});

	return {
		meta: {
			title: 'Login',
			description: 'Sign-in or Sign-up for free, with our universal flow!',
		},
	};
};
