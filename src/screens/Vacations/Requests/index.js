import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { SPACING } from '../../../constants/spacing';

import { UIBlock } from '../../../components/UI/Block';
import { UIText } from '../../../components/UI/Text';
import { UIIcon } from '../../../components/UI/Icon';
import { UIButton } from '../../../components/UI/Button';
import { UISelect } from '../../../components/UI/Select';
import { UISkeleton } from '../../../components/Skeleton';
import { Info } from '../Info';

import { format, parse } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { useVacationsStore } from '../../../stores/vacationsStore';

export const RequestsHeader = ({ initialSelect, setType }) => {
  const REQUESTS_OPTIONS = [
    {
      label: 'Todos',
      value: 'all',
    },
    {
      label: 'Aprovados',
      value: 'approved',
    },
    {
      label: 'Pendentes',
      value: 'pending',
    },
    {
      label: 'Reprovados',
      value: 'rejected',
    },
  ];

  const [selected, setSelected] = React.useState(initialSelect || 'all');

  const { getVacationsSolicitations, loading } = useVacationsStore();
  const total = useVacationsStore().data.solicitations?._meta.total;

  const { isConnected } = useNetInfo();

  React.useEffect(() => {
    if (isConnected) {
      getVacationsSolicitations({ type: selected });
    }
  }, [getVacationsSolicitations, isConnected, selected]);

  return (
    <UIBlock gap={'m'}>
      <UISelect
        isRadio
        selected={selected}
        options={REQUESTS_OPTIONS}
        onConfirm={item => {
          setSelected(item);
          setType(item);
        }}
      />

      {loading ? (
        <UISkeleton height={22} width={150} borderRadius={6} isFlex />
      ) : (
        <UIText tertiary>{loading ? '' : total + ' resultados'}</UIText>
      )}
    </UIBlock>
  );
};

export const RequestsItem = ({ item }) => {
  const { colors } = useTheme();

  const [isExpanded, setIsExpanded] = React.useState(false);

  const formatDate = (date, pattern = 'dd/MM/yyyy') => {
    return format(date, pattern, { locale: ptBR });
  };

  const onApprove = React.useCallback(() => {}, []);
  const onReject = React.useCallback(() => {}, []);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const datePattern = 'dd/MM/yyyy HH:mm:ss X';

  const parseCustomDate = dateString => {
    return parse(dateString, datePattern, new Date());
  };

  const periodPattern = 'dd/MM/yyy';
  const periodStart = formatDate(
    parseCustomDate(item?.start_date),
    periodPattern,
  );
  const periodEnd = formatDate(parseCustomDate(item?.end_date), periodPattern);
  const period = `${periodStart} a ${periodEnd}`;
  const creation = formatDate(parseCustomDate(item?._created));

  const styles = StyleSheet.create({
    card: {
      padding: SPACING.medium,
    },
  });

  return (
    <UIBlock
      gap={SPACING.small}
      style={styles.card}
      radius={SPACING.semi_medium}
      color={colors.background.tertiary}>
      <UIBlock
        isRow
        hAlign={'space-between'}
        vAlign={'center'}
        onPress={() => toggleExpand()}>
        <UIBlock gap={SPACING.tiny}>
          <UIText>{item.employee?.full_name}</UIText>
          <UIText size="s" secondary>
            {period}
          </UIText>
        </UIBlock>

        <UIIcon name={isExpanded ? 'chevron-up' : 'chevron-down'} quaternary />
      </UIBlock>

      <UIBlock gap={SPACING.medium} isHidden={!isExpanded}>
        <UIBlock gap={SPACING.small}>
          <Info label="Criação" value={creation} />
          <Info label="Detalhamento" value={item.detail} />
        </UIBlock>

        <UIBlock isRow gap={SPACING.extra_small}>
          <UIButton
            isFlex
            isOutline
            text="Aprovar"
            icon="check"
            color={colors.success}
            onPress={onApprove}
          />

          <UIButton
            isFlex
            isOutline
            text="Reprovar"
            icon="x"
            color={colors.error}
            onPress={onReject}
          />
        </UIBlock>

        <UIBlock hAlign="flex-end" onPress={() => {}}>
          <UIText primary>Ver mais detalhes</UIText>
        </UIBlock>
      </UIBlock>
    </UIBlock>
  );
};
