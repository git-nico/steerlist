// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ResendNewsletterRepo } from '$lib/repos/newsletter/ResendNewsletterRepo';
import type { SanityProgramRepo } from '$lib/repos/programme/SanityProgramRepo';

// for information about these interfaces
declare global {
	interface Window {
		toggleTheme?: () => 'dark' | 'light';
		getTheme?: () => 'dark' | 'light';
	}
	namespace App {
		// interface Error {}
		interface Locals {
			newsletterRepo: ResendNewsletterRepo;
			hardcodedProgrammeRepo: HardcodedProgramRepo;
			programmeRepo: SanityProgramRepo;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		namespace Superforms {
			type Message = {
				type: 'error' | 'success';
				text: string;
			};
		}
	}
}

export {};
