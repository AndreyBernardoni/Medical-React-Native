import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { UIButtonItems } from '../../../components/UI/ButtonItems';
import { UIBlock } from '../../../components/UI/Block';

import { SCREENS } from '../../../constants/screens';

export const MenuRoutes = () => {
  const { navigate } = useNavigation();

  const groups = [
    {
      label: 'Sistema',
      items: [
        {
          label: 'Minha conta',
          onPress: () => navigate(SCREENS.Account),
        },
        {
          label: 'Configurações',
          onPress: () => navigate(SCREENS.Settings),
        },
      ],
    },
    {
      label: 'Pendências',
      items: [
        {
          label: 'Ajustes pendentes',
          onPress: () => navigate(SCREENS.Adjustments),
        },
        {
          label: 'Afastamentos pendentes',
          onPress: () => navigate(SCREENS.WorkLeaves),
        },
        {
          label: 'Férias pendentes',
          onPress: () => navigate(SCREENS.Vacations),
        },
      ],
    },
    {
      label: 'Gerenciamento',
      items: [
        {
          label: 'Status dos funcionários',
          onPress: () => navigate(SCREENS.Employees),
        },
        // {
        //   label: 'Relatórios gerenciais',
        //   onPress: () => navigate(SCREENS.Reports),
        // },
      ],
    },
  ];

  return (
    <UIBlock gap={'m'}>
      {groups?.map(({ label, items }, groupIndex) => (
        <UIButtonItems key={groupIndex} title={label} items={items} />
      ))}
    </UIBlock>
  );
};
