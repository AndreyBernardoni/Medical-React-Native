import React, { useCallback } from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SCREENS } from '../../../constants/screens';
import { UIIcon } from '../../../components/UI/Icon';
import { UIBlock } from '../../../components/UI/Block';
import { Warning } from './Warning';

export const HomeTopbar = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  const goPendings = useCallback(
    () => navigation.navigate(SCREENS.Pending),
    [navigation],
  );

  return (
    <UIBlock isRow isBetween>
      <UIIcon name="menu" onPress={() => navigation.openDrawer()} />

      <UIBlock isRow onPress={goPendings}>
        <Warning value={13} color={colors.warning.tertiary} />
        <Warning value={99} color={colors.warning.secondary} />
        <Warning value={1} color={colors.warning.primary} />
      </UIBlock>
    </UIBlock>
  );
};
