import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { UIBlock } from '../../components/UI/Block';
import { SCREENS } from '../../constants/screens';
import { useUserStore } from '../../stores/userStore';

export const AfterSplash = () => {
  const { navigate } = useNavigation();

  const { data } = useUserStore();

  React.useEffect(() => {
    if (data) {
      if (data.role === 'caregiver') {
        navigate(SCREENS.Home);
      } else {
        navigate(SCREENS.Home);
      }
    } else {
      navigate(SCREENS.Welcome);
    }
  }, [navigate, data]);
  return <UIBlock />;
};
