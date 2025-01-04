<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Toaster from '$lib/components/Toaster.svelte';
	import '@fontsource/cherry-swash';
	import '../app.css';

	let { children } = $props();

	const defaultMeta = {
		title: 'Steerlist ☸️',
		description: 'The fitness app for the rest of us',
		ogImageUrl: '/og.jpg',
	};

	let title = $derived(page.data.meta?.title ? `${page.data.meta.title} ☸️ Steerlist` : defaultMeta.title);
	let description = $derived(page.data.meta?.description ? page.data.meta.description : defaultMeta.description);
	let ogImageUrl = $derived(`${page.url.origin}${page.data.meta?.ogImageUrl ? page.data.meta.ogImageUrl : defaultMeta.ogImageUrl}`);

	onNavigate(navigation => {
		if (document.startViewTransition && navigation.from?.url.href !== navigation.to?.url.href) {
			if (navigation.delta && navigation.delta < 0) {
				document.documentElement.dataset.back = 'true';
			} else {
				document.documentElement.removeAttribute('data-back');
			}

			return new Promise(resolve => {
				document.startViewTransition &&
					document.startViewTransition(async () => {
						resolve();
						await navigation.complete;
					});
			});
		}
	});

	$effect(() => {
		// Add data-testid now our ap is hydrated
		// We wil have Playwright "wait" for this before starting any test
		document.documentElement.dataset.testid = 'hydrated';
		// if (import.meta.env.DEV) {
		// 	document.documentElement.dataset.testid = 'hydrated';
		// }
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Gainzatron" />
	<meta property="og:url" content={page.url.href} />

	<meta property="og:image" content={ogImageUrl} />
	<meta name="twitter:card" content="summary_large_image" />

	<meta name="msapplication-TileColor" content="#f97316" />
	<meta name="theme-color" content="#f97316" />
	<!-- Static, move to app.html -->
	<!--
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="manifest" href="/site.webmanifest" />
	-->
</svelte:head>

<Header />

{@render children()}

<div></div>

<Footer />

<!-- https://github.com/wobsoriano/svelte-sonner -->
<Toaster expand richColors visibleToasts={9} duration={5000} />
