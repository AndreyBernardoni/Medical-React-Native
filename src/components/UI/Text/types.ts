type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl';
type WeightType = 'regular' | 'semibold' | 'bold';
type AlignType = 'left' | 'center' | 'right';

export interface UITextProps {
  weight?: WeightType;
  size?: SizeType;
  align?: AlignType;
  black?: boolean;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  bold?: boolean;
  semibold?: boolean;
  spacing?: number;
  color?: string;
  style?: any;
  children: string;
}
