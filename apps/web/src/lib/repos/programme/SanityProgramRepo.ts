import { dev } from '$app/environment';
import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';
import type { ProgrammeRepoInterface, WorkoutWeek } from '$lib/repos/programme/ProgrammeRepoIngerface';
import { createClient, type ClientConfig } from '@sanity/client';
import { defineQuery } from 'groq';
import { marked } from 'marked';

const config: ClientConfig = {
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	useCdn: !dev, // set to `false` to bypass the edge cache
	apiVersion: new Date().toISOString().slice(0, 10), // use current date (YYYY-MM-DD) to target the latest API version
};

const GET_LAST_WEEK = defineQuery(`*[_type == "workoutWeek"] | order(publishedAt desc)[0] {
	...,
	days[]->{
		...,
		blocks[]{
            ...,
            exercise->{...}
		}
	}
}`);

export class SanityProgramRepo implements ProgrammeRepoInterface {
	#client = createClient(config);
	async getCurrent(): Promise<WorkoutWeek> {
		const workoutWeek = await this.#client.fetch<WorkoutWeek>(GET_LAST_WEEK);
		// console.dir(workoutWeek, { depth: 6 });
		return {
			...workoutWeek,
			description: await marked.parseInline(workoutWeek.description),
			days: await Promise.all(
				workoutWeek.days.map(async day => ({
					...day,
					description: await marked.parseInline(day.description),
				}))
			),
		};
	}
}
