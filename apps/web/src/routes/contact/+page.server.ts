import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		meta: {
			title: 'Contact',
			description: 'Find where to contact us and the best places to reach out for more help & info.',
		},
	};
};
