<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		children: Snippet;
		class?: string;
	} & HTMLAttributes<HTMLParagraphElement>;

	let { children, class: className, ...restProps }: Props = $props();
</script>

<h2 {...restProps} class={`${className || ''} text-muted-foreground text-xl`}>
	{@render children()}
</h2>
