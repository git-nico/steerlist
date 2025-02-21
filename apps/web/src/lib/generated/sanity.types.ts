/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
	_type: 'sanity.imagePaletteSwatch';
	background?: string;
	foreground?: string;
	population?: number;
	title?: string;
};

export type SanityImagePalette = {
	_type: 'sanity.imagePalette';
	darkMuted?: SanityImagePaletteSwatch;
	lightVibrant?: SanityImagePaletteSwatch;
	darkVibrant?: SanityImagePaletteSwatch;
	vibrant?: SanityImagePaletteSwatch;
	dominant?: SanityImagePaletteSwatch;
	lightMuted?: SanityImagePaletteSwatch;
	muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
	_type: 'sanity.imageDimensions';
	height?: number;
	width?: number;
	aspectRatio?: number;
};

export type SanityFileAsset = {
	_id: string;
	_type: 'sanity.fileAsset';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	source?: SanityAssetSourceData;
};

export type Geopoint = {
	_type: 'geopoint';
	lat?: number;
	lng?: number;
	alt?: number;
};

export type BlockContent = Array<
	| {
			children?: Array<{
				marks?: Array<string>;
				text?: string;
				_type: 'span';
				_key: string;
			}>;
			style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
			listItem?: 'bullet';
			markDefs?: Array<{
				href?: string;
				_type: 'link';
				_key: string;
			}>;
			level?: number;
			_type: 'block';
			_key: string;
	  }
	| {
			asset?: {
				_ref: string;
				_type: 'reference';
				_weak?: boolean;
				[internalGroqTypeReferenceTo]?: 'sanity.imageAsset';
			};
			hotspot?: SanityImageHotspot;
			crop?: SanityImageCrop;
			_type: 'image';
			_key: string;
	  }
>;

export type SanityImageCrop = {
	_type: 'sanity.imageCrop';
	top?: number;
	bottom?: number;
	left?: number;
	right?: number;
};

export type SanityImageHotspot = {
	_type: 'sanity.imageHotspot';
	x?: number;
	y?: number;
	height?: number;
	width?: number;
};

export type SanityImageAsset = {
	_id: string;
	_type: 'sanity.imageAsset';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	originalFilename?: string;
	label?: string;
	title?: string;
	description?: string;
	altText?: string;
	sha1hash?: string;
	extension?: string;
	mimeType?: string;
	size?: number;
	assetId?: string;
	uploadId?: string;
	path?: string;
	url?: string;
	metadata?: SanityImageMetadata;
	source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
	_type: 'sanity.assetSourceData';
	name?: string;
	id?: string;
	url?: string;
};

export type SanityImageMetadata = {
	_type: 'sanity.imageMetadata';
	location?: Geopoint;
	dimensions?: SanityImageDimensions;
	palette?: SanityImagePalette;
	lqip?: string;
	blurHash?: string;
	hasAlpha?: boolean;
	isOpaque?: boolean;
};

export type WorkoutWeek = {
	_id: string;
	_type: 'workoutWeek';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	name: string;
	slug: Slug;
	description: string;
	days: Array<{
		_ref: string;
		_type: 'reference';
		_weak?: boolean;
		_key: string;
		[internalGroqTypeReferenceTo]?: 'workoutDay';
	}>;
};

export type WorkoutDay = {
	_id: string;
	_type: 'workoutDay';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	name: string;
	description: string;
	blocks: Array<{
		type?: 'focus' | 'backoff' | 'general' | 'superset' | 'circuit';
		exercise: {
			_ref: string;
			_type: 'reference';
			_weak?: boolean;
			[internalGroqTypeReferenceTo]?: 'exercise';
		};
		sets: number;
		reps?: {
			min?: number;
			max?: number;
		};
		rir?: number;
		notes?: string;
		featuredValue?: {
			value?: number;
			unit?: string;
		};
		_key: string;
	}>;
};

export type Exercise = {
	_id: string;
	_type: 'exercise';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	name: string;
	slug: Slug;
	description: string;
	isUnilareral?: boolean;
	equipment?: Array<string>;
	tutorial: {
		author?: string;
		href?: string;
	};
};

export type Slug = {
	_type: 'slug';
	current: string;
	source?: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | BlockContent | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | WorkoutWeek | WorkoutDay | Exercise | Slug;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ../web/src/lib/repos/programme/SanityProgramRepo.ts
// Variable: GET_LAST_WEEK
// Query: *[_type == "workoutWeek"] | order(publishedAt desc)[0] {	...,	days[]->{		...,		blocks[]{            ...,            exercise->{...}		}	}}
export type GET_LAST_WEEKResult = {
	_id: string;
	_type: 'workoutWeek';
	_createdAt: string;
	_updatedAt: string;
	_rev: string;
	name: string;
	slug: Slug;
	description: string;
	days: Array<{
		_id: string;
		_type: 'workoutDay';
		_createdAt: string;
		_updatedAt: string;
		_rev: string;
		name: string;
		description: string;
		blocks: Array<{
			type?: 'backoff' | 'circuit' | 'focus' | 'general' | 'superset';
			exercise: {
				_id: string;
				_type: 'exercise';
				_createdAt: string;
				_updatedAt: string;
				_rev: string;
				name: string;
				slug: Slug;
				description: string;
				isUnilareral?: boolean;
				equipment?: Array<string>;
				tutorial: {
					author?: string;
					href?: string;
				};
			};
			sets: number;
			reps?: {
				min?: number;
				max?: number;
			};
			rir?: number;
			notes?: string;
			featuredValue?: {
				value?: number;
				unit?: string;
			};
			_key: string;
		}>;
	}>;
} | null;

// Query TypeMap
import '@sanity/client';
declare module '@sanity/client' {
	interface SanityQueries {
		'*[_type == "workoutWeek"] | order(publishedAt desc)[0] {\n\t...,\n\tdays[]->{\n\t\t...,\n\t\tblocks[]{\n            ...,\n            exercise->{...}\n\t\t}\n\t}\n}': GET_LAST_WEEKResult;
	}
}
