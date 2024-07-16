import { UIBlockProps } from '../Block/types';

export type UIExpandableProps = {
  iconType: 'arrow' | 'symbol';
  children: React.ReactNode | React.ReactNode[];
} & UIBlockProps;
