import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'exercise',
	title: 'Exercise',
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
			validation: Rule => Rule.required(),
		}),
		defineField({
			name: 'isUnilareral',
			title: 'Unilateral',
			type: 'boolean',
		}),
		defineField({
			name: 'equipment',
			title: 'Equipment',
			type: 'array',
			of: [
				{
					type: 'string',
				},
			],
			options: {
				list: ['barbell', 'dumbbell', 'kettlebell', 'machine'],
			},
		}),
		defineField({
			name: 'tutorial',
			title: 'Tutorial',
			type: 'object',
			description: 'Usually a YouTube link showing the exercise in action',
			fields: [
				defineField({
					name: 'author',
					title: 'Author',
					type: 'string',
				}),
				defineField({
					name: 'href',
					title: 'Link',
					type: 'url',
				}),
			],
			validation: Rule => Rule.required(),
		}),
	],
	preview: {
		select: {
			title: 'name',
			media: 'image',
		},
	},
});
