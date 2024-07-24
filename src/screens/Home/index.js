import React from 'react';

import { UIBlock } from '../../components/UI/Block';

import { FlashList } from '@shopify/flash-list';
import {
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig,
} from 'react-native-calendars';
import { Userpic } from 'react-native-userpic';
import { UIButton } from '../../components/UI/Button';
import { UIText } from '../../components/UI/Text';
import { useUserStore } from '../../stores/userStore';
import { HomeGreeting } from './Greeting';

// v Tradução do calendário
LocaleConfig.locales.pt = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt';
// ^ Tradução do calendário

const dummyData = [
  {
    elderlyName: 'Julia Nunes',
    medicationName: 'Paracetamol',
    medicationTime: '15:30',
    isTaked: false,
  },
  {
    elderlyName: 'Andrey fialgo',
    medicationName: 'Ibuprofeno',
    medicationTime: '15:30',
    isTaked: false,
  },
  {
    elderlyName: 'Carlos r',
    medicationName: 'Paracetamol',
    medicationTime: '15:30',
    isTaked: false,
  },
  {
    elderlyName: 'i Nunes',
    medicationName: 'Paracetamol',
    medicationTime: '15:30',
    isTaked: false,
  },
];

const Items = ({ elderlyName, medicationName, medicationTime, isTaked }) => {
  return (
    <UIBlock isFlex isRow hPadding={'l'} isBetween align="center">
      <UIBlock isRow align="center" gap={16}>
        <Userpic name={elderlyName} colorize />
        <UIBlock>
          <UIText>{medicationName}</UIText>
          <UIText secondary size="xs">
            {elderlyName} - {isTaked ? 'Tomado' : 'Não tomado'}
          </UIText>
        </UIBlock>
      </UIBlock>
      <UIText>{medicationTime}</UIText>
    </UIBlock>
  );
};

const Empty = () => {
  return (
    <UIBlock isFlex align="center" justify="center">
      <UIText>Nenhum medicamento para hoje</UIText>
    </UIBlock>
  );
};

export const HomeScreen = () => {
  const { data } = useUserStore();

  const today = new Date().toLocaleDateString();
  const todayFormatted = React.useMemo(() => {
    return today.split('/').reverse().join('-');
  }, [today]);

  const [selectedDate, setSelectedDate] = React.useState(todayFormatted);

  const Header = React.useMemo(() => {
    return (
      <>
        <UIBlock padding={'l'}>
          <HomeGreeting />
        </UIBlock>

        <CalendarProvider date={selectedDate}>
          <ExpandableCalendar
            firstDay={1}
            closeOnDayPress={false}
            onDayPress={value => setSelectedDate(value.dateString)}
            allowShadow={false}
            monthFormat={"MMMM 'de' yyyy"}
            current={selectedDate}
          />
        </CalendarProvider>

        <UIBlock hPadding={'l'} isRow isBetween align="center">
          <UIText size={'l'}>Medicamentos</UIText>
          <UIButton text={'Adicionar'} isBlank onPress={() => {}} />
        </UIBlock>
      </>
    );
  }, [selectedDate]);

  React.useEffect(() => {
    console.log('@screen/Home/onDayPress', selectedDate);
  }, [selectedDate]);

  return (
    <UIBlock isSafe isFlex>
      <FlashList
        ListHeaderComponent={Header}
        data={dummyData}
        // data={[]}
        contentContainerStyle={{ flex: 1 }}
        ItemSeparatorComponent={() => <UIBlock height={16} />}
        estimatedItemSize={5}
        renderItem={({ item }) => (
          <Items
            elderlyName={item.elderlyName}
            medicationName={item.medicationName}
            medicationTime={item.medicationTime}
            isTaked={item.isTaked}
          />
        )}
        ListEmptyComponent={<Empty />}
      />
    </UIBlock>
  );
};
