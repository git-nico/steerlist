<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte';
	import type { PageServerData } from './$types';
	import LoginForm from './LoginForm.svelte';

	let { data }: { data: PageServerData } = $props();

</script>

<main class="container flex grow flex-col gap-6">
	<PageTitle>Login</PageTitle>
	<p>Sign-in or Sign-up for <strong>free</strong>, with our universal flow!</p>

	<LoginForm data={data.superForm} />
</main>
