<!-- https://www.bits-ui.com/docs/components/dialog#api-reference -->
<script lang="ts">
	import { Button, type ButtonRootProps } from 'bits-ui';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
		class?: string;
	} & ButtonRootProps;

	let { children, class: className, ...restProps }: Props = $props();
</script>

<!-- leading-[initial] / line-height: initial is needed to get the same height for anchors as for buttons -->
<Button.Root {...restProps} class={`rounded-xl bg-orange-600 px-4 py-2 leading-[initial] text-orange-50 ${className}`}>
	{@render children()}
</Button.Root>

<!-- Example
<Button class="inline-flex h-8 items-center bg-purple-400 align-top" href="/">Link</Button>
<Button class=" h-8 bg-purple-400 align-super py-0">Toggle</Button>
-->
