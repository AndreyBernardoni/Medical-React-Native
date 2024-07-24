import React from 'react';

import { useNavigation, useTheme } from '@react-navigation/native';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { UIBlock } from '../../components/UI/Block';
import { UIButton } from '../../components/UI/Button';
import { UIText } from '../../components/UI/Text';
import { IMAGES } from '../../constants/images';
import { SCREENS } from '../../constants/screens';

export const WelcomeScreen = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  return (
    <UIBlock isFlex isSafe color={colors.background.primary}>
      <UIBlock padding={'4xl'} isFlex isCenter>
        <Image
          source={IMAGES.welcomeScreenIllustration}
          style={{
            height: Dimensions.get('screen').height * 0.3,
            resizeMode: 'contain',
            alignSelf: 'center',
          }}
        />
      </UIBlock>

      <UIBlock
        color={colors.background.primary}
        padding={'l'}
        radius={[30, 30, 0, 0]}
        shadowOpacity={0.05}
        shadow={[0, -8]}
        shadowBlur={8}
        gap={30}>
        <UIBlock gap={8}>
          <UIText weight="semibold" size="3xl" color={colors.purple}>
            Olá, vamos{'\n'}começar?
          </UIText>
          <UIText weight="regular" size="m" color={colors.purple}>
            Bem-vindo ao App Gestor da{'\n'}TiqueTaque.
          </UIText>
        </UIBlock>
        <UIBlock gap={16}>
          <UIButton
            color={colors.purple}
            text="Começar"
            textColor="white"
            onPress={() => {
              navigate(SCREENS.User);
            }}
          />

          <UIBlock isRow gap={8}>
            <UIText weight="regular" size="s" color={colors.text.quaternary}>
              Ainda não tem cadastro?
            </UIText>
            <TouchableOpacity
              onPress={() => {
                navigate(SCREENS.Register);
              }}>
              <UIText weight="regular" size="s" color={colors.purple}>
                Clique aqui
              </UIText>
            </TouchableOpacity>
          </UIBlock>
        </UIBlock>
      </UIBlock>
    </UIBlock>
  );
};
