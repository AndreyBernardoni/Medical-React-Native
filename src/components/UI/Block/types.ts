import { StyleSheetProperties } from 'react-native';

import { AlignType } from '../../../constants/aligns';
import { SizingProps } from '../../../constants/sizing';

type Position = 'top' | 'left' | 'right' | 'bottom';

export interface UIBlockProps {
  isAbsolute?: boolean;

  isFlex?: boolean;
  isRow?: boolean;
  isCenter?: boolean;
  isBetween?: boolean;
  isWrap?: boolean;

  isSafe?: boolean;
  isSafeTop?: boolean;
  isSafeBottom?: boolean;
  isSafeRight?: boolean;
  isSafeLeft?: boolean;

  isKeyboard?: boolean;
  isSquare?: boolean;
  isHidden?: boolean;

  position?: Position | number[]; // top, left, right, bottom
  margin?: SizingProps | SizingProps[] | number | number[];

  color?: string;
  secondary?: boolean;
  tertiary?: boolean;

  align?: AlignType;
  hAlign?: AlignType;
  vAlign?: AlignType;

  gap?: SizingProps | number;

  padding?: SizingProps | SizingProps[];
  hPadding?: SizingProps | SizingProps[]; // horizontal padding
  vPadding?: SizingProps | SizingProps[]; // vertical padding
  lPadding?: SizingProps; // left padding
  tPadding?: SizingProps; // top padding
  rPadding?: SizingProps; // right padding
  bPadding?: SizingProps; // bottom padding

  radius?: SizingProps | SizingProps[] | string | number | number[];
  border?: number | number[];
  borderColor?: string;
  shadow?: number | number[];
  shadowColor?: string;
  shadowOpacity?: number;
  shadowBlur?: number;
  height?: number | string;
  width?: number | string;

  style?: StyleSheetProperties;
  children?: any;
  onPress?: any;
  onLayout?: any;
}
