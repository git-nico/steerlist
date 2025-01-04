import { http, HttpResponse } from 'msw';
import { randomUUID } from 'node:crypto';
import type { CreateContactOptions, CreateContactResponseSuccess } from 'resend';
import { getErrorMessage } from './http-errors';

const RESEND_URL_CONTACTS: string = 'https://api.resend.com/audiences/:audienceId/contacts';

export const resendHandlers = [
	http.post(RESEND_URL_CONTACTS, async ({ request, params }) => {
		const { audienceId } = params;
		console.log('audienceId', audienceId);

		const contactData = (await request.json()) as CreateContactOptions;
		console.log('contactData', contactData);

		// Sending an email address containg the word 'error' will result in a network error
		if (contactData.email.includes('error')) {
			// returns a network error
			console.log('MOCK Network Error');
			return HttpResponse.error();
		}

		// Sending an HTTP 4xx client error as the username part of an email address will result in a client error
		// for example : 401@mail.com
		const re = new RegExp('^(40[0-9]|41[0-8]|42[1-9]|43[14]|451)@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$', 'i');
		const match = contactData.email.match(re);
		if (match) {
			const statusCode = parseInt(match[1], 10);
			console.log(`MOCK ${statusCode} client error`);
			// return new HttpResponse(JSON.stringify({ message: getErrorMessage(statusCode) }), { status: statusCode });
			return HttpResponse.json({ message: getErrorMessage(statusCode) }, { status: statusCode });
		}

		const responseSuccess: CreateContactResponseSuccess = {
			object: 'contact',
			id: randomUUID(),
		};

		// Successful response
		return HttpResponse.json(responseSuccess, {
			status: 201,
		});
	}),
];
