import { TEN_MINUTES_IN_SECONDS } from '$lib/constants';
import { hash } from '$lib/server/crypto';
import { error, redirect } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from '../$types';
import { signUpSchema } from './schema';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': `public, max-age=${TEN_MINUTES_IN_SECONDS}s`,
	});

	const superForm = await superValidate(zod(signUpSchema));

	return {
		superForm,
		meta: {
			title: 'Sign-up',
			description: 'Sign-up for a new account: Forever Free!',
		},
	};
};

export const actions: Actions = {
	default: async ({ request, locals: { usersRepo } }) => {
		const form = await superValidate(request, zod(signUpSchema));
		if (!form.valid) {
			console.log('Form not valid!');
			return fail(400, { form });
		}

		const { email, password } = form.data;

		const isExistingUser = await usersRepo.exists(email);

		console.log('existing user', isExistingUser);

		if (isExistingUser) {
			return message(form, { type: 'error', text: `We already have a user ${email}! Try to login instead` });
		}

		try {
			const result = await usersRepo.createUser({ email, passwordHash: await hash(password) });
			console.log('result', result);
		} catch (e) {
			if (e instanceof Error) {
				console.log('error', e.message);
				error(500, e.message);
			}
		}

		redirect(307, '/');

		// return {
		// 	form,
		// };
	},
};
