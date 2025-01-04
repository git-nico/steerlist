<script lang="ts">
	import Lead from '$lib/components/Lead.svelte';
	import PageTitle from '$lib/components/PageTitle.svelte';
	import SectionTitle from '$lib/components/SectionTitle.svelte';

	let { data } = $props();
</script>

<main class="container flex grow flex-col gap-6">
	<PageTitle>{data.meta.title}</PageTitle>

	<p>{data.meta.description}</p>
</main>

<!-- <BitsBtn class="bg-slate-300 text-black" onclick={() => console.log('clicked')}>Download</BitsBtn> -->
