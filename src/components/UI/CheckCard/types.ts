export interface UICheckCardProps {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  isChecked: boolean;
  onCheck: (isChecked: boolean) => void;
}
