<script lang="ts">
	import Edit from '$lib/components/icons/Edit.svelte';
	import Gem from '$lib/components/icons/Gem.svelte';
	import ShipWheel from '$lib/components/icons/ShipWheel.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="stack">
	<!-- <div class="background bg-black"></div> -->
	<div class="mx-3 my-2 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/90 sm:m-4 lg:mx-8 lg:my-4"></div>
	<!-- <div class="place-self-center text-center max-w-fit"> -->
	<!-- <div class="gap-4 place-self-center py-4 text-center"> -->
	<div class="flex h-full flex-col items-center justify-around place-self-center py-6">
		<ShipWheel class="text-primary/90 mx-auto size-20 self-center sm:size-24  lg:size-28" />

		<h1 class="card bg-brand place-self-center bg-clip-text text-5xl text-transparent sm:text-6xl lg:text-7xl">Steerlist</h1>
		<div class="flex flex-col items-center">
			<Button size="lg" variant="default" href="/random" class="my-4 w-full text-lg stroke-2" onclick={() => console.log('clicked')}><Gem class="!size-6" />Try a random tierlist!</Button>
			<Button size="lg" variant="outline" href="/random" class="text-lg"><Edit class="!size-6" />Make your own template!</Button>
		</div>
	</div>
</div>

<style>
	.stack {
		/* background: linear-gradient(45deg in hsl longer, orange, teal); */
		/* background: linear-gradient(90deg in oklch, orange, teal); */
		/* background: linear-gradient(135deg in oklab, orange, teal); */
		/* background: linear-gradient(135deg in oklab, #8B5CF6, #2DD4BF); */
		background: linear-gradient(to bottom right in oklab, #8b5cf6 10%, #c4b5fd 40%, #2dd4bf);
		/* background: linear-gradient(to bottom right in oklab, #2dd4bf, #c4b5fd 60%, #8b5cf6 90%); */
		min-height: 50svh;
	}

	/* .background {
		margin: 1rem;
		border-radius: 0.75rem;
		background: linear-gradient(135deg in oklab, #1c1917, #292524);
	} */

	/* h1 {
		background: linear-gradient(135deg in oklab, orange, teal);
		color: transparent;
		background-clip: text;
		font-size: 4rem;
		font-weight: bold;
	} */
</style>
