<script lang="ts">
	import Heart from 'lucide-svelte/icons/heart';

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();
</script>

<div>
	<Heart class={`${className} fill-primary text-primary absolute w-4 hover:animate-ping`} />
	<Heart class={` ${className} fill-primary/50 stroke-primary w-4`} />
</div>
