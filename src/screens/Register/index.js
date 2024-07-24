import React from 'react';

import { useNavigation, useTheme } from '@react-navigation/native';
import { Alert } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { UIBlock, UIRow } from '../../components/UI/Block';
import { UIButton } from '../../components/UI/Button';
import { UIHeader } from '../../components/UI/Header';
import { UIScroll } from '../../components/UI/Scroll';
import { UIText } from '../../components/UI/Text';
import { SCREENS } from '../../constants/screens';
import { useUserStore } from '../../stores/userStore';
import { Item } from './Item';

export const RegisterScreen = () => {
  const [width, setWidth] = React.useState(1);

  const { signUp } = useUserStore();

  const { colors } = useTheme();

  const { navigate } = useNavigation();

  const [name, setName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [role, setRole] = React.useState('elderly');
  const [index, setIndex] = React.useState(0);

  const canGoNext = () => {
    if (index === 0) {
      return name !== '' && lastName !== '';
    } else if (index === 1) {
      return email !== '' && password !== '';
    } else {
      return true;
    }
  };

  const values = {
    sets: {
      setName,
      setLastName,
      setEmail,
      setPassword,
      setRole,
    },
    variables: {
      name,
      lastName,
      email,
      password,
      role,
    },
  };

  const ref = React.useRef(null);

  const User = React.useMemo(() => {
    return {
      name: `${name} ${lastName}`,
      email,
      password,
      role,
    };
  }, [name, lastName, email, password, role]);

  return (
    <UIScroll isFlex isSafe is color={colors.background.primary}>
      <UIBlock isFlex padding={'l'} gap={16}>
        <UIBlock
          onLayout={({ nativeEvent }) => {
            setWidth(nativeEvent.layout.width);
          }}
          isFlex>
          <UIHeader />

          <UIText weight="semibold" size="3xl" color={colors.purple}>
            Vamos fazer{'\n'}seu cadastro?
          </UIText>

          <Carousel
            defaultIndex={0}
            enabled={false}
            loop={false}
            width={width}
            ref={ref}
            data={[0, 1, 2]}
            renderItem={() => {
              return <Item index={index} values={values} />;
            }}
          />
          <UIRow isBetween>
            <UIBlock
              style={{
                width: width / 2.1,
              }}>
              {index !== 0 && (
                <UIButton
                  isBlank
                  text="Voltar"
                  onPress={() => {
                    ref.current?.scrollTo({ count: -1, animated: false });
                    setIndex(index - 1);
                  }}
                />
              )}
            </UIBlock>

            <UIBlock
              style={{
                width: width / 2.1,
              }}>
              {index !== 2 ? (
                <UIButton
                  text="Avançar"
                  onPress={() => {
                    if (canGoNext() === true) {
                      ref.current?.scrollTo({ count: 1, animated: false });
                      setIndex(index + 1);
                    } else if (canGoNext() === false) {
                      Alert.alert(
                        'Erro',
                        'Parece que você não preencheu todos os campos, por favor, preencha-os para continuar.',
                        [
                          {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                          },
                        ],
                        { cancelable: false },
                      );
                    }
                  }}
                />
              ) : (
                <UIButton
                  text="Concluir"
                  onPress={async () => {
                    await signUp({
                      body: User,
                      onSuccess: () => {
                        navigate(SCREENS.Home);
                      },
                      onError: () => {
                        Alert.alert(
                          'Erro',
                          'Houve um erro ao tentar cadastrar o usuário, por favor, tente novamente.',
                          [
                            {
                              text: 'OK',
                              onPress: () => console.log('OK Pressed'),
                            },
                          ],
                          { cancelable: false },
                        );
                      },
                    });
                  }}
                />
              )}
            </UIBlock>
          </UIRow>
        </UIBlock>
      </UIBlock>
    </UIScroll>
  );
};
