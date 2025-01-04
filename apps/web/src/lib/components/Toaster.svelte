<script lang="ts">
	import { Toaster as Sonner, type ToasterProps as SonnerProps } from 'svelte-sonner';

	let mode = $state<'light' | 'dark'>('dark');

	$effect(() => {
		// the data-theme attribute is already set
		const htmlTheme = document.documentElement.dataset.theme;
		if (htmlTheme === 'light' || htmlTheme === 'dark') {
			mode = htmlTheme;
		}

		const themeObserver = new MutationObserver(() => {
			const nextTheme = document.documentElement.dataset.theme;
			if (nextTheme === 'light' || nextTheme === 'dark') {
				mode = nextTheme;
			}
		});
		themeObserver.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme'],
		});
	});

	let restProps: SonnerProps = $props();
</script>

<Sonner
	theme={mode}
	class="toaster group"
	toastOptions={{
		classes: {
			toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
			description: 'group-[.toast]:text-muted-foreground',
			actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
			cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
		},
	}}
	{...restProps} />
