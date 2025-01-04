<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		href: string;
		outbound?: boolean;
		class?: string;
	} & HTMLAnchorAttributes;

	let { children, href, outbound = false, class: className, ...restProps }: Props = $props();
</script>

{#if outbound}
	<a {href} {...restProps} class={`${className} decoration-primary hover:text-primary focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0`} rel="noopener noreferrer" target="_blank">
		{@render children()}
	</a>
{:else}
	<a {href} {...restProps} class={`${className} decoration-primary hover:text-primary focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium underline underline-offset-2 transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0`}>
		{@render children()}
	</a>
{/if}
