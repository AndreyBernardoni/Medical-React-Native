import React from 'react';

import { UIHeader } from '../../components/UI/Header';
import { UIScroll } from '../../components/UI/Scroll';
import { UIBlock } from '../../components/UI/Block';
import { UIIcon } from '../../components/UI/Icon';
import { UIText } from '../../components/UI/Text';
import { UIShortcut } from '../../components/UI/Shortcut';

export const SettingsScreen = () => {
  return (
    <UIScroll isSafe>
      <UIBlock gap={'l'} padding={'l'}>
        <UIHeader
          title={'Configurações'}
          description={
            'Gerencie as permissões e ajuste o App para ficar do seu jeito.'
          }
        />

        <UIBlock isFlex gap="m">
          <UIShortcut title={'Notificações'} icon={'bell'} />
          <UIShortcut title={'Notificações'} icon={'bell'} />
        </UIBlock>
      </UIBlock>
    </UIScroll>
  );
};
