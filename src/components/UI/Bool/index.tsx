import { UIBoolProps } from './types';

const DEBUG_MODE = false;

export const UIBool = ({ name, condition, children }: UIBoolProps) => {
  if (DEBUG_MODE) {
    console.log(`[UIBool] ${name} ${condition}`);
  }

  if (!condition) {
    return null;
  }

  return children;
};
