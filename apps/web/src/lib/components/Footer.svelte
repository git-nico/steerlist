<script>
	import Anchor from './Anchor.svelte';
	import Discord from './icons/Discord.svelte';
	import GitHub from './icons/GitHub.svelte';
	import YouTube from './icons/YouTube.svelte';
	import PulsingHeart from './PulsingHeart.svelte';
</script>

<footer class="px-inline mt-[5svh] flex flex-col items-center justify-center pb-6">
	<section class="flex items-center justify-center gap-2">
		<div class="flex flex-shrink-0 flex-row items-center justify-center gap-2">
			Made with by
			<PulsingHeart />
			<!-- <PulsingHeart class="w-6 fill-green-500 stroke-white text-white" /> -->
			by
			<Anchor href="https://x.com/nico">Nico</Anchor>
			<div class="flex items-center">
				<Anchor href="https://www.youtube.com/@gainzatron-live" class="text-md size-10 place-self-start [&_svg]:size-5"><YouTube /></Anchor>
				<Anchor href="https://github.com/git-nico/portfolio.git" class="text-md size-10 place-self-start [&_svg]:size-5"><GitHub /></Anchor>
				<Anchor href="https://discord.gg/gainzatron-live" class="text-md size-10 place-self-start [&_svg]:size-5"><Discord /></Anchor>
			</div>
		</div>
	</section>
	<section class="flex w-full items-center justify-center gap-2">
		Read Our
		<Anchor href="/terms">Terms of Service</Anchor>
		&
		<Anchor href="/privacy-policy">Privacy Policy</Anchor>
	</section>
</footer>

<style>
	footer {
		view-transition-name: footer;
	}
</style>
