<script lang="ts">
	import Anchor from '$lib/components/Anchor.svelte';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { signUpSchema, type SignUpSchema } from './schema';

	let { data }: { data: SuperValidated<Infer<SignUpSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(signUpSchema),
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

	const { form: formData, enhance, constraints, reset } = form;
</script>

<form method="POST" use:enhance class="max-w-prose">
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input type="email" placeholder="name@example.com" {...props} {...$constraints.email} bind:value={$formData.email}></Input>
			{/snippet}
		</Form.Control>
		<Form.Description>You need to validate your email for most features to work!</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input type="password" {...props} {...$constraints.password} bind:value={$formData.password} autocomplete="new-password"></Input>
			{/snippet}
		</Form.Control>
		<Form.Description>8+ characters. Ideally a password manager!</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="w-full">Register</Form.Button>
	<div class="text-right">
		<span>Already have an account?</span>
		<Anchor href="/login">Sign-in instead!</Anchor>
	</div>
</form>
