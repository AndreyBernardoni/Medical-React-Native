import React, { useCallback } from 'react';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { UIBlock } from '../../../components/UI/Block';
import { UIIcon } from '../../../components/UI/Icon';

export const MenuTopbar = () => {
  const navigation = useNavigation();

  const onClose = useCallback(() => {
    navigation.dispatch(DrawerActions.closeDrawer());
  }, [navigation]);

  return (
    <UIBlock isRow hAlign="flex-end">
      <UIBlock onPress={onClose}>
        <UIIcon name="x" />
      </UIBlock>
    </UIBlock>
  );
};
