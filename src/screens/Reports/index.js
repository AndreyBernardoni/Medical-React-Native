import React from 'react';
import { UIHeader } from '../../components/UI/Header';
import { UIScroll } from '../../components/UI/Scroll';
import { UIBlock } from '../../components/UI/Block';

export const ReportsScreen = () => {
  return (
    <UIScroll isSafe>
      <UIBlock padding={'l'} gap="m">
        <UIHeader
          title={'Relatórios gerenciais'}
          description={
            'Gerencie as permissões e ajuste o App para ficar do seu jeito.'
          }
        />
      </UIBlock>
    </UIScroll>
  );
};
