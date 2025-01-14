import { TEN_MINUTES_IN_SECONDS } from '$lib/constants';
import * as auth from '$lib/server/auth';
import { verify } from '$lib/server/crypto';
import { createClient } from '$lib/server/db';
import { error, redirect } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { loginSchema } from './schema';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({
		'Cache-Control': `public, max-age=${TEN_MINUTES_IN_SECONDS}s`,
	});

	const superForm = await superValidate(zod(loginSchema));

	return {
		superForm,
		meta: {
			title: 'Login',
			description: 'Sign-in or Sign-up for free, with our universal flow!',
		},
	};
};

export const actions: Actions = {
	default: async event => {
		const {
			request,
			locals: { usersRepo },
		} = event;

		const form = await superValidate(request, zod(loginSchema));
		if (!form.valid) {
			console.log('Form not valid!');
			return fail(400, { form });
		}

		const { email, password } = form.data;

		try {
			const { passwordHash, id } = await usersRepo.getUserByEmail(email);

			if (!(await verify(password, passwordHash))) {
				return message(form, { type: 'error', text: `We could not log you in. Please check your email and password.` });
			}
			const db = createClient(event.platform?.env.DEV_DB);
			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(db, sessionToken, id);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			if (e instanceof Error) {
				console.log('error', e.message);
				error(500, e.message);
			}
		}

		redirect(302, '/');

		// return {
		// 	form,
		// };
	},
};
