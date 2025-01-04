<script lang="ts">
	import type { SVGAttributes } from 'svelte/elements';

	let { ...restProps }: SVGAttributes<EventTarget> = $props();
</script>

<svg {...restProps} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
	<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
	<path fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"> </path>
</svg>

<style>
	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
	svg {
		animation: spin 1s linear infinite;
	}

	svg circle {
		opacity: 0.25;
	}

	svg path {
		opacity: 0.75;
	}
</style>
