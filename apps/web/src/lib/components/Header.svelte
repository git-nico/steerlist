<script lang="ts">
	import ThemeToggleIcon from '$lib/components/ThemeToggleIcon.svelte';
	import { Button } from '$lib/components/ui/button';
	import ShipWheel from './icons/ShipWheel.svelte';

	let toggleElement: HTMLElement | null;

	function toggle() {
		if (window?.toggleTheme) {
			const theme = window?.toggleTheme();
			toggleElement?.setAttribute('aria-label', theme);
		}
	}

	$effect(() => {
		toggleElement = document.getElementById('theme-toggle');
		if (toggleElement && window?.getTheme) {
			toggleElement.setAttribute('aria-label', window?.getTheme());
		}
	});
</script>

<!-- <header class="my-1 flex flex-grow items-stretch justify-between pr-2"> -->
<header class="px-inline flex items-center justify-between py-2">
	<Button variant="ghost" href="/" class="text-md font-serif font-black [&_svg]:size-6"><ShipWheel /> Steerlist</Button>
	<div class="flex items-center gap-2">
		<nav>
			<Button variant="ghost" href="/contact">Contact</Button>
			<Button variant="ghost" href="/sign-up">Login</Button>
		</nav>

		<Button id="theme-toggle" variant="ghost" size="icon" class="p-1 text-amber-700 hover:bg-transparent hover:text-amber-500 dark:text-blue-200 dark:hover:text-blue-400 [&_svg]:!size-full" onclick={() => toggle()} title="Toggles Light & Dark"><ThemeToggleIcon /></Button>
	</div>
</header>

<style>
	header {
		view-transition-name: header;
	}
</style>
