import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { UIBlock } from '../../../components/UI/Block';

export const HomeTopbar = () => {
  const navigation = useNavigation();

  return <UIBlock isRow isBetween />;
};
