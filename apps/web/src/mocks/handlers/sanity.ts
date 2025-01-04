import { http, passthrough } from 'msw';

export const sanityPassthroughHandlers = [http.all('https://*.api.sanity.io/*', () => passthrough())];
