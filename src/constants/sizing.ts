const PIXEL_BASE = 16;

export const SIZING = {
  '4xl': Math.floor(PIXEL_BASE * 4),
  '3xl': Math.floor(PIXEL_BASE * 3),
  '2xl': Math.floor(PIXEL_BASE * 2.5),
  xl: Math.floor(PIXEL_BASE * 2),
  l: Math.floor(PIXEL_BASE * 1.5),
  m: PIXEL_BASE,
  s: Math.floor(PIXEL_BASE * 0.75),
  xs: Math.floor(PIXEL_BASE * 0.5),
  '2xs': PIXEL_BASE * 0.25,
  '3xs': PIXEL_BASE * 0.125,
} as const;

export type SizingProps = keyof typeof SIZING;

/*
if BASE 14px then
  4xl = 56px
  3xl = 42px
  2xl = 35px
  xl = 28px
  l = 21px
  m = 14px
  s = 10.5px
  xs = 7px
  2xs = 3.5px
  3xs = 1.75px
*/
