<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { loginSchema, type LoginSchema } from './schema';

	let { data }: { data: SuperValidated<Infer<LoginSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(loginSchema),
		resetForm: false,
		onUpdated: ({ form }) => {
			if (form.message) {
				if (form.message.type === 'success') {
					toast.success(form.message.text);
					reset();
				} else {
					toast.error(form.message.text);
				}
			}
		},
		onError: ({ result }) => {
			toast.error(result.error.message);
		},
	});

	const { form: formData, enhance, constraints, reset, delayed } = form;
</script>

<form method="POST" use:enhance class="max-w-prose">
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input type="email" placeholder="name@example.com" {...props} {...$constraints.email} bind:value={$formData.email}></Input>
			{/snippet}
		</Form.Control>
		<Form.Description>The email address you signed-up with</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input type="password" {...props} {...$constraints.password} bind:value={$formData.password} autocomplete="current-password"></Input>
			{/snippet}
		</Form.Control>
		<Form.Description>8+ characters. Ideally use a password manager!</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="relative w-full">
		Sign-in
		{#if $delayed}
			<Spinner class="absolute right-4" />
		{/if}
	</Form.Button>
	<div class="text-right">
		<span>Don't have an account?</span>
		<Anchor href="/sign-up">Sign-up for free!</Anchor>
	</div>
</form>
