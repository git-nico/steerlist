import { dev } from '$app/environment';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { newsletterSchema } from './schema';

export const load: PageServerLoad = async () => ({
	feedbackForm: await superValidate(zod(newsletterSchema)),
});

/* Refactored with Repo
export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(newsletterSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// timeout to see the Spinner in development
		dev && (await new Promise((resolve) => setTimeout(resolve, 3000)));

		const { email } = form.data;

		if (email === 'nico@gmail.com') {
			return message(form, { type: 'error', text: 'Invalid email, please try again.' });
		}

		// no longer needed, MSW can throw a network error
		// if (email.includes('error')) {
		//     error(500, 'Something went wrong, please try again.');
		// }

		const resend = new Resend(RESEND_API_KEY);

		// create a block scope to avoid conflict between the svelte error method and the resend error object
		{
			const { error } = await resend.contacts.create({
				email,
				unsubscribed: false,
				audienceId: RESEND_AUDIENCE_ID,
			});

			if (error) {
				console.dir(error);
				return message(form, { type: 'error', text: error.message });
			}
		}

		return message(form, { type: 'success', text: "Super! You're signed up, thank you!" });

		// return {
		// 	form,
		// 	message: "Super! You're signed up, thank you!",
		// };
	},
};
*/

export const actions: Actions = {
	default: async ({ request, locals: { newsletterRepo } }) => {
		const form = await superValidate(request, zod(newsletterSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// timeout to see the Spinner in development
		dev && (await new Promise(resolve => setTimeout(resolve, 3000)));

		const { email } = form.data;

		if (dev) {
			if (email === 'nico@gmail.com') {
				return message(form, { type: 'error', text: 'Invalid email, please try again.' });
			}
		}

		try {
			newsletterRepo.subscribe(email);
		} catch (error) {
			if (error instanceof Error) {
				return message(form, { type: 'error', text: error.message });
			} else {
				return message(form, { type: 'error', text: 'We had a problem signing you up, please try again.' });
			}
		}

		return message(form, { type: 'success', text: "Super! You're signed up, thank you!" });
	},
};
