import React from 'react';

import { UIBlock } from '../../components/UI/Block';
import { useNavigation, useTheme } from '@react-navigation/native';
import { UIText } from '../../components/UI/Text';
import { UIHeader } from '../../components/UI/Header';
import { UITextInput } from '../../components/UI/TextInput';
import { UIButton } from '../../components/UI/Button';
import { SCREENS } from '../../constants/screens';

export const UserScreen = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [credential, setCredential] = React.useState('');

  return (
    <UIBlock isFlex isSafe isKeyboard>
      <UIBlock isFlex padding={'l'} gap={16}>
        <UIHeader />

        <UIText weight="semibold" size="3xl" color={colors.purple}>
          Qual seu e-mail{'\n'}ou celular?
        </UIText>
        <UIBlock gap={16} tPadding="4xl">
          <UITextInput value={credential} setValue={setCredential} />
          <UIButton
            text="Próximo"
            onPress={() => {
              if (credential !== '' || null) {
                navigate(SCREENS.Password, { credential: credential });
              }
            }}
          />
        </UIBlock>
      </UIBlock>
    </UIBlock>
  );
};
