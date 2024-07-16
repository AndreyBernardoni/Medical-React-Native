export interface UIHeaderProps {
  title: string;
  description?: string;
  rightComponent?: React.ReactNode;
  onBack?: () => void;
}
