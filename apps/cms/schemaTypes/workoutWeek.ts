import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'workoutWeek',
	title: 'Workout Week',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'text',
			description: 'You may use **markdown** syntax',
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'days',
			title: 'Days',
			type: 'array',
			of: [
				{
					name: 'day',
					title: 'Day',
					type: 'reference',
					to: [{ type: 'workoutDay' }],
				},
			],
			validation: Rule => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			title: 'name',
		},
	},
});
