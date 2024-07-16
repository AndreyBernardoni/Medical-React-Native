import React, { useMemo } from 'react';
import { useTheme } from '@react-navigation/native';

import { UIBlock } from '../Block';
import { UIText } from '../Text';
import { UIBool } from '../Bool';
import { UIIcon } from '../Icon';

import { SPACING } from '../../../constants/spacing';

export const UISearchInput = ({ text, onText, onTextClear, onFilter }) => {
  const { colors } = useTheme();

  const isTextEmpty = useMemo(() => !text, [text]);

  return (
    <UIBlock
      isRow
      isBetween
      color={colors.background.secondary}
      height={SPACING.massive}
      radius={SPACING.massive}>
      <UIBlock
        isFlex
        isRow
        isBetween
        vAlign="center"
        lPadding={'l'}
        onPress={onText}>
        <UIBool condition={isTextEmpty}>
          <UIText color={colors.text.tertiary}>Pesquise aqui</UIText>
        </UIBool>

        <UIBool condition={!isTextEmpty}>
          <UIText>{text}</UIText>
        </UIBool>

        <UIBool condition={isTextEmpty}>
          <SearchIcon />
        </UIBool>
      </UIBlock>

      <UIBlock isRow>
        <UIBool condition={!isTextEmpty}>
          <UIBlock isCenter height="100%" rPadding={'m'} onPress={onTextClear}>
            <DeleteIcon />
          </UIBlock>
        </UIBool>

        <UIBlock isCenter height="100%" rPadding={'l'} onPress={onFilter}>
          <FilterIcon />
        </UIBlock>
      </UIBlock>
    </UIBlock>
  );
};

const SearchIcon = () => {
  const { colors } = useTheme();
  return (
    <UIBlock isCenter rPadding={'m'}>
      <UIIcon name="search" size={18} color={colors.text.quaternary} />
    </UIBlock>
  );
};

const FilterIcon = () => {
  const { colors } = useTheme();
  return (
    <UIIcon font="fa6" name="filter" size={16} color={colors.text.secondary} />
  );
};

const DeleteIcon = () => {
  const { colors } = useTheme();
  return (
    <UIIcon
      font="fa6"
      name="delete-left"
      size={16}
      color={colors.text.secondary}
    />
  );
};
