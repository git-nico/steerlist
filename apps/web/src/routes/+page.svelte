<script lang="ts">
	import Contact from '$lib/components/icons/Contact.svelte';
	import Discord from '$lib/components/icons/Discord.svelte';
	import Sparkles from '$lib/components/icons/Sparkles.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import type { PageServerData } from './$types';
	import Hero from './Hero.svelte';
	import NewsleterForm from './NewsleterForm.svelte';
	import bgImage from './newsletter-bg.jpg?enhanced';

	let { data }: { data: PageServerData } = $props();

	// const isDelayedCallback = (isDelayed: boolean) => {
	// 	return isDelayed;
	// };

	let delayed = $state(false);

	const isDelayedCallback = (isDelayed: boolean) => {
		delayed = isDelayed;
	};
</script>

<Hero />

<section class="container py-8">
	<h2 class="scroll-m-20 border-b pb-2 font-serif text-3xl font-bold tracking-tight transition-colors first:mt-0">Popular Templates</h2>
	<p>[TODO: Show the most popular tierlists]</p>
</section>

<section class="container py-8">
	<h2 class="scroll-m-20 border-b pb-2 font-serif text-3xl font-bold tracking-tight transition-colors first:mt-0">Latest Templates</h2>
	<p>[TODO: Show the latest templates created]</p>
</section>

<section class="container py-8">
	<h2 class="scroll-m-20 border-b pb-2 font-serif text-3xl font-bold tracking-tight transition-colors first:mt-0">Trending Submissions</h2>
	<p>[TODO: Show the most "liked" tierlists]</p>
</section>

<section class="grow place-content-center">
	<div class="flex flex-col items-center justify-center gap-4 py-8 sm:flex-row">
		<Button variant="outline" href="/discord" rel="noopener noreferrer" target="_blank"><Discord />Join the community</Button>
		<Button variant="outline" href="/contact"><Contact />Contact</Button>
	</div>
</section>

<!-- <section class="brand-gradient px-inline py-8 lg:py-8">
	<div class="grid place-items-center [grid-template-areas:'stack']">
		<div class="inset-0 hidden w-full object-center [grid-area:stack] lg:block">
			<enhanced:img src={bgImage} alt="Newsletter background" class="h-[500px] rounded-lg object-cover" sizes="min(1000px, 100vw)" />
		</div>

		<div class="container place-content-center [grid-area:stack]">
			<Card.Root class="bg-card/80 backdrop-blur-xs mx-auto max-w-prose backdrop-sepia">
				<Card.Header>
					<Card.Title level={2} class="flex items-center gap-2 font-serif text-2xl font-bold tracking-tight">Sign-up for updates!</Card.Title>
					<Card.Description class="text-muted-foreground text-sm">Be among the first we notify when we release core new features!</Card.Description>
				</Card.Header>
				<Card.Content>
					<NewsleterForm id="email-form" data={data.feedbackForm} {isDelayedCallback} />
				</Card.Content>
				<Card.Footer>
					<Button type="submit" form="email-form" class="text- w-full">
						{#if delayed}
							<Spinner />
						{/if}
						Sign-up!
					</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
</section> -->
