import React from 'react';
import { UIBlock } from '../../components/UI/Block';
import { useNavigation, useTheme } from '@react-navigation/native';
import { UIText } from '../../components/UI/Text';
import { UIHeader } from '../../components/UI/Header';
import { UITextInput } from '../../components/UI/TextInput';
import { UIButton } from '../../components/UI/Button';
import { Linking, TouchableOpacity } from 'react-native';
import { useAuthStore } from '../../stores/authStore';
import { SCREENS } from '../../constants/screens';

export const PasswordScreen = ({ route }) => {
  const { colors } = useTheme();
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();
  const credential = route?.params?.credential;

  const { login } = useAuthStore();

  const handleLogin = async () => {
    await login({
      email: credential,
      password: password,
      onSuccess: () => {
        navigation.reset({
          index: 0,
          routes: [{ name: SCREENS.Home }],
        });
      },
      onError: err => {
        console.log('Erro ao fazer login. Verifique suas credenciais.', err);
      },
    });
  };

  return (
    <UIBlock isFlex isSafe isKeyboard>
      <UIBlock isFlex padding={'l'} gap={16}>
        <UIHeader
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                Linking.openURL('https://admin.tiquetaque.app/forgot-password');
              }}>
              <UIText weight="semibold" size="m" color={colors.purple}>
                Recuperar
              </UIText>
            </TouchableOpacity>
          }
        />

        <UIText weight="semibold" size="3xl" color={colors.purple}>
          Qual a sua{'\n'}senha?
        </UIText>
        <UIBlock gap={16} tPadding="4xl">
          <UITextInput hasSecureEntry value={password} setValue={setPassword} />
          <UIButton
            text="Próximo"
            onPress={() => {
              console.log('credential', credential);
              console.log('password', password);
              handleLogin();
            }}
          />
        </UIBlock>
      </UIBlock>
    </UIBlock>
  );
};
