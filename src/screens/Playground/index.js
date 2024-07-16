import React from 'react';

import { UIBlock } from '../../components/UI/Block';
import { UIScroll } from '../../components/UI/Scroll';
import { UIHeader } from '../../components/UI/Header';

export const PlaygroundScreen = () => {
  return (
    <UIScroll>
      <UIBlock>
        <UIHeader title={'Playground'} />
      </UIBlock>
    </UIScroll>
  );
};
