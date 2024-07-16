import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import { View } from 'react-native';
import { Column } from 'react-smart-layout';
import { useTheme } from '@react-navigation/native';
import { UIText } from '../../../components/UI/Text';

export const Empty = ({ text }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
      }}>
      <Column space={8} style={{ alignItems: 'center' }}>
        <Feather color={colors.text.quaternary} name="info" size={30} />

        <UIText align="center" color={colors.text.quaternary}>
          {text ? text : 'Nenhum resultado encontrado'}
        </UIText>
      </Column>
    </View>
  );
};
