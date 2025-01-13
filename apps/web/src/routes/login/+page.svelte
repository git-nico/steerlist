<script lang="ts">
	import PageTitle from '$lib/components/PageTitle.svelte';
	import LoginForm from './LoginForm.svelte';
</script>

<main class="container flex grow flex-col gap-6">
	<PageTitle>Login</PageTitle>
	<p>Sign-in or Sign-up for <strong>free</strong>, with our universal flow!</p>

	<LoginForm />
</main>
