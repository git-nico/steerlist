<script lang="ts">
	import { enhance } from '$app/forms';
	import Contact from '$lib/components/icons/Contact.svelte';
	import Discord from '$lib/components/icons/Discord.svelte';
	import Sparkles from '$lib/components/icons/Sparkles.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import Hero from './Hero.svelte';
</script>

<Hero />

<section class="grow place-content-center">
	<div class="flex flex-col items-center justify-center gap-4 py-8 sm:flex-row">
		<Button variant="outline" href="/discord" rel="noopener noreferrer" target="_blank"><Discord />Join the community</Button>
		<Button variant="outline" href="/personal"><Sparkles />Generate a programme</Button>
		<Button variant="outline" href="/contact"><Contact />Contact</Button>
	</div>
</section>

<section class="px-inline py-2 lg:py-8">
	<div class="container place-content-center">
		<Card.Root class="bg-card/80 mx-auto max-w-prose backdrop-blur-md backdrop-sepia">
			<Card.Header>
				<Card.Title level={2} class="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight">Sign-up for updates!</Card.Title>
				<Card.Description class="text-muted-foreground text-sm">Be among the first we notify when we release core new features!</Card.Description>
			</Card.Header>
			<Card.Content>
				<form
					method="POST"
					id="email-form"
					class="flex flex-col gap-4"
					use:enhance={() => {
						toast.success('Submitting the form...');
						return ({ result }) => {
							console.dir(result);
							if (result.type === 'success' && result.data && typeof result.data.message === 'string') {
								// toast.success("You're signed up, thank you!");
								toast.success(result.data.message);
							} else if (result.type === 'failure' && result.data && typeof result.data.message === 'string') {
								toast.error(result.data.message);
							} else if (result.type === 'error') {
								toast.error(result.error.message);
							} else {
								toast.error('unknown error');
							}
						};
					}}>
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" placeholder="name@example.com" required aria-required="true"></Input>
				</form>
			</Card.Content>
			<Card.Footer>
				<Button type="submit" form="email-form" class="text- w-full">Sign-up!</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</section>
