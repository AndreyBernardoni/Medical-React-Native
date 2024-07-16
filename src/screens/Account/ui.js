import React from 'react';

import { UIScroll } from '../../components/UI/Scroll';
import { UIBlock } from '../../components/UI/Block';
import { UIHeader } from '../../components/UI/Header';
import { UIText } from '../../components/UI/Text';
import { UIButton } from '../../components/UI/Button';

export const UIAccountScreen = ({ onLogout, data }) => (
  <UIScroll isFlex isSafe>
    <UIBlock isFlex gap={'xl'} padding={'l'}>
      <UIHeader
        title={'Minha conta'}
        description={'Visualize os dados da sua conta.'}
      />

      <UIBlock isFlex isBetween>
        <UIBlock gap="m">
          <UIBlock gap="2xs">
            <UIText size="s" secondary>
              Empresa
            </UIText>

            <UIText bold>{data.employer}</UIText>
          </UIBlock>

          <UIBlock gap="2xs">
            <UIText size="s" secondary>
              Nome
            </UIText>

            <UIText bold>{data.full_name}</UIText>
          </UIBlock>

          <UIBlock gap="2xs">
            <UIText size="s" secondary>
              E-mail
            </UIText>

            <UIText bold>{data.email}</UIText>
          </UIBlock>
        </UIBlock>

        <UIButton text={'Sair'} onPress={onLogout} />
      </UIBlock>
    </UIBlock>
  </UIScroll>
);
