import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { UIBlock } from '../../../components/UI/Block';

import { Userpic } from 'react-native-userpic';
import { UIText } from '../../../components/UI/Text';
import { useShortcutsStore } from '../../../stores/shortcutsStore';

export const HomeShortcuts = () => {
  const { navigate } = useNavigation();
  const { data } = useShortcutsStore();

  const groups = [
    {
      elderlyName: 'Julia nunes',
      medicationName: 'Paracetamol',
      time: '15:30',
      taked: false,
    },
  ];

  return (
    <UIBlock gap={'m'} isFlex>
      <UIText size={'l'}>Atalhos</UIText>
      {groups.map(item => {
        return (
          <>
            <Userpic name={item.elderlyName} colorize />
            <UIText>{item.elderlyName}</UIText>
            <UIText>{item.medicationName}</UIText>
            <UIText>{item.time}</UIText>
          </>
        );
      })}
    </UIBlock>
  );
};
