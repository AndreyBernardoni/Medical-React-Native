import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';

import { UIBlock, UICol, UIRow } from '../../components/UI/Block';
import { UIScroll } from '../../components/UI/Scroll';
import { UIExpandable } from '../../components/UI/Expandable';
import { UIHeader } from '../../components/UI/Header';
import { UIText } from '../../components/UI/Text';
import { UIButton } from '../../components/UI/Button';
import { UIBool } from '../../components/UI/Bool';
import { UIList } from '../../components/UI/List';
import { UICheck } from '../../components/UI/Check';
import { UIImage } from '../../components/UI/Image';
import { UIBadge } from '../../components/UI/Badge';

import { SPACING } from '../../constants/spacing';
import { SCREENS } from '../../constants/screens';

import { fakeId } from '../../utils/fakeid';

export const PendingScreen = () => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const [selection, setSelection] = React.useState(new Map());

  const [data, setData] = React.useState(fakeData);
  const [bottomPadding, setBottomPadding] = React.useState(0);

  const items = React.useMemo(
    () =>
      data.map(item => ({
        ...item,
        isSelected: selection.get(item.id),
        onSelect: () =>
          setSelection(prev => {
            const next = new Map(prev);
            prev.has(item.id) ? next.delete(item.id) : next.set(item.id, item);
            return next;
          }),
      })),
    [data, selection],
  );

  const adjusments = React.useMemo(
    () => items.filter(item => item.group === 'adjustments'),
    [items],
  );

  const workleaves = React.useMemo(
    () => items.filter(item => item.group === 'workleaves'),
    [items],
  );

  const vacations = React.useMemo(
    () => items.filter(item => item.group === 'vacations'),
    [items],
  );

  const handlePadding = React.useCallback(
    ({ height }) => bottomPadding !== height && setBottomPadding(height),
    [bottomPadding],
  );

  const selectGroup = React.useCallback(
    groupName =>
      setSelection(prev => {
        const next = new Map(prev);
        const group = items.filter(item => item.group === groupName);
        const isAllSelected = group.every(item => item.isSelected);

        isAllSelected
          ? group.forEach(item => {
              next.delete(item.id);
            })
          : group.forEach(item => {
              next.set(item.id, item);
            });

        return next;
      }),
    [items],
  );

  const approveSelection = React.useCallback(() => {
    // TODO: implement
    const approveds = Array.from(selection.values());
    console.log('approveSelection', approveds);
  }, [selection]);

  const rejectSelection = React.useCallback(() => {
    // TODO: implement
    const rejecteds = Array.from(selection.values());
    console.log('rejectSelection', rejecteds);
  }, [selection]);

  return (
    <UIBlock isFlex>
      <UIScroll isFlex isSafe>
        <UICol isFlex padding={'l'} gap={'l'}>
          <UIHeader
            title={'Pendências'}
            description={'Mantenha suas pendências em dia.'}
          />

          <Group
            title={'Ajustes pendentes'}
            onSelectAll={() => selectGroup('adjustments')}
            onMore={() => navigate(SCREENS.Adjustments, { status: 'pending' })}
            items={adjusments}
            total={2}
          />

          <Group
            title={'Afastamentos pendentes'}
            onSelectAll={() => selectGroup('workleaves')}
            onMore={() => navigate(SCREENS.WorkLeaves, { status: 'pending' })}
            items={workleaves}
            total={10}
          />

          <Group
            title={'Férias pendentes'}
            onSelectAll={() => selectGroup('vacations')}
            onMore={() => navigate(SCREENS.Vacations, { status: 'pending' })}
            items={vacations}
            total={25}
          />

          <UIBool condition={selection.size > 0}>
            <UIBlock height={bottomPadding} />
          </UIBool>
        </UICol>
      </UIScroll>

      <UIBool condition={selection.size > 0}>
        <BottomSheet
          size={selection.size}
          onLayout={handlePadding}
          onApprove={approveSelection}
          onReject={rejectSelection}
        />
      </UIBool>
    </UIBlock>
  );
};

const Group = ({ title, items, total, onSelectAll, onMore }) => {
  const { colors } = useTheme();
  const badge = React.useMemo(() => items?.length, [items]);

  const allSelected = React.useMemo(
    () => items?.every(item => item.isSelected),
    [items],
  );

  if (!items?.length) {
    return null;
  }

  return (
    <UIExpandable iconType="symbol">
      <UIRow isCenter gap="s">
        <UIText>{title}</UIText>
        <UIBadge value={badge} />
      </UIRow>

      <UIList
        items={items}
        renderHeader={() => (
          <UIRow gap="s" vAlign="center" onPress={onSelectAll}>
            <UICheck isChecked={allSelected} onChange={onSelectAll} />
            <UIText secondary> {'Selecionar todos'}</UIText>
          </UIRow>
        )}
        renderItem={({ item }) => (
          <UIRow gap="m">
            <UICheck isChecked={item.isSelected} onChange={item.onSelect} />

            <UICol isFlex>
              <Item data={item} />
            </UICol>
          </UIRow>
        )}
        renderFooter={() => (
          <UIBlock isRow gap={'s'} vAlign="center" hAlign="end">
            <UIText size="s" secondary>
              {`${items.length} de ${total}`}
            </UIText>

            <UIButton isBlank text="Ver mais" onPress={onMore} />
          </UIBlock>
        )}
      />
    </UIExpandable>
  );
};

const Item = ({ data }) => {
  const { colors } = useTheme();
  const { navigate } = useNavigation();

  const more = React.useCallback(() => {
    console.log('more', data);
    // navigate('', { data });
  }, [data, navigate]);

  const approve = React.useCallback(() => {
    //
  }, []);

  const reject = React.useCallback(() => {
    //
  }, []);

  const { title, subtitle, description, image } = React.useMemo(() => {
    switch (data.group) {
      case 'adjustments':
        return {
          title: data.name,
          subtitle: data.justification,
          description: data.description,
          image: data.attachment?.uri,
        };

      case 'workleaves':
        return {
          title: data.name,
          subtitle: data.justification,
          description: data.description,
          image: data.attachment?.uri,
        };

      case 'vacations':
        return {
          title: data.name,
          subtitle: data.justification,
          description: data.description,
          image: data.attachment?.uri,
        };

      default:
        return {
          title: data.name,
          subtitle: data.justification,
          description: data.description,
          image: data.attachment?.uri,
        };
    }
  }, [data]);

  return (
    <UIExpandable
      gap="xs"
      padding="m"
      hPadding={'l'}
      radius="s"
      color={colors.background.secondary}>
      <UICol gap="xs">
        <UIText>{title}</UIText>
      </UICol>

      <UICol gap="m">
        <UICol gap="s">
          <UIText>{title}</UIText>
          {image && (
            <UIImage source={{ uri: image }} height={128} radius={'s'} />
          )}
        </UICol>

        <UIButton isBlank text="Ver mais detalhes" onPress={more} />

        <UICol gap={'s'}>
          <UIButton
            isFlex
            text={'Aprovar'}
            icon={'check'}
            color={colors.success}
            onPress={approve}
          />
          <UIButton
            isFlex
            text={'Reprovar'}
            icon="x"
            color={colors.error}
            onPress={reject}
          />
        </UICol>
      </UICol>
    </UIExpandable>
  );
};

const BottomSheet = ({ size, onApprove, onReject, onLayout }) => {
  const { colors } = useTheme();

  return (
    <UIBlock
      isAbsolute
      isSafeBottom
      position={[undefined, 0, 0, 0]}
      color={colors.background.secondary}
      radius={[SPACING.medium, SPACING.medium]}
      gap={'m'}
      padding={'l'}
      onLayout={({ nativeEvent }) => onLayout(nativeEvent.layout)}>
      <UIText>{`${size} selecionados`}</UIText>

      <UIBlock isRow gap={'m'}>
        <UIButton
          isFlex
          text={'Reprovar'}
          icon="x"
          color={colors.error}
          onPress={onReject}
        />

        <UIButton
          isFlex
          text={'Aprovar'}
          icon={'check'}
          color={colors.success}
          onPress={onApprove}
        />
      </UIBlock>
    </UIBlock>
  );
};

const fakeData = [
  {
    group: 'adjustments',

    id: fakeId(),
    createdAt: new Date(2023, 9, 15, 18, 23),
    updatedAt: null,
    updatedBy: null,

    timeEntryAt: new Date(2023, 9, 15, 8, 30),
    name: 'Inacio Pires um',
    department: 'Departamento 1',
    source: 'web',
    justification: 'Esqueci de bater o ponto',

    location: {
      name: 'Rua da República, 123',
      coords: {
        latitude: -30.041267078735153,
        longitude: -51.21905324252257,
      },
    },

    attachment: {
      uri: 'https://fakeimg.pl/350x200/666,128/333',
    },
  },
  {
    group: 'adjustments',

    id: fakeId(),
    createdAt: new Date(2023, 9, 15, 18, 23),
    updatedAt: null,
    updatedBy: null,

    timeEntryAt: new Date(2023, 9, 15, 8, 30),
    name: 'Inacio Pires um',
    department: 'Departamento 1',
    source: 'web',
    justification: 'Esqueci de bater o ponto',

    location: {
      name: 'Rua da República, 123',
      coords: {
        latitude: -30.041267078735153,
        longitude: -51.21905324252257,
      },
    },

    attachment: {
      uri: 'https://fakeimg.pl/350x200/666,128/333',
    },
  },

  {
    group: 'workleaves',

    id: fakeId(),
    createdAt: new Date(2023, 9, 15, 18, 23),
    updatedAt: null,
    updatedBy: null,
    status: 'pending',

    startDate: '2023-10-15',
    endDate: '2023-10-15',
    startTime: '08:30',
    endTime: '18:30',

    name: 'Inacio Pires um',
    isPaid: true,
    isDSRDiscount: false,
    isBankHoursDebit: false,
    justification: 'médico solicitou pra ficar em respouso',

    attachment: {
      uri: 'https://fakeimg.pl/350x200/666,128/333',
    },
  },

  {
    group: 'vacations',
    id: fakeId(),
    createdAt: new Date(2023, 9, 15, 18, 23),
    updatedAt: null,
    updatedBy: null,
    status: 'pending',

    startDate: '2023-10-15',
    endDate: '2023-10-15',
    startTime: '08:30',
    endTime: '18:30',

    name: 'Inacio Pires um',
    isPaid: true,
    isDSRDiscount: false,
    isBankHoursDebit: false,
    description: 'médico solicitou pra ficar em respouso',
  },
];
