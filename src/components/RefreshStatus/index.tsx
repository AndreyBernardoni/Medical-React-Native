import React from 'react';
import { RefreshControl } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { RefreshStatusType } from './types';

export const RefreshStatus = ({ refreshing, onRefresh }: RefreshStatusType) => {
  const theme = useTheme();

  console.log('Refreshing: ', refreshing);

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[theme.colors.primary]}
    />
  );
};
