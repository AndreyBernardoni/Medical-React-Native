//name, color, size, font, onPress
export interface UIIconProps {
  name: string;
  color?: string;
  size?: number;
  font?: string;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  quaternary?: boolean;
  onPress?: (args?: any) => void;
}
