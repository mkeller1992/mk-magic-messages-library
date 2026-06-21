export const AlertEntryAnimation = {
  DOT: 'dot',
  BURST: 'burst',
  DROP: 'drop',
  SLIDE_RIGHT: 'slide-right',
  UNFOLD: 'unfold'
} as const;

export type AlertEntryAnimation = typeof AlertEntryAnimation[keyof typeof AlertEntryAnimation];
