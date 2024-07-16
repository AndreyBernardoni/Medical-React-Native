import { StyleProp, ViewStyle } from 'react-native';

export interface UILoadingProps {
  flex?: boolean | undefined;
  height?: number | undefined;
  color?: string | undefined;
  backgroundColor?: string | undefined;
  transparent?: boolean | undefined;
  disableRadius?: boolean | undefined;
  disableMarginHorizontal?: boolean | undefined;
  large?: boolean | undefined;
  style?: StyleProp<ViewStyle> | undefined;
}
