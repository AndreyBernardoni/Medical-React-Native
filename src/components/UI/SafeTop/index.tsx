import { UISafeTopProps } from './types';

import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const UISafeTop = ({ hidden }: UISafeTopProps) => {
  const insets = useSafeAreaInsets();
  const style = { height: insets.top, backgroundColor: 'transparent' };

  if (hidden) {
    return null;
  }

  return <View style={style} />;
};
