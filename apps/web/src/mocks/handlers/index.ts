import { resendHandlers } from './resend';
import { sanityPassthroughHandlers } from './sanity';

export const handlers = [...resendHandlers, ...sanityPassthroughHandlers];
