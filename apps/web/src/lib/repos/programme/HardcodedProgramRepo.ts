import type { ProgrammeRepoInterface, WorkoutDay, WorkoutWeek } from '$lib/repos/programme/ProgrammeRepoIngerface';
import { marked } from 'marked';

const lowerOne: WorkoutDay = {
	name: 'Lower 1',
	description: '**Squat** focus lift with **lower body** accessories',
	blocks: [
		{
			type: 'focus',
			exercise: {
				name: 'Squat',
				tutorial: { author: 'Alan Thrall', href: 'https://www.youtube.com/watch?v=bs_Ej32IYgo' },
				equipment: ['barbell'],
			},
			sets: 1,
			reps: { min: 2, max: 4 },
			rir: 1.5,
			notes: 'Warmup sets on the way up as usual',
			featuredValue: { value: 110, unit: 'kg' },
		},
		{
			type: 'backoff',
			exercise: {
				name: 'Pause Squat',
				tutorial: { author: 'Jeff Nippard', href: 'https://www.youtube.com/watch?v=1Rd1QgA46hQ' },
				equipment: ['barbell'],
			},
			sets: 2,
			reps: 5,
			rir: 1.5,
			notes: '2" pause at the bottom',
			featuredValue: { value: 75, unit: 'kg' },
		},
		{
			type: 'general',
			exercise: {
				name: 'Barbell RDL',
				tutorial: { author: 'Jeff Nippard', href: 'https://www.youtube.com/watch?v=_oyxCn2iSjU?t=95' },
				equipment: ['barbell'],
			},
			sets: 3,
			reps: { min: 8, max: 10 },
			rir: 1.5,
			notes: 'Slow. Grind against your legs as much as you can.',
			featuredValue: { value: 80, unit: 'kg' },
		},
		{
			type: 'general',
			exercise: {
				name: 'Step-back Lunge',
				tutorial: { author: 'ReloadPTandFitness', href: 'https://www.youtube.com/watch?v=fFdI96yZI18' },
				equipment: ['barbell'],
				isUnilateral: true,
			},
			sets: 2,
			reps: 5,
			rir: 1.5,
			notes: 'Knee to floor, but careful not to bang it!',
			featuredValue: { value: 50, unit: 'kg' },
		},
		{
			type: 'general',
			exercise: {
				name: 'Oh La La!" Leg Curl',
				tutorial: { author: 'Jeff Nippard', href: 'https://www.youtube.com/watch?v=e_48W0vlU58' },
				equipment: ['machine'],
			},
			sets: 3,
			reps: { min: 10, max: 12 },
			rir: 1,
			notes: 'Visualize the hamstring squeeze',
			featuredValue: { value: 50, unit: 'kg' },
		},
	],
};

const upperOne: WorkoutDay = {
	name: 'Upper 1',
	description: '**Bench Press** focus lift with **upper body** accessories',
	blocks: [
		{
			type: 'focus',
			exercise: {
				name: 'Bench Press',
				tutorial: { author: 'Alan Thrall', href: 'https://www.youtube.com/watch?v=BYKScl2sgCs' },
				equipment: ['barbell'],
			},
			sets: 1,
			reps: { min: 2, max: 4 },
			rir: 1.5,
			notes: 'Warmup sets on the way up as usual',
			featuredValue: { value: 100, unit: 'kg' },
		},
		{
			type: 'backoff',
			exercise: {
				name: 'Incline Bench Press',
				tutorial: { author: 'Jeff Nippard', href: 'https://www.youtube.com/watch?v=Zp6g3w6jI1k' },
				equipment: ['barbell'],
			},
			sets: 2,
			reps: 5,
			rir: 1,
			notes: 'Close grip, but not too close',
			featuredValue: { value: 70, unit: 'kg' },
		},
		{
			type: 'general',
			exercise: {
				name: 'Pull-up',
				tutorial: { author: 'Jeff Nippard', href: 'https://www.youtube.com/watch?v=_oyxCn2iSjU?t=95' },
				equipment: ['barbell'],
			},
			sets: 3,
			reps: { min: 8, max: 10 },
			rir: 1.5,
			notes: 'Slow. Grind against your legs as much as you can.',
			featuredValue: { value: 80, unit: 'kg' },
		},
		{
			type: 'general',
			exercise: {
				name: 'Step-back Lunge',
				tutorial: { author: 'ReloadPTandFitness', href: 'https://www.youtube.com/watch?v=fFdI96yZI18' },
				equipment: ['barbell'],
				isUnilateral: true,
			},
			sets: 2,
			reps: 5,
			rir: 1.5,
			notes: 'Knee to floor, but careful not to bang it!',
			featuredValue: { value: 50, unit: 'kg' },
		},
		{
			type: 'general',
			exercise: {
				name: 'Dumbbell Lateral Raise',
				tutorial: { author: 'Jeff Nippard', href: 'https://www.youtube.com/watch?v=1Rd1QgA46hQ' },
				equipment: ['dumbbell'],
			},
			sets: 3,
			reps: { min: 10, max: 12 },
			rir: 1,
			notes: 'Visualize the hamstring squeeze',
			featuredValue: { value: 50, unit: 'kg' },
		},
	],
};

const lowerTwo = { ...lowerOne, name: 'Lower 2' };
const uooerTwo = { ...upperOne, name: 'Upper 2' };
const bro = { ...upperOne, name: 'Bro Day' };

const programme: WorkoutWeek = {
	name: 'PowerBuilding Phase 1: Week 1/6',
	description: 'Focused on **hypertrophy**, with moderate volume @ moderate intensity',
	days: [lowerOne, upperOne, lowerTwo, uooerTwo, bro],
};

export class HardcodedProgramRepo implements ProgrammeRepoInterface {
	async getCurrent(): Promise<WorkoutWeek> {
		return {
			...programme,
			description: await marked.parseInline(programme.description),
			days: await Promise.all(
				programme.days.map(async day => ({
					...day,
					description: await marked.parseInline(day.description),
				}))
			),
		};
	}
}
