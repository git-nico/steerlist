<script lang="ts">
	import { dev } from '$app/environment';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { toast } from 'svelte-sonner';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type NewsletterSchema, newsletterSchema } from './schema';

	type Props = {
		id: string;
		data: SuperValidated<Infer<NewsletterSchema>>;
		isDelayedCallback?: (isDelayed: boolean) => void;
	};

	let { id, data, isDelayedCallback }: Props = $props();

	const form = superForm(data, {
		validators: zodClient(newsletterSchema),
		delayMs: 300,
		timeoutMs: 8000,
		resetForm: false,
		onSubmit: () => {
			toast.success('Submitting the form...');
		},
		taintedMessage: null,
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

	$effect(() => {
		isDelayedCallback && isDelayedCallback($delayed);
	});
</script>

<form method="POST" {id} class="flex flex-col gap-4" use:enhance>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>email</Form.Label>
				<Input type="email" placeholder="name@example.com" {...props} {...$constraints.email} bind:value={$formData.email}></Input>
			{/snippet}
		</Form.Control>
		<Form.Description>Your email address will not be published.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<!-- <Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>username</Form.Label>
				<Input type="text" {...props} bind:value={$formData.username}></Input>
			{/snippet}
		</Form.Control>
		<Form.Description>Between 6 and 20 characters.</Form.Description>
		<Form.FieldErrors />
	</Form.Field> -->
</form>

{#if dev}
	<SuperDebug data={formData} />
{/if}
