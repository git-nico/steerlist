<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & HTMLAttributes<HTMLHeadingElement>;

	let { children, class: className, ...restProps }: Props = $props();
</script>

<h2 {...restProps} class={`${className || ''} scroll-m-20 border-b pb-2 font-serif text-3xl font-bold tracking-tight transition-colors first:mt-0`}>
	{@render children()}
</h2>
