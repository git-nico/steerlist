// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
	},

	// Force to use runes for entire project INCLUDING node_modules unfortunately
	compilerOptions: {
		runes: true,
	},

	vitePlugin: {
		// https://github.com/sveltejs/vite-plugin-svelte
		// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/inspector.md
		inspector: true,
		// toggleKeyCombo: 'alt-x',
		// showToggleButton: 'always',
		// toggleButtonPos: 'bottom-right'
		// the dynamicCompileOptions is a work around where you can have it set runes mode back to undefined for those files
		dynamicCompileOptions({ filename }) {
			if (filename.includes('node_modules')) {
				return { runes: undefined }; // or false, check what works
			}
		},
	},
};

export default config;
