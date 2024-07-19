import React, { memo } from 'react';

import { UIBlock } from '../../../components/UI/Block';
import { useTheme } from '@react-navigation/native';
import { UIText } from '../../../components/UI/Text';
import { UITextInput } from '../../../components/UI/TextInput';
import { UITabs } from '../../../components/UI/Tabs';

const PeriodSelector = memo(({ onChange }) => {
  const [tab, setTab] = React.useState('elderly');

  const tabs = [
    { label: 'Idoso', value: 'elderly' },
    { label: 'Cuidador', value: 'caregiver' },
  ];

  return (
    <UIBlock tPadding="xl">
      <UITabs
        tab={tab}
        tabs={tabs}
        onChange={value => {
          setTab(value);
          onChange && onChange(value);
        }}
      />
    </UIBlock>
  );
});

export const Item = ({ index, values }) => {
  const { colors } = useTheme();

  const { setName, setLastName, setEmail, setPassword, setRole } = values.sets;
  const { name, lastName, email, password } = values.variables;

  return (
    <UIBlock tPadding="4xl" gap={32}>
      {index === 0 ? (
        <>
          <UIBlock gap={16}>
            <UIText weight="normal" size="l" color={colors.purple}>
              Digite seu nome
            </UIText>
            <UITextInput value={name} setValue={setName} capitalize />
          </UIBlock>

          <UIBlock gap={16}>
            <UIText weight="normal" size="l" color={colors.purple}>
              Digite seu sobrenome
            </UIText>
            <UITextInput value={lastName} setValue={setLastName} capitalize />
          </UIBlock>
        </>
      ) : index === 1 ? (
        <>
          <UIBlock gap={16}>
            <UIText weight="normal" size="l" color={colors.purple}>
              Digite seu e-mail
            </UIText>
            <UITextInput value={email} setValue={setEmail} />
          </UIBlock>

          <UIBlock gap={16}>
            <UIText weight="normal" size="l" color={colors.purple}>
              Digite sua senha
            </UIText>
            <UITextInput
              value={password}
              setValue={setPassword}
              hasSecureEntry
            />
          </UIBlock>
        </>
      ) : (
        <>
          <UIBlock>
            <UIText weight="normal" size="l" color={colors.purple}>
              Você quer se cadastrar como idoso ou cuidador?
            </UIText>
            <PeriodSelector onChange={setRole} />
          </UIBlock>
        </>
      )}
    </UIBlock>
  );
};
