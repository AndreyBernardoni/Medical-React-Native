import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { UIBlock } from '../../components/UI/Block';
import { useAuthStore } from '../../stores/authStore';

export const AfterSplash = () => {
  const { navigate } = useNavigation();

  const token = useAuthStore.getState().data?.token;

  React.useEffect(() => {
    if (token) {
      navigate('Home');
    } else {
      navigate('Welcome');
    }
  }, [token, navigate]);
  return <UIBlock />;
};
