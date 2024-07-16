import React, { useState, useCallback } from 'react';

import { UIBlock } from '../Block';
import { UIRadio } from '../Radio';
import { UIModal } from '../Modal';

import { UISelectInput } from '../SelectInput';

import { useTheme } from '@react-navigation/native';
import { UIScroll } from '../Scroll';

export const UISelect = ({ selected, options, onConfirm, onCancel }) => {
  const { colors } = useTheme();

  const [isOpened, setIsOpened] = useState(false);
  const [selectedUpdated, setSelectedUpdated] = useState(selected);

  const onSelect = useCallback(value => {
    setSelectedUpdated(value);
  }, []);

  const onConfirmSelection = useCallback(() => {
    onConfirm(selectedUpdated);
    setIsOpened(false);
  }, [onConfirm, selectedUpdated]);

  const onOpen = useCallback(() => {
    setIsOpened(true);
  }, []);

  const onClose = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <UIBlock>
      <UISelectInput
        text={
          options?.find(
            option =>
              option.value === selected.value ||
              option.value === selected ||
              option === selected,
          )?.label
        }
        onPress={onOpen}
      />

      <UIModal
        title={'Selecione'}
        isVisible={isOpened}
        onConfirm={onConfirmSelection}
        onCancel={onCancel ? onCancel : onClose}
        onClose={onClose}>
        <UIBlock>
          {options?.map((option, index) => (
            <UIRadio
              key={index}
              label={option.label || option.value || option}
              value={option.value || option}
              isActive={selectedUpdated === option.value}
              onPress={onSelect}
            />
          ))}
        </UIBlock>
      </UIModal>
    </UIBlock>
  );
};
