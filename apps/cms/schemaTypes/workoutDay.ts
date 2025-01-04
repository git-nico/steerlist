import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'workoutDay',
	title: 'Workout Day',
	type: 'document',
	fields: [
		defineField({
			name: 'name',
			title: 'Name',
			type: 'string',
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
			name: 'blocks',
			title: 'Blocks',
			type: 'array',
			of: [
				{
					type: 'document',
					fields: [
						defineField({
							name: 'type',
							title: 'Type',
							type: 'string',
							options: {
								list: ['focus', 'backoff', 'general', 'superset', 'circuit'],
							},
							initialValue: 'general',
						}),
						defineField({
							name: 'exercise',
							title: 'Exercise',
							type: 'reference',
							to: { type: 'exercise' },
							validation: Rule => Rule.required(),
						}),
						defineField({
							name: 'sets',
							title: 'Sets',
							type: 'number',
							validation: Rule => Rule.required(),
						}),
						defineField({
							name: 'reps',
							title: 'Reps',
							type: 'object',
							fields: [
								defineField({
									name: 'min',
									title: 'Min',
									type: 'number',
								}),
								defineField({
									name: 'max',
									title: 'Max',
									type: 'number',
								}),
							],
						}),
						defineField({
							name: 'rir',
							title: 'Reps in Reserve',
							type: 'number',
						}),
						defineField({
							name: 'notes',
							title: 'Notes',
							type: 'text',
						}),
						defineField({
							name: 'featuredValue',
							title: 'Featured Value',
							type: 'object',
							fields: [
								defineField({
									name: 'value',
									title: 'Value',
									type: 'number',
								}),
								defineField({
									name: 'unit',
									title: 'Unit',
									type: 'string',
								}),
							],
						}),
					],
					preview: {
						select: {
							title: 'exercise.name',
							subtitle: 'type',
						},
					},
				},
			],
			validation: Rule => Rule.required().min(1),
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
		},
	},
});
