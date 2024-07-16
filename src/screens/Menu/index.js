import React from 'react';

import { APP_VERSION } from '../../constants/version';
import { UIScroll } from '../../components/UI/Scroll';
import { UIBlock } from '../../components/UI/Block';
import { UIText } from '../../components/UI/Text';

import { MenuInfo } from './Info';
import { MenuTopbar } from './Topbar';
import { MenuBanner } from './Banner';
import { MenuRoutes } from './Routes';

export const MenuScreen = ({ navigation, ...props }) => {
  return (
    <UIScroll isSafe>
      <UIBlock isFlex gap={'l'} hPadding={'l'} vPadding={'m'}>
        <MenuTopbar />

        <UIBlock gap={'l'}>
          <MenuInfo />
          <MenuBanner />
        </UIBlock>

        <MenuRoutes />
      </UIBlock>

      <UIBlock padding={'l'}>
        <UIText tertiary size="xs" spacing={1}>
          {APP_VERSION}
        </UIText>
      </UIBlock>
    </UIScroll>
  );
};
