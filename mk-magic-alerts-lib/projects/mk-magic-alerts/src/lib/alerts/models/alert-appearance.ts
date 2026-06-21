
export const AlertAppearance = {
	CLASSIC: 'classic',
	GRADIENT: 'gradient'
} as const;

export type AlertAppearance = typeof AlertAppearance[keyof typeof AlertAppearance];
