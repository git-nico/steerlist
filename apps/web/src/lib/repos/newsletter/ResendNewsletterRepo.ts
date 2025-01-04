import { RESEND_API_KEY, RESEND_AUDIENCE_ID } from '$env/static/private';
import { Resend } from 'resend';
import type { UsersNewsletterRepoInterface } from './NewsletterRepoInterface';

export class ResendNewsletterRepo implements UsersNewsletterRepoInterface {
	#resend = new Resend(RESEND_API_KEY);
	async subscribe(email: string) {
		const { error } = await this.#resend.contacts.create({
			email,
			unsubscribed: false,
			audienceId: RESEND_AUDIENCE_ID,
		});

		if (error) {
			throw error;
		}
	}
}
