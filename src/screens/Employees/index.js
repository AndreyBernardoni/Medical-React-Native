import React, { memo, useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import { UIText } from '../../components/UI/Text';
import { UIHeader } from '../../components/UI/Header';
import { UITabs } from '../../components/UI/Tabs';
import { UIBlock } from '../../components/UI/Block';
import { UIModal } from '../../components/UI/Modal';
import { UITextInput } from '../../components/UI/TextInput';
import { UIBool } from '../../components/UI/Bool';
import { UISelect } from '../../components/UI/Select';
import { UIScroll } from '../../components/UI/Scroll';
import { UISearchInput } from '../../components/UI/SearchInput';
import { UIIcon } from '../../components/UI/Icon';
import { UISelectTags } from '../../components/UI/SelectTags';
import { UITag } from '../../components/UI/Tag';

import { SPACING } from '../../constants/spacing';

const tabs = [
  { label: 'Período', value: 'period' },
  { label: 'Hoje', value: 'today' },
];

const documents = [
  {
    id: 'all',
    name: 'Todos',
  },
  {
    id: 'cpf',
    name: 'CPF',
  },
  {
    id: 'cnpj',
    name: 'CNPJ',
  },
];

const status = [
  {
    id: 'all',
    name: 'Todos',
  },
  {
    id: 'late',
    name: 'Atrasados',
  },
  {
    id: 'working',
    name: 'Trabalhando',
  },
  {
    id: 'extra_time',
    name: 'Hora extra',
  },
  {
    id: 'extra_time_cost',
    name: 'Custo de hora extra',
  },
  {
    id: 'more_10h_day',
    name: 'Trabalhou mais 10h ',
  },
  {
    id: 'less_11h_between',
    name: 'Menos 10h interjornada',
  },
  {
    id: 'less_1h_interval',
    name: 'Intervalo menos 1h',
  },
  {
    id: 'no_interval',
    name: 'Sem intervalo',
  },
  {
    id: 'more_6h_no_interval',
    name: '6h sem intervalo',
  },
  {
    id: 'interval',
    name: 'Em intervalo',
  },
  {
    id: 'absenteeism',
    name: 'Absenteísmo (faltas)',
  },
  {
    id: 'early_leave',
    name: 'Saiu antes',
  },
];

const employers = [
  {
    id: uuid.v4(),
    name: 'Fenix SA',
  },
  {
    id: uuid.v4(),
    name: 'MX',
  },
  {
    id: uuid.v4(),
    name: 'Matriz',
  },
  {
    id: uuid.v4(),
    name: 'Rei do boteco',
  },
];

const units = [
  {
    id: uuid.v4(),
    name: 'Central',
  },
  {
    id: uuid.v4(),
    name: 'Filial 1',
  },
  {
    id: uuid.v4(),
    name: 'Filial 2',
  },
  {
    id: uuid.v4(),
    name: 'Filial 3',
  },
];

const filters = [
  ...formatFilters(documents, 'document'),
  ...formatFilters(status, 'status'),
  ...formatFilters(employers, 'employer'),
  ...formatFilters(units, 'unit'),
];

const getTagColorByType = type => {
  switch (type) {
    case 'status':
      return '#76D1E5';

    case 'document':
      return '#7BE085';

    case 'employer':
      return '#D1B2DE';

    case 'unit':
      return '#E8C37C';

    default:
      return null;
  }
};

function formatFilters(items, type) {
  return items.map(item => ({ type: type, ...item }));
}

function formatFilter(item, type) {
  return { type: type, ...item };
}

// tela
export const EmployeesScreen = ({ route }) => {
  // from routes
  const initialStatusIndex = React.useMemo(() => {
    const name = route?.params?.status;
    if (!name) {
      return 0;
    }

    const index = status.findIndex(item => item.id === name);
    return index;
  }, [route?.params?.status]);

  const initialTab = React.useMemo(() => {
    const period = route?.params?.period;
    if (!period) {
      return 'today';
    }

    return 'period';
  }, [route?.params?.period]);
  //

  const initialFilter = React.useMemo(
    () => [
      formatFilter(documents[0], 'document'),
      formatFilter(status[initialStatusIndex], 'status'),
    ],
    [initialStatusIndex],
  );

  const [tab, setTab] = useState(initialTab);

  const [text, setText] = useState('');
  const [textEdit, setTextEdit] = useState('');
  const [isTextEditing, setIsTextEditing] = useState(false);

  const [filter, setFilter] = useState(initialFilter);
  const [filterEdit, setFilterEdit] = useState(filter);
  const [isFilterEditing, setIsFilterEditing] = useState(false);

  return (
    <UIScroll isSafe isKeyboard>
      <UIBlock gap={'l'} padding={'l'}>
        <UIHeader
          title="Status dos funcionários"
          description="Veja o status dos seus funcionários."
        />

        <UITabs tab={tab} tabs={tabs} onChange={setTab} isOutline />

        <UIBlock gap={'m'}>
          <UISearchInput
            text={text}
            onTextClear={() => setText('')}
            onText={() => {
              setTextEdit(text);
              setIsTextEditing(true);
            }}
            onFilter={() => {
              setFilterEdit(filter);
              setIsFilterEditing(true);
            }}
          />

          <Tags
            items={filter.filter(i => i.id !== 'all')}
            onRemove={id => {
              const updatedFilter = filter?.filter(i => i.id !== id);

              if (!updatedFilter?.find(i => i.type === 'document')) {
                updatedFilter.push(formatFilter(documents[0], 'document'));
              }

              if (!updatedFilter?.find(i => i.type === 'status')) {
                updatedFilter.push(formatFilter(status[0], 'status'));
              }

              setFilter(updatedFilter);
            }}
            onClear={() =>
              setFilter(_ => [
                formatFilter(documents[0], 'document'),
                formatFilter(status[0], 'status'),
              ])
            }
          />
        </UIBlock>

        <UIBool condition={tab === 'period'}>
          <PeriodSelector />
        </UIBool>
      </UIBlock>

      <UIModal
        isVisible={isTextEditing}
        isKeyboard
        title="Pesquisa"
        confirmText="Confirmar"
        onConfirm={() => {
          setText(textEdit);
          setIsTextEditing(false);
        }}
        onClose={() => setIsTextEditing(false)}>
        <UITextInput value={textEdit} setValue={setTextEdit} hasIcon />
      </UIModal>

      <UIModal
        isScroll
        isVisible={isFilterEditing}
        title="Filtros"
        confirmText="Aplicar"
        onConfirm={() => {
          setFilter(filterEdit);
          setIsFilterEditing(false);
        }}
        onCancel={() => setIsFilterEditing(false)}
        onClose={() => setIsFilterEditing(false)}>
        <Filters
          filter={filterEdit}
          filters={filters}
          onChange={setFilterEdit}
        />
      </UIModal>
    </UIScroll>
  );
};

const PeriodSelector = memo(({ onChange }) => {
  const [tab, setTab] = useState('current');

  const tabs = [
    { label: 'Anterior', value: 'previous' },
    { label: 'Atual', value: 'current' },
    // { label: 'Hoje', value: 'today' },
  ];

  return (
    <UIBlock gap={'xs'}>
      <UIText size="s" tertiary>
        {'23 Julho 2023 a 23 Agosto 2023'}
      </UIText>

      <UITabs tab={tab} tabs={tabs} onChange={setTab} />

      <UIBlock isRow vAlign="center" gap={'xs'} onPress={() => {}}>
        <UIText secondary> Ver mais períodos</UIText>
        <UIIcon name="chevron-right" size={18} primary />
      </UIBlock>
    </UIBlock>
  );
});

const Filters = memo(({ filter, filters, onChange }) => {
  const [period, setPeriod] = useState({
    selected: filter?.filter(item => item.type === 'period'),
    options: filters?.filter(item => item.type === 'period'),
  });

  const [document, setDocument] = useState({
    selected: filter?.filter(item => item.type === 'document'),
    options: filters?.filter(item => item.type === 'document'),
  });

  const [status, setStatus] = useState({
    selected: filter?.filter(item => item.type === 'status'),
    options: filters?.filter(item => item.type === 'status'),
  });

  const [employers, setEmployers] = useState({
    selection: filter?.filter(item => item.type === 'employer'),
    options: filters?.filter(item => item.type === 'employer'),
  });

  const [units, setUnits] = useState({
    selection: filter?.filter(item => item.type === 'unit'),
    options: filters?.filter(item => item.type === 'unit'),
  });

  useEffect(() => {
    if (onChange) {
      onChange([
        ...document?.selected,
        ...status?.selected,
        ...employers?.selection,
        ...units?.selection,
      ]);
    }
  }, [document, status, employers, units, onChange]);

  return (
    <UIBlock gap={'m'}>
      {/* <PeriodSelector /> */}

      <UIBlock gap={'s'}>
        <UIText size="s" semibold tertiary>
          Documento
        </UIText>

        <UITabs
          tab={document.selected[0].id}
          tabs={document.options.map(({ id, name }) => ({
            label: name,
            value: id,
          }))}
          onChange={value => {
            const selected = document.options.filter(item => item.id === value);
            setDocument({ ...document, selected });
          }}
        />
      </UIBlock>

      <UIBlock gap={'s'}>
        <UIText size="s" semibold tertiary>
          Status
        </UIText>

        <UISelect
          selected={status.selected[0].id}
          options={status.options.map(({ id, name }) => ({
            label: name,
            value: id,
          }))}
          onConfirm={value => {
            const selected = status.options.filter(item => item.id === value);
            setStatus({ ...status, selected });
          }}
        />
      </UIBlock>

      <UIBlock gap={'s'}>
        <UIText size="s" semibold tertiary>
          Empregador
        </UIText>
        <UISelectTags
          color={getTagColorByType('employer')}
          selection={employers.selection}
          options={employers.options}
          onConfirm={selection =>
            setEmployers(prev => ({ ...prev, selection }))
          }
        />
      </UIBlock>

      <UIBlock gap={'s'}>
        <UIText size="s" semibold tertiary>
          Unidade
        </UIText>

        <UISelectTags
          color={getTagColorByType('unit')}
          selection={units.selection}
          options={units.options}
          onConfirm={selection => setUnits(prev => ({ ...prev, selection }))}
        />
      </UIBlock>
    </UIBlock>
  );
});

const Tags = ({ items, onRemove, onClear, onCreate }) => {
  const { colors } = useTheme();

  if (!items) {
    return false;
  }

  if (items.length === 0) {
    return false;
  }

  return (
    <UIBlock isRow isWrap gap={'xs'}>
      {items?.map((tag, index) => (
        <UITag
          key={index}
          id={tag.id}
          text={tag.name}
          color={getTagColorByType(tag.type)}
          onRemove={onRemove}
        />
      ))}

      {items.length > 0 && onClear && (
        <UIBlock
          isRow
          vAlign="center"
          gap={'xs'}
          tertiary
          height={SPACING.semi_huge}
          radius={SPACING.semi_huge}
          hPadding={'s'}
          align="center"
          onPress={onClear}>
          <UIText size="s">Limpar</UIText>
        </UIBlock>
      )}

      {onCreate && (
        <UIBlock
          onPress={onCreate}
          color={colors.background.tertiary}
          height={SPACING.semi_huge}
          width={SPACING.semi_huge}
          radius={SPACING.semi_huge}
          align="center">
          <UIIcon name="plus" size={18} secondary />
        </UIBlock>
      )}
    </UIBlock>
  );
};
