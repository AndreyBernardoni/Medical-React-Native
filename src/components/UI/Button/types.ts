export interface UIButtonProps {
  isFlex?: boolean;
  isOutline?: boolean;
  isBlank?: boolean;
  color?: string;
  text: string;
  textColor?: string;
  icon?: string;
  iconComponent?: React.ReactNode;
  onPress: () => void;
}
