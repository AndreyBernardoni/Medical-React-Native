import React, { useState, useCallback, memo } from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIModal } from '../Modal';
import { UIIcon } from '../Icon';
import { UIText } from '../Text';
import { UICheckbox } from '../Checkbox';

import { SPACING } from '../../../constants/spacing';
import { UITag } from '../Tag';

// selection is array of objects { id, name }
// options is array of objects { id, name }

export const UISelectTags = ({
  selection,
  options,
  color,
  onConfirm,
  onCancel,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectionEdit, setSelectionEdit] = useState(selection);

  const onSelect = useCallback(
    id => {
      const isSelected = selectionEdit?.find(item => item.id === id);

      if (isSelected)
        return setSelectionEdit(prev => prev.filter(item => item.id !== id));

      const option = options.find(item => item.id === id);
      return setSelectionEdit(prev => [...prev, option]);
    },
    [options, selectionEdit],
  );

  const onRemove = useCallback(
    id => {
      const newSelection = prev => prev.filter(item => item.id !== id);
      setSelectionEdit(newSelection);
      onConfirm(newSelection(selectionEdit));
      onClose();
    },
    [onClose, onConfirm, selectionEdit],
  );

  const onClear = useCallback(() => {
    setSelectionEdit(() => []);
    onConfirmSelection([]);
  }, [onConfirmSelection]);

  const onConfirmSelection = useCallback(() => {
    onConfirm(selectionEdit);
    onClose();
  }, [onClose, onConfirm, selectionEdit]);

  const onOpen = useCallback(() => {
    setSelectionEdit(selection);
    setIsOpened(true);
  }, [selection]);

  const onClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <UIBlock>
      <UITags
        tags={selection}
        color={color}
        onRemove={onRemove}
        // onClear={onClear}
        onMore={onOpen}
      />

      <UIModal
        title={'Selecione'}
        isVisible={isOpened}
        onConfirm={onConfirmSelection}
        onCancel={onCancel ? onCancel : onClose}
        onClose={onClose}>
        <UIBlock gap={'s'}>
          {options?.map((option, index) => (
            <UICheckbox
              key={index}
              id={option.id}
              text={option.name}
              isActive={selectionEdit?.find(tag => tag.id === option.id)}
              onPress={onSelect}
            />
          ))}
        </UIBlock>
      </UIModal>
    </UIBlock>
  );
};

const UITags = memo(({ tags, color, onRemove, onClear, onMore }) => {
  const { colors } = useTheme();

  return (
    <UIBlock isRow isWrap gap={'s'}>
      {tags.map((tag, index) => (
        <UITag
          key={index}
          id={tag.id}
          text={tag.name}
          color={tag.color || color}
          onRemove={() => onRemove(tag.id)}
        />
      ))}

      {tags.length > 0 && onClear && (
        <UIBlock
          isRow
          vAlign="center"
          gap={'s'}
          color={colors.background.tertiary}
          height={SPACING.semi_huge}
          radius={SPACING.semi_huge}
          hPadding={'l'}
          align="center"
          onPress={onClear}>
          <UIText size="s">Limpar</UIText>
          <UIIcon font="fa6" name="xmark" size={12} />
        </UIBlock>
      )}

      {onMore && (
        <UIBlock
          onPress={onMore}
          color={colors.background.tertiary}
          height={SPACING.semi_huge}
          width={SPACING.semi_huge}
          radius={SPACING.semi_huge}
          align="center">
          <UIIcon
            name="plus"
            font="fa6"
            size={16}
            color={colors.text.primary}
          />
        </UIBlock>
      )}
    </UIBlock>
  );
});
