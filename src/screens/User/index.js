import React from 'react';

import { useNavigation, useTheme } from '@react-navigation/native';
import { UIBlock } from '../../components/UI/Block';
import { UIButton } from '../../components/UI/Button';
import { UIHeader } from '../../components/UI/Header';
import { UIText } from '../../components/UI/Text';
import { UITextInput } from '../../components/UI/TextInput';
import { SCREENS } from '../../constants/screens';
import { useUserStore } from '../../stores/userStore';

export const UserScreen = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { signIn } = useUserStore();

  const body = {
    email,
    password,
  };

  return (
    <UIBlock isFlex isSafe isKeyboard color={colors.white}>
      <UIBlock isFlex padding={'l'} gap={16}>
        <UIHeader />

        <UIText weight="semibold" size="3xl" color={colors.purple}>
          Qual seu e-mail{'\n'}ou celular?
        </UIText>
        <UIBlock gap={24} tPadding="4xl">
          <UIBlock gap={8}>
            <UIText weight="normal" size="l" color={colors.purple}>
              Digite seu email
            </UIText>
            <UITextInput value={email} setValue={setEmail} />
          </UIBlock>
          <UIBlock gap={8}>
            <UIText weight="normal" size="l" color={colors.purple}>
              Digite sua senha
            </UIText>
            <UITextInput
              value={password}
              setValue={setPassword}
              hasSecureEntry
            />
          </UIBlock>
          <UIButton
            text="Entrar"
            onPress={() => {
              signIn({
                body,
                onSuccess: res =>
                  res.role === 'elderly'
                    ? navigate(SCREENS.Home)
                    : navigate(SCREENS.Home),
              });
            }}
          />
        </UIBlock>
      </UIBlock>
    </UIBlock>
  );
};
