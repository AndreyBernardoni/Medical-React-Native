import React, { useCallback, useState } from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIModal } from '../Modal';
import { UICheckbox } from '../Checkbox';
import { UIScroll } from '../Scroll';
import { UIIcon } from '../Icon';

import { SPACING } from '../../../constants/spacing';

const TagColors = {
  ['paymentSource']: '#D1B2DE',
  ['status']: '#76D1ff',
  ['site']: '#E8C37C',
  ['documentType']: '#7BE085',
};

export const UITags = ({ tags, enableCreation, enableClear }) => {
  const { colors } = useTheme();

  const [isOpened, setIsOpened] = useState(false);
  const [tagsUpdated, setTagsUpdated] = useState(tags);

  const openModal = useCallback(() => {
    setIsOpened(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpened(false);
  }, []);

  const onClear = useCallback(() => {
    console.log('clear');
  }, []);

  const onDelete = useCallback(value => {
    console.log('delete', value);
  }, []);

  const onSelect = useCallback(id => {
    setTagsUpdated(prev => {
      return prev.map(tag => {
        if (tag.id === id) {
          return {
            ...tag,
            isActive: !tag.isActive,
          };
        }
        return tag;
      });
    });
  }, []);

  const onConfirmSelection = useCallback(() => {
    console.log('selectedUpdated', tagsUpdated);
  }, [tagsUpdated]);

  return (
    <UIBlock isRow isWrap gap={SPACING.small}>
      {tags
        ?.filter(tag => tag.isActive)
        ?.map((tag, index) => (
          <UIBlock
            key={index}
            isRow
            isCenter
            gap={SPACING.small}
            color={tag.color || TagColors[tag.type]}
            radius={SPACING.semi_huge}
            height={SPACING.semi_huge}
            padding={[0, SPACING.semi_medium, SPACING.tiny, 0]}>
            <UIText color={colors.background.primary}>
              {tag.label || tag.value}
            </UIText>

            <UIBlock
              onPress={() => onDelete(tag.value)}
              height={SPACING.large}
              width={SPACING.large}
              radius={SPACING.large}
              align="center"
              color={'rgba(0,0,0,0.2)'}>
              <UIIcon font="fa6" name="xmark" size={16} color={colors.white} />
            </UIBlock>
          </UIBlock>
        ))}

      {enableClear && (
        <UIBlock
          isRow
          vAlign="center"
          gap={SPACING.small}
          color={colors.background.tertiary}
          height={SPACING.semi_huge}
          radius={SPACING.semi_huge}
          hPadding={SPACING.semi_medium}
          align="center"
          onPress={onClear}>
          <UIText size="s">Limpar</UIText>
          <UIIcon font="fa6" name="xmark" size={12} />
        </UIBlock>
      )}

      {enableCreation && (
        <UIBlock
          onPress={openModal}
          color={colors.background.tertiary}
          height={SPACING.semi_huge}
          width={SPACING.semi_huge}
          radius={SPACING.semi_huge}
          align="center">
          <UIIcon name="plus" size={18} color={colors.text.secondary} />
        </UIBlock>
      )}

      <UIModal
        title={'Selecione'}
        isVisible={isOpened}
        onConfirm={onConfirmSelection}
        onCancel={closeModal}
        onClose={closeModal}>
        <UIScroll>
          <UIBlock gap={SPACING.small}>
            {tagsUpdated?.map((tag, index) => (
              <UICheckbox
                key={index}
                id={tag.id}
                label={tag.label}
                value={tag.value}
                isActive={tag.isActive}
                onPress={onSelect}
              />
            ))}
          </UIBlock>
        </UIScroll>
      </UIModal>
    </UIBlock>
  );
};
