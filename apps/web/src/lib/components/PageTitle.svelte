<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & HTMLAttributes<HTMLHeadingElement>;

	let { children, class: className, ...restProps }: Props = $props();
</script>

<h1 {...restProps} class={`${className || ''} scroll-m-20 font-serif text-5xl font-bold tracking-tight lg:text-6xl`}>
	{@render children()}
</h1>
