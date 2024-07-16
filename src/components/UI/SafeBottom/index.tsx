import { UISafeBottomProps } from './types';

import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const UISafeBottom = ({ hidden }: UISafeBottomProps) => {
  const insets = useSafeAreaInsets();
  const style = { height: insets.bottom, backgroundColor: 'transparent' };

  if (hidden) {
    return null;
  }

  return <View style={style} />;
};
