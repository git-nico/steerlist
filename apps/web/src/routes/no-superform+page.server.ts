import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email') as string;
		console.log('TODO: Create a contact for the user with email', email);

		await new Promise(resolve => setTimeout(resolve, 3000));

		if (email === 'nico@gmail.com') {
			return fail(500, { message: 'Invalid email, please try again.' });
		}

		if (email.includes('error')) {
			error(400, 'Something went wrong, please try again.');
		}

		return {
			message: "Super! You're signed up, thank you!",
			email,
		};
	},
};
