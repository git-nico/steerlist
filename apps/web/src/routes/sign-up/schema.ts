import { z } from 'zod';

export const signUpSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});

export type SignUpSchema = typeof signUpSchema;
