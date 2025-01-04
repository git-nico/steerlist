import { z } from 'zod';

export const newsletterSchema = z.object({
	email: z.string().email(),
	// username: z.string().min(6).max(20),
});

export type NewsletterSchema = typeof newsletterSchema;
