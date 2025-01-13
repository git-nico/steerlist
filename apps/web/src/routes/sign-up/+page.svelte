<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte';
	import type { PageServerData } from './$types';
	import SignUpForm from './SignUpForm.svelte';

	let { data }: { data: PageServerData } = $props();
</script>

<main class="container flex grow flex-col gap-6">
	<PageTitle>Sign-up</PageTitle>

	<SignUpForm data={data.superForm} />
</main>
