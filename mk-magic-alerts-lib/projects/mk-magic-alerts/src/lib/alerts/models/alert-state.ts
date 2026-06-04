export const AlertState = {
  DISPLAY: 'display',
  DISMISS: 'dismiss',
  DISMISSED: 'dismissed',
} as const;

export type AlertState = typeof AlertState[keyof typeof AlertState];