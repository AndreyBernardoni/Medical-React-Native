import { SPACING } from '../../constants/spacing';

import React from 'react';
import { useTheme } from '@react-navigation/native';
import { UIScroll } from '../../components/UI/Scroll';
import { UIBlock } from '../../components/UI/Block';
import { UIHeader } from '../../components/UI/Header';
import { UIText } from '../../components/UI/Text';
import { UIIcon } from '../../components/UI/Icon';
import { UIButton } from '../../components/UI/Button';
import { UIBool } from '../../components/UI/Bool';
import { UIList } from '../../components/UI/List';
import { UICheckCard } from '../../components/UI/CheckCard';
import { UIImage } from '../../components/UI/Image';
import { UISafeBottom } from '../../components/UI/SafeBottom';

export const AdjustmentsScreen = () => {
  const { colors } = useTheme();

  const [bottomSheetShow, setBottomSheetShow] = React.useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = React.useState(0);

  const [items, setItems] = React.useState(getSomeList());

  const isAllChecked = React.useMemo(
    () => items.every(pendingEntry => pendingEntry.isChecked),
    [items],
  );

  const isSomeChecked = React.useMemo(
    () => items.some(pendingEntry => pendingEntry.isChecked),
    [items],
  );

  const checkedItems = React.useMemo(
    () => items.filter(pendingEntry => pendingEntry.isChecked),
    [items],
  );

  const onCheck = React.useCallback(
    index => {
      let _items = [...items];
      _items[index].isChecked = !_items[index].isChecked;
      setItems(_items);
    },
    [items],
  );

  const onCheckAll = React.useCallback(() => {
    setItems(prev =>
      prev?.map(pendingEntry => ({
        ...pendingEntry,
        isChecked: !isAllChecked,
      })),
    );
  }, [isAllChecked]);

  React.useEffect(() => {
    setBottomSheetShow(isSomeChecked);
  }, [isSomeChecked]);

  return (
    <UIBlock isFlex>
      <UIScroll isFlex isSafe>
        <UIBlock isFlex padding={'l'} gap="m">
          <UIHeader
            title={'Ajustes pendentes'}
            description={'Mantenha suas pendências em dia.'}
          />

          <UIList
            ui="lista de coisas pendentes"
            gap={'m'}
            items={items}
            renderHeader={() => (
              <UIBlock isRow vAlign="center" gap={'m'} onPress={onCheckAll}>
                <UIIcon
                  name={isAllChecked ? 'check-square' : 'square'}
                  color={isAllChecked ? colors.primary : colors.text.secondary}
                  size={20}
                />

                <UIBlock>
                  <UIText secondary>Selecionar todos</UIText>
                </UIBlock>
              </UIBlock>
            )}
            renderItem={({ item, index }) => (
              <UICheckCard
                title={item.name}
                content={
                  <UIBlock gap={'m'}>
                    <UIImage
                      source={{ uri: item.image }}
                      color={colors.background.tertiary}
                      height={128}
                      radius={'xs'}
                    />

                    <UIText size="s" secondary>
                      {item.description}
                    </UIText>
                  </UIBlock>
                }
                isChecked={item.isChecked}
                onCheck={() => onCheck(index)}
                onDetails={() => {}}
                onApprove={() => {}}
                onReject={() => {}}
              />
            )}
          />

          <UIBool condition={bottomSheetShow}>
            <UIBlock height={bottomSheetHeight + SPACING.small} />
          </UIBool>
        </UIBlock>
      </UIScroll>

      <UIBool name="se algum selecionado" condition={bottomSheetShow}>
        <UIBlock
          secondary
          isAbsolute
          isSafeBottom
          position={[undefined, 0, 0, 0]}
          radius={[SPACING.medium, SPACING.medium]}
          gap={'m'}
          padding={'l'}
          onLayout={({ nativeEvent }) =>
            setBottomSheetHeight(nativeEvent.layout.height)
          }>
          <UIText>{`${checkedItems?.length} selecionados`}</UIText>
          <UIBlock isRow gap={'m'}>
            <UIButton
              isFlex
              text={'Aprovar'}
              icon={'check'}
              color={colors.success}
              onPress={() => {}}
            />
            <UIButton
              isFlex
              text={'Reprovar'}
              icon="x"
              color={colors.error}
              onPress={() => {}}
            />
          </UIBlock>
        </UIBlock>
      </UIBool>
    </UIBlock>
  );
};

const getSomeList = () =>
  new Array(10).fill(0).map((_, index) => ({
    id: String(index + 1),
    name: `fulano ${index + 1}`,
    description: `Afastamento de Vinicius Inacio Pires no dia 12/07/2023`,
    image: `https://picsum.photos/seed/${index + 1}/200/300`,
    isChecked: false,
  }));
