import React from 'react';
import { Alert } from 'react-native';
import { UIAccountScreen } from './ui';
import { useAuthStore } from '../../stores/authStore';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../../constants/screens';
import { useUserStore } from '../../stores/userStore';
import { useEmployersStore } from '../../stores/employersStore';

export const AccountScreen = () => {
  const { navigate } = useNavigation();
  const { logout } = useAuthStore();

  const userData = useUserStore().data;
  const employerData = useEmployersStore().data;

  const data = {
    employer: employerData[0]?.name,
    email: userData?.email,
    full_name: userData?.full_name,
  };

  const onLogout = React.useCallback(() => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            logout({
              onSuccess: () => {
                console.log('Você foi deslogado com sucesso!');
                navigate(SCREENS.Welcome);
              },
              onError: error => {
                console.log('Falha ao deslogar', error);
              },
            });
          },
        },
        {
          text: 'Ficar',
        },
      ],
      { cancelable: false },
    );
  }, [logout, navigate]);

  return <UIAccountScreen onLogout={onLogout} data={data} />;
};
